/**
 * LoRA Adapter Framework
 * 
 * Implements LoRA (Low-Rank Adaptation) adapter loading and switching for domain specializations.
 * This allows efficient fine-tuning and specialization of the base model for different domains
 * without needing to load multiple full models.
 */

import { env } from '@xenova/transformers';
import { eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { loraAdaptersTable } from '../../db/schema/specializations';

/**
 * Database representation of a LoRA adapter
 */
export interface LoRAAdapterRecord {
    id: string;
    name: string;
    version: string;
    domainId?: number | null;  // Updated to allow null values from the database
    rank: number;
    alpha: number | string; // Can be numeric in DB
    baseModel: string;
    filePath: string;
    sizeBytes: number;
    trainingSteps: number;
    trainingLoss?: number | string | null;  // Allow null values from DB
    trainingDataDesc?: string | null;  // Allow null values from DB
    isActive: boolean;
    isDefault: boolean;
    evaluationScore?: number | string | null;  // Allow null values from DB
    evaluationMetrics?: Record<string, unknown> | null;  // Allow null values from DB
    metadata?: Record<string, unknown> | null;  // Allow null values from DB
    createdAt: Date;
    updatedAt: Date;
}

/**
 * LoRA adapter metadata
 */
export interface LoRAAdapter {
    /**
     * Unique identifier for the adapter
     */
    id: string;

    /**
     * Human-readable name for the adapter
     */
    name: string;

    /**
     * Description of the specialization domain
     */
    description: string;

    /**
     * Path to the adapter files
     */
    path: string;

    /**
     * Adapter rank (dimensionality of low-rank matrices)
     */
    rank: number;

    /**
     * Alpha scaling factor
     */
    alpha: number;

    /**
     * Base model the adapter was trained for
     */
    baseModelId: string;
    
    /**
     * When the adapter was created
     */
    createdAt: Date;

    /**
     * Size of the adapter in bytes
     */
    sizeBytes: number;
}

/**
 * LoRA adapter application configuration
 */
export interface LoRAConfig {
    /**
     * Base model ID to apply the adapter to
     */
    baseModelId: string;

    /**
     * Adapter scaling factor (typically 0.0-1.0)
     * Controls how much influence the adapter has
     */
    adapterScale: number;

    /**
     * Whether to merge weights for inference efficiency
     */
    mergeWeights: boolean;

    /**
     * Target modules to apply adaptation to
     */
    targetModules?: string[];
}

/**
 * Default LoRA configuration
 */
export const DEFAULT_LORA_CONFIG: LoRAConfig = {
    baseModelId: "mistralai/Mistral-7B-v0.1",
    adapterScale: 1.0,
    mergeWeights: true
};

/**
 * Manages LoRA adapters for domain specializations
 */
export class LoRAManager {
    /**
     * Currently loaded adapters
     */
    private loadedAdapters: Map<string, LoRAAdapter> = new Map();

    /**
     * Cache of adapter information
     */
    private adapterCache: Map<string, LoRAAdapter> = new Map();

    /**
     * Create a new LoRA adapter manager
     */
    constructor() {
        // Configure cache directory for adapters
        env.cacheDir = './adapters';
    }

    /**
     * Get all available adapters
     * @returns Promise resolving to array of adapter metadata
     */
    async getAvailableAdapters(baseModelId?: string): Promise<LoRAAdapter[]> {
        try {
            // Query database for available adapters
            const query = db.select().from(loraAdaptersTable);
            
            // Filter by base model if specified
            // Using an approach that avoids type errors with Drizzle ORM
            let results = await query;
            
            if (baseModelId) {
                results = results.filter(adapter => adapter.baseModel === baseModelId);
            }
            
            // Map database results to adapter interface
            const adapters = results.map(adapter => this.mapDbAdapterToInterface(adapter));
            
            // Update cache with results
            for (const adapter of adapters) {
                this.adapterCache.set(adapter.id, adapter);
            }
            
            return adapters;
        } catch (error) {
            console.error('Error fetching available LoRA adapters:', error);
            return [];
        }
    }

    /**
     * Get a specific adapter by ID
     * @param adapterId The adapter ID to fetch
     * @returns Promise resolving to adapter metadata or null if not found
     */
    async getAdapter(adapterId: string): Promise<LoRAAdapter | null> {
        // Check cache first
        if (this.adapterCache.has(adapterId)) {
            return this.adapterCache.get(adapterId)!;
        }
        
        try {
            // Query database for adapter
            const results = await db
                .select()
                .from(loraAdaptersTable)
                .where(eq(loraAdaptersTable.id, adapterId));
                
            if (results.length === 0) {
                return null;
            }
            
            const adapter = this.mapDbAdapterToInterface(results[0]);
            
            // Update cache
            this.adapterCache.set(adapterId, adapter);
            
            return adapter;
        } catch (error) {
            console.error(`Error fetching LoRA adapter ${adapterId}:`, error);
            return null;
        }
    }

    /**
     * Load a LoRA adapter
     * @param adapterId Adapter ID to load
     * @returns Promise resolving to loaded adapter
     */
    async loadAdapter(adapterId: string): Promise<LoRAAdapter> {
        // Check if already loaded
        if (this.loadedAdapters.has(adapterId)) {
            return this.loadedAdapters.get(adapterId)!;
        }
        
        // Get adapter metadata
        const adapter = await this.getAdapter(adapterId);
        if (!adapter) {
            throw new Error(`LoRA adapter ${adapterId} not found`);
        }
        
        try {
            console.log(`Loading LoRA adapter: ${adapter.name} (${adapterId})`);
            
            // Store in loaded adapters map
            this.loadedAdapters.set(adapterId, adapter);
            
            return adapter;
        } catch (error) {
            console.error(`Error loading LoRA adapter ${adapterId}:`, error);
            throw error;
        }
    }

    /**
     * Unload a LoRA adapter to free memory
     * @param adapterId Adapter ID to unload
     */
    unloadAdapter(adapterId: string): void {
        if (!this.loadedAdapters.has(adapterId)) {
            return;
        }
        
        try {
            const adapter = this.loadedAdapters.get(adapterId)!;
            
            // Remove from loaded adapters
            this.loadedAdapters.delete(adapterId);
            
            console.log(`Unloaded LoRA adapter: ${adapter.name} (${adapterId})`);
        } catch (error) {
            console.error(`Error unloading LoRA adapter ${adapterId}:`, error);
        }
    }

    /**
     * Create model loading options with LoRA adapter configuration
     * @param adapterId Adapter ID to apply
     * @param config LoRA configuration options
     * @returns Model loading options with LoRA configuration
     */
    async createLoRAOptions(
        adapterId: string, 
        config: Partial<LoRAConfig> = {}
    ): Promise<Record<string, unknown>> {
        // Load the adapter
        const adapter = await this.loadAdapter(adapterId);
        
        // Create merged configuration
        const mergedConfig: LoRAConfig = {
            ...DEFAULT_LORA_CONFIG,
            ...config,
            baseModelId: adapter.baseModelId
        };
        
        // Create transformers.js compatible options
        return {
            adapter_id: adapterId,
            adapter_path: adapter.path,
            alpha: adapter.alpha,
            adapter_scale: mergedConfig.adapterScale,
            merge_weights: mergedConfig.mergeWeights,
            target_modules: mergedConfig.targetModules
        };
    }

    /**
     * Register a new LoRA adapter in the database
     * @param adapter Adapter metadata to register
     * @returns Promise resolving to the registered adapter ID
     */
    async registerAdapter(adapter: Omit<LoRAAdapter, 'id' | 'createdAt'>): Promise<string> {
        try {
            const now = new Date();
            const adapterId = `lora_${now.getTime()}`;
            
            // Insert into database - use a properly typed object that matches schema
            // We're using a separate object that matches the DB schema exactly
            const dbAdapter = {
                name: adapter.name,
                version: "1.0", // Default version
                rank: adapter.rank,
                alpha: adapter.alpha.toString(), // Convert to string for DB
                baseModel: adapter.baseModelId,
                filePath: adapter.path,
                sizeBytes: adapter.sizeBytes,
                trainingSteps: 0, // Default value
                isActive: true,
                isDefault: false,
                createdAt: now,
                updatedAt: now
            };
            
            // Now insert with properly shaped object
            await db.insert(loraAdaptersTable).values(dbAdapter);
            
            // Update cache
            this.adapterCache.set(adapterId, {
                ...adapter,
                id: adapterId,
                createdAt: now
            });
            
            return adapterId;
        } catch (error) {
            console.error('Error registering LoRA adapter:', error);
            throw error;
        }
    }

    /**
     * Maps database adapter record to LoRAAdapter interface
     * @param dbAdapter The database adapter record
     * @returns Mapped LoRAAdapter object
     */
    private mapDbAdapterToInterface(dbAdapter: Record<string, any>): LoRAAdapter {
        return {
            id: dbAdapter.id || '',
            name: dbAdapter.name || '',
            description: dbAdapter.trainingDataDesc || '',
            path: dbAdapter.filePath || '',
            rank: dbAdapter.rank || 0,
            alpha: typeof dbAdapter.alpha === 'string' ? parseFloat(dbAdapter.alpha) : (dbAdapter.alpha || 0),
            baseModelId: dbAdapter.baseModel || '',
            createdAt: dbAdapter.createdAt || new Date(),
            sizeBytes: dbAdapter.sizeBytes || 0
        };
    }
}

// Export singleton instance
export const loraManager = new LoRAManager(); 