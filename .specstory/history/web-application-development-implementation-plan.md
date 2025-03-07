## SpecStory

## Web Application Development Implementation Plan (3/6/2025, 4:22:44 PM)

_**User**_

create the following plan don't include alreadys done steps in the current codebase. From what we have. Must go in order that we need to complete them in.

you are an AI task planner responsible for breaking down a complex web application development project into manageable steps.

Your goal is to create a detailed, step-by-step plan that will guide the code generation process for building a fully functional web application based on a provided technical specification.

First, carefully review the following inputs:

<project_request>
# Kook: Brain-Inspired Specialized Memory System
## Project Description
An advanced AI system implementing brain-inspired memory mechanisms to overcome catastrophic forgetting and enable specialized knowledge domains. The system combines a Mistral 7B base model with domain-specific LoRA adapter modules and a complementary learning system (CLS) approach, all accessible through a responsive web interface.

## Target Audience
- AI researchers and developers
- Technical users interested in advanced memory management in LLMs
- Software engineers building on top of specialized AI systems

## Desired Features
### Infrastructure
- [ ] PyTorch implementation of core AI functionality
- [ ] PostgreSQL database with Drizzle ORM
- [ ] Supabase integration for vector storage and retrieval
- [ ] Embedding pipeline for converting interactions to vectors
- [ ] Keyword extraction for hybrid retrieval
- [ ] Monitoring and evaluation metrics
- [ ] Docker containerization for simplified deployment

### Memory Architecture
- [ ] Neocortical system (Mistral 7B base model)
    - [ ] 8-bit quantization for memory efficiency
    - [ ] Local model loading and caching
- [ ] Hippocampal fast learning system (RAG with vector database)
- [ ] Integration between slow and fast learning systems
- [ ] Local deployment capability without cloud dependencies

### Specialization Framework
- [ ] 4 domain-specific memory specializations
    - [ ] Factual knowledge (semantic memory)
    - [ ] Procedural memory (skills and processes)
    - [ ] Social interaction memory (interpersonal knowledge)
    - [ ] Episodic memory (temporal experiences and context)
- [ ] Input classification and routing system
- [ ] LoRA adapters for each specialty domain
    - [ ] Adapter rank configuration (8-16)
    - [ ] Activation thresholds for specialty routing
    - [ ] Low memory footprint (< 100MB per adapter)
- [ ] Efficient fine-tuning pipeline with regularization
    - [ ] PyTorch training loop optimizations
    - [ ] Checkpoint management

### Memory Management
- [ ] Prediction error calculation for memory importance
- [ ] Priority queue for memory replay based on surprise scores
- [ ] Memory consolidation scheduler
- [ ] Parameter importance tracking via Synaptic Intelligence
- [ ] Selective regularization based on importance scores
- [ ] Conflict resolution for contradictory information
- [ ] Temporal context tracking for episodic memory

### Web Frontend
- [ ] Next.js framework implementation
- [ ] Tailwind CSS for styling
- [ ] shadcn/ui component library
- [ ] Interactive chat/query interface
- [ ] System status and performance monitoring
- [ ] Visualization of memory importance and specialty activation
- [ ] Configuration panel for system parameters
- [ ] Local model loading and management

### Performance
- [ ] Consumer GPU optimization (targeting RTX 3090/4090 with 24GB VRAM)
- [ ] System profiling capabilities
- [ ] Sparse activation optimizations
- [ ] Minimal latency inference pipeline
- [ ] Memory usage optimization
- [ ] Model loading optimizations (lazy loading, efficient caching)

### Testing
- [ ] Unit testing with Jest for backend logic
- [ ] React Testing Library for frontend components
- [ ] Integration tests for system interactions
- [ ] Playwright for E2E testing
- [ ] Specialized model evaluation framework
    - [ ] Catastrophic forgetting benchmarks
    - [ ] Retrieval accuracy metrics
    - [ ] Specialization effectiveness tests

## Design Requests
- [ ] Modern Next.js app with Tailwind CSS styling
    - [ ] Dark/light mode using Tailwind's dark mode
    - [ ] Responsive layout for desktop use
- [ ] shadcn/ui components for consistent design language
- [ ] Interactive visualizations of memory systems
    - [ ] Specialty domain activation visualization
    - [ ] Memory importance heatmaps
    - [ ] Temporal sequence visualization for episodic memory
- [ ] Developer-focused UI with debug options
- [ ] Real-time model status indicators

## Other Notes
- System named "Kook" reflecting its innovative brain-inspired approach
- Base model: Mistral 7B with 8-bit quantization
- Adaptation strategy: LoRA adapters for parameter-efficient fine-tuning
- No authentication required for local deployment
- No specific privacy concerns as system runs locally
- Docker containerization for simplified setup and deployment
- Core AI functionality implemented in PyTorch for research extensibility
- PostgreSQL with Drizzle ORM for relational data management
- Frontend built with Next.js, Tailwind CSS, and shadcn/ui for modern development experience
- Consider WebSocket implementation for real-time communication between frontend and model backend
</project_request>

<project_rules>
{{PROJECT_RULES}}
</project_rules>

<technical_specification>
{{TECHNICAL_SPECIFICATION}}
</technical_specification>

<starter_template>
{{STARTER_TEMPLATE}}
</starter_template>

After reviewing these inputs, your task is to create a comprehensive, detailed plan for implementing the web application.

Before creating the final plan, analyze the inputs and plan your approach. Wrap your thought process in <brainstorming> tags.

Break down the development process into small, manageable steps that can be executed sequentially by a code generation AI.

Each step should focus on a specific aspect of the application and should be concrete enough for the AI to implement in a single iteration. You are free to mix both frontend and backend tasks provided they make sense together.

When creating your plan, follow these guidelines:

1. Start with the core project structure and essential configurations.
2. Progress through database schema, server actions, and API routes.
3. Move on to shared components and layouts.
4. Break down the implementation of individual pages and features into smaller, focused steps.
5. Include steps for integrating any third-party services.
6. Incorporate steps for implementing client-side interactivity and state management.
7. Include steps for writing tests and implementing the specified testing strategy.
8. Ensure that each step builds upon the previous ones in a logical manner.

Present your plan using the following markdown-based format. This format is specifically designed to integrate with the subsequent code generation phase, where an AI will systematically implement each step and mark it as complete. Each step must be atomic and self-contained enough to be implemented in a single code generation iteration, and should modify no more than 20 files at once (ideally less) to ensure manageable changes. Make sure to include any instructions the user should follow for things you can't do like installing libraries, updating configurations on services, etc (Ex: Running a SQL script for storage bucket RLS policies in the Supabase editor).

```md
# Implementation Plan

## [Section Name]
- [ ] Step 1: [Brief title]
  - **Task**: [Detailed explanation of what needs to be implemented]
  - **Files**: [Maximum of 20 files, ideally less]
    - `path/to/file1.ts`: [Description of changes]
  - **Step Dependencies**: [Step Dependencies]
  - **User Instructions**: [Instructions for User]

[Additional steps...]
```

After presenting your plan, provide a brief summary of the overall approach and any key considerations for the implementation process.

Remember to:
- Ensure that your plan covers all aspects of the technical specification.
- Break down complex features into smaller, manageable tasks.
- Consider the logical order of implementation, ensuring that dependencies are addressed in the correct sequence.
- Include steps for error handling, data validation, and edge case management.

Begin your response with your brainstorming, then proceed to the creation your detailed implementation plan for the web application based on the provided specification.

Once you are done, we will pass this specification to the AI code generation system.


---

_**Assistant**_

<think>Let me analyze the current state of the codebase before creating the implementation plan. I'll need to understand what already exists so I don't include redundant steps.

First, let's explore the directory structure to get a high-level overview of the project.</think>I'll explore the current codebase to understand what's already implemented before creating a plan for the remaining work.

---

_****_

<details>
            <summary>Listed current directory • **23** results</summary>
        
| Name |
|-------|
| 📄 `package-lock.json` |
| 📄 `node_modules` |
| 📄 `package.json` |
| 📄 `src` |
| 📄 `project_steps.md` |
| 📄 `.git` |
| 📄 `.env.local` |
| 📄 `drizzle.config.ts` |
| 📄 `db` |
| 📄 `actions` |
| 📄 `.next` |
| 📄 `.specstory` |
| 📄 `lib` |
| 📄 `components.json` |
| 📄 `tsconfig.json` |
| 📄 `public` |
| 📄 `app` |
| 📄 `next-env.d.ts` |
| 📄 `next.config.ts` |
| 📄 `postcss.config.mjs` |
| 📄 `eslint.config.mjs` |
| 📄 `README.md` |
| 📄 `.gitignore` |

</details>

---

_****_

Let's look at the package.json to understand what dependencies are already installed:

---

_****_

Read file: package.json

---

_****_

Let's explore the src directory structure since that's likely where most of the application code is:

---

_****_

<details>
            <summary>Listed directory src • **1** results</summary>
        
| Name |
|-------|
| 📄 `notepads` |

</details>

---

_****_

Let's check what's in the notepads directory:

---

_****_



---

_****_

The notepads directory is empty. Let's check the app directory since this appears to be a Next.js project:

---

_****_

<details>
            <summary>Listed directory app • **4** results</summary>
        
| Name |
|-------|
| 📄 `globals.css` |
| 📄 `page.tsx` |
| 📄 `layout.tsx` |
| 📄 `favicon.ico` |

</details>

---

_****_

Let's check the lib directory for any utility functions or configuration:

---

_****_

<details>
            <summary>Listed directory lib • **1** results</summary>
        
| Name |
|-------|
| 📄 `utils.ts` |

</details>

---

_****_

Let's look at the database setup in the db directory:

---

_****_

<details>
            <summary>Listed directory db • **1** results</summary>
        
| Name |
|-------|
| 📄 `db.ts` |

</details>

---

_****_

Let's check the drizzle configuration:

---

_****_

Read file: drizzle.config.ts

---

_****_

Let's check the database configuration in db.ts:

---

_****_

Read file: db/db.ts

---

_****_

Let me check if there's a database schema folder:

---

_****_



---

_****_

Let's look at the actions directory:

---

_****_



---

_****_

Based on my exploration, it appears that:
1. This is a Next.js project with React 19
2. It uses Tailwind CSS for styling
3. There's a basic setup for PostgreSQL with Drizzle ORM, but no schema files yet
4. The project has minimal structure with just basic Next.js files

Now I'll create a comprehensive implementation plan for building the Kook application as specified in the project description.

# Implementation Plan

## Project Setup and Infrastructure

- [ ] Step 1: Create Schema Directory Structure
  - **Task**: Set up the database schema directory structure and create the base schema index file
  - **Files**:
    - `db/schema/index.ts`: Create the main schema export file
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 2: Set Up Database Schema - Core Tables
  - **Task**: Define core database tables for the system (users, sessions, content)
  - **Files**:
    - `db/schema/index.ts`: Update to export all schema tables
    - `db/schema/users.ts`: Create user-related tables
    - `db/schema/sessions.ts`: Create session tracking tables
    - `db/schema/content.ts`: Create content and memory storage tables
  - **Step Dependencies**: Step 1
  - **User Instructions**: None

- [ ] Step 3: Set Up Database Schema - Memory Systems
  - **Task**: Define tables for memory systems including vectors, importance scores, and specialty domains
  - **Files**:
    - `db/schema/memory.ts`: Create memory-related tables including vector storage
    - `db/schema/specializations.ts`: Create tables for specialty domains and LoRA adapters
    - `db/schema/index.ts`: Update to include new schema tables
  - **Step Dependencies**: Step 2
  - **User Instructions**: None

- [ ] Step 4: Update Database Connection
  - **Task**: Update the database connection to use the complete schema
  - **Files**:
    - `db/db.ts`: Update the schema import and configuration
  - **Step Dependencies**: Step 3
  - **User Instructions**: None

- [ ] Step 5: Install AI and Database Dependencies
  - **Task**: Add necessary dependencies for AI and database functionality
  - **Files**:
    - `package.json`: Update with new dependencies
  - **Step Dependencies**: None
  - **User Instructions**: After this step, run `npm install` to install the new dependencies

- [ ] Step 6: Create Supabase Configuration
  - **Task**: Set up Supabase integration for vector storage and retrieval
  - **Files**:
    - `lib/supabase.ts`: Create Supabase client configuration
    - `.env.local`: Update with Supabase credentials
  - **Step Dependencies**: None
  - **User Instructions**: You'll need to create a Supabase project and add your credentials to the .env.local file

## Core AI Infrastructure

- [ ] Step 7: Create Model Loading Infrastructure
  - **Task**: Implement the core functionality for loading and managing the Mistral 7B base model
  - **Files**:
    - `lib/ai/model.ts`: Create model loading and management functions
    - `lib/ai/config.ts`: Create configuration for model parameters
  - **Step Dependencies**: Step 5
  - **User Instructions**: None

- [ ] Step 8: Implement 8-bit Quantization
  - **Task**: Add 8-bit quantization support for memory efficiency
  - **Files**:
    - `lib/ai/quantization.ts`: Create quantization utilities
    - `lib/ai/model.ts`: Update to support quantized models
  - **Step Dependencies**: Step 7
  - **User Instructions**: None

- [ ] Step 9: Create LoRA Adapter Framework
  - **Task**: Implement LoRA adapter loading and switching for domain specializations
  - **Files**:
    - `lib/ai/lora.ts`: Create LoRA adapter management utilities
    - `lib/ai/model.ts`: Update to integrate LoRA adapters
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 10: Implement Vector Embedding Pipeline
  - **Task**: Create the embedding pipeline for converting interactions to vectors
  - **Files**:
    - `lib/ai/embeddings.ts`: Create embedding generation utilities
    - `lib/ai/vectordb.ts`: Create vector storage and retrieval functions using Supabase
  - **Step Dependencies**: Step 6, Step 7
  - **User Instructions**: None

- [ ] Step 11: Create Keyword Extraction System
  - **Task**: Implement keyword extraction for hybrid retrieval
  - **Files**:
    - `lib/ai/keywords.ts`: Create keyword extraction utilities
    - `lib/ai/retrieval.ts`: Create hybrid retrieval functions
  - **Step Dependencies**: Step 10
  - **User Instructions**: None

## Memory Architecture

- [ ] Step 12: Implement Neocortical System
  - **Task**: Create the slow-learning neocortical system based on Mistral 7B
  - **Files**:
    - `lib/memory/neocortical.ts`: Create neocortical system implementation
    - `lib/memory/types.ts`: Define memory system types
  - **Step Dependencies**: Step 9
  - **User Instructions**: None

- [ ] Step 13: Implement Hippocampal Fast Learning System
  - **Task**: Create the fast-learning hippocampal system using RAG with vector database
  - **Files**:
    - `lib/memory/hippocampal.ts`: Create hippocampal system implementation
    - `lib/memory/rag.ts`: Implement retrieval-augmented generation
  - **Step Dependencies**: Step 10, Step 11
  - **User Instructions**: None

- [ ] Step 14: Implement Memory Integration System
  - **Task**: Create the system that integrates slow and fast learning systems
  - **Files**:
    - `lib/memory/integration.ts`: Create integration logic
    - `lib/memory/index.ts`: Export unified memory system
  - **Step Dependencies**: Step 12, Step 13
  - **User Instructions**: None

## Specialization Framework

- [ ] Step 15: Implement Input Classification and Routing
  - **Task**: Create the system to classify inputs and route them to appropriate specializations
  - **Files**:
    - `lib/specialization/classifier.ts`: Create input classification
    - `lib/specialization/router.ts`: Create routing logic
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 16: Implement Factual Knowledge Specialization
  - **Task**: Create the factual knowledge (semantic memory) specialization
  - **Files**:
    - `lib/specialization/factual.ts`: Implement factual knowledge specialization
    - `lib/specialization/types.ts`: Define specialization interfaces
  - **Step Dependencies**: Step 15
  - **User Instructions**: None

- [ ] Step 17: Implement Procedural Memory Specialization
  - **Task**: Create the procedural memory (skills and processes) specialization
  - **Files**:
    - `lib/specialization/procedural.ts`: Implement procedural memory specialization
  - **Step Dependencies**: Step 16
  - **User Instructions**: None

- [ ] Step 18: Implement Social Interaction Memory Specialization
  - **Task**: Create the social interaction memory specialization
  - **Files**:
    - `lib/specialization/social.ts`: Implement social interaction memory specialization
  - **Step Dependencies**: Step 17
  - **User Instructions**: None

- [ ] Step 19: Implement Episodic Memory Specialization
  - **Task**: Create the episodic memory (temporal experiences) specialization
  - **Files**:
    - `lib/specialization/episodic.ts`: Implement episodic memory specialization
    - `lib/specialization/temporal.ts`: Create temporal context tracking
  - **Step Dependencies**: Step 18
  - **User Instructions**: None

- [ ] Step 20: Create Specialization Manager
  - **Task**: Implement a manager to coordinate between different specializations
  - **Files**:
    - `lib/specialization/manager.ts`: Create specialization management
    - `lib/specialization/index.ts`: Export unified specialization system
  - **Step Dependencies**: Step 19
  - **User Instructions**: None

## Memory Management

- [ ] Step 21: Implement Prediction Error Calculation
  - **Task**: Create system for calculating prediction error for memory importance
  - **Files**:
    - `lib/memory-management/prediction-error.ts`: Implement prediction error calculation
    - `lib/memory-management/types.ts`: Define memory management types
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 22: Implement Priority Queue for Memory Replay
  - **Task**: Create priority queue based on surprise scores for memory replay
  - **Files**:
    - `lib/memory-management/priority-queue.ts`: Implement priority queue
    - `lib/memory-management/replay.ts`: Create memory replay system
  - **Step Dependencies**: Step 21
  - **User Instructions**: None

- [ ] Step 23: Implement Memory Consolidation Scheduler
  - **Task**: Create scheduler for memory consolidation
  - **Files**:
    - `lib/memory-management/scheduler.ts`: Implement consolidation scheduler
    - `lib/memory-management/consolidation.ts`: Create consolidation logic
  - **Step Dependencies**: Step 22
  - **User Instructions**: None

- [ ] Step 24: Implement Parameter Importance Tracking
  - **Task**: Create Synaptic Intelligence for parameter importance tracking
  - **Files**:
    - `lib/memory-management/synaptic-intelligence.ts`: Implement parameter importance tracking
    - `lib/memory-management/importance.ts`: Create importance score utilities
  - **Step Dependencies**: Step 23
  - **User Instructions**: None

- [ ] Step 25: Implement Selective Regularization
  - **Task**: Create regularization based on importance scores
  - **Files**:
    - `lib/memory-management/regularization.ts`: Implement selective regularization
  - **Step Dependencies**: Step 24
  - **User Instructions**: None

- [ ] Step 26: Implement Conflict Resolution
  - **Task**: Create system for resolving contradictory information
  - **Files**:
    - `lib/memory-management/conflict-resolution.ts`: Implement conflict resolution
  - **Step Dependencies**: Step 25
  - **User Instructions**: None

- [ ] Step 27: Create Memory Management Integration
  - **Task**: Integrate all memory management components
  - **Files**:
    - `lib/memory-management/index.ts`: Export unified memory management system
  - **Step Dependencies**: Step 26
  - **User Instructions**: None

## Fine-tuning Pipeline

- [ ] Step 28: Create PyTorch Training Loop
  - **Task**: Implement efficient PyTorch training loop for fine-tuning
  - **Files**:
    - `lib/training/loop.ts`: Create training loop implementation
    - `lib/training/types.ts`: Define training types
  - **Step Dependencies**: Step 9
  - **User Instructions**: None

- [ ] Step 29: Implement Checkpoint Management
  - **Task**: Create system for managing model checkpoints
  - **Files**:
    - `lib/training/checkpoints.ts`: Implement checkpoint management
    - `lib/training/storage.ts`: Create storage utilities
  - **Step Dependencies**: Step 28
  - **User Instructions**: None

- [ ] Step 30: Create Fine-tuning Pipeline Integration
  - **Task**: Integrate all fine-tuning components
  - **Files**:
    - `lib/training/index.ts`: Export unified training system
  - **Step Dependencies**: Step 29
  - **User Instructions**: None

## Web Frontend - Core Components

- [ ] Step 31: Set Up UI Component Library
  - **Task**: Set up shadcn/ui component library with Tailwind CSS
  - **Files**:
    - `components.json`: Update components configuration
    - `lib/utils.ts`: Update utility functions
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 32: Create Theme Provider
  - **Task**: Implement theme provider with dark/light mode
  - **Files**:
    - `components/theme-provider.tsx`: Create theme provider component
    - `components/theme-switch.tsx`: Create theme switching component
    - `app/layout.tsx`: Update to include theme provider
  - **Step Dependencies**: Step 31
  - **User Instructions**: None

- [ ] Step 33: Create Layout Components
  - **Task**: Create reusable layout components
  - **Files**:
    - `components/layout/header.tsx`: Create header component
    - `components/layout/sidebar.tsx`: Create sidebar component
    - `components/layout/main.tsx`: Create main content component
    - `components/layout/footer.tsx`: Create footer component
    - `app/layout.tsx`: Update to use layout components
  - **Step Dependencies**: Step 32
  - **User Instructions**: None

- [ ] Step 34: Create Chat Interface Components
  - **Task**: Create components for the chat/query interface
  - **Files**:
    - `components/chat/message.tsx`: Create message component
    - `components/chat/input.tsx`: Create input component
    - `components/chat/history.tsx`: Create chat history component
    - `components/chat/conversation.tsx`: Create conversation component
  - **Step Dependencies**: Step 33
  - **User Instructions**: None

- [ ] Step 35: Create System Status Components
  - **Task**: Create components for system status and monitoring
  - **Files**:
    - `components/status/model-status.tsx`: Create model status component
    - `components/status/memory-status.tsx`: Create memory status component
    - `components/status/performance-metrics.tsx`: Create performance metrics component
    - `components/status/status-dashboard.tsx`: Create status dashboard component
  - **Step Dependencies**: Step 34
  - **User Instructions**: None

## Web Frontend - Pages and Features

- [ ] Step 36: Create Home Page
  - **Task**: Implement the main home page with chat interface
  - **Files**:
    - `app/page.tsx`: Update home page with chat interface
    - `app/actions.ts`: Create server actions for chat
  - **Step Dependencies**: Step 34
  - **User Instructions**: None

- [ ] Step 37: Implement Chat Functionality
  - **Task**: Add functionality to the chat interface
  - **Files**:
    - `app/api/chat/route.ts`: Create chat API route
    - `lib/chat.ts`: Create chat utility functions
    - `app/actions.ts`: Update server actions for chat
  - **Step Dependencies**: Step 36, Step 14
  - **User Instructions**: None

- [ ] Step 38: Create Model Management Page
  - **Task**: Implement the model management page
  - **Files**:
    - `app/model/page.tsx`: Create model management page
    - `app/model/actions.ts`: Create server actions for model management
    - `components/model/model-card.tsx`: Create model card component
    - `components/model/model-controls.tsx`: Create model controls component
  - **Step Dependencies**: Step 35, Step 9
  - **User Instructions**: None

- [ ] Step 39: Create Memory Visualization Page
  - **Task**: Implement the memory visualization page
  - **Files**:
    - `app/memory/page.tsx`: Create memory visualization page
    - `app/memory/actions.ts`: Create server actions for memory visualization
    - `components/visualizations/specialty-activation.tsx`: Create specialty activation visualization
    - `components/visualizations/importance-heatmap.tsx`: Create importance heatmap visualization
    - `components/visualizations/temporal-sequence.tsx`: Create temporal sequence visualization
  - **Step Dependencies**: Step 38, Step 20, Step 27
  - **User Instructions**: None

- [ ] Step 40: Create Configuration Panel
  - **Task**: Implement the configuration panel for system parameters
  - **Files**:
    - `app/config/page.tsx`: Create configuration page
    - `app/config/actions.ts`: Create server actions for configuration
    - `components/config/parameter-input.tsx`: Create parameter input component
    - `components/config/config-section.tsx`: Create configuration section component
    - `components/config/config-panel.tsx`: Create configuration panel component
  - **Step Dependencies**: Step 39
  - **User Instructions**: None

## API Routes and Integration

- [ ] Step 41: Create Model API Routes
  - **Task**: Implement API routes for model interaction
  - **Files**:
    - `app/api/model/query/route.ts`: Create model query API
    - `app/api/model/status/route.ts`: Create model status API
    - `app/api/model/specialization/route.ts`: Create specialization API
  - **Step Dependencies**: Step 20
  - **User Instructions**: None

- [ ] Step 42: Create Memory API Routes
  - **Task**: Implement API routes for memory management
  - **Files**:
    - `app/api/memory/store/route.ts`: Create memory storage API
    - `app/api/memory/retrieve/route.ts`: Create memory retrieval API
    - `app/api/memory/importance/route.ts`: Create importance scoring API
  - **Step Dependencies**: Step 27
  - **User Instructions**: None

- [ ] Step 43: Create WebSocket Setup
  - **Task**: Implement WebSocket for real-time communication
  - **Files**:
    - `lib/websocket.ts`: Create WebSocket utility functions
    - `app/api/ws/route.ts`: Create WebSocket API route
    - `components/websocket-provider.tsx`: Create WebSocket provider component
    - `app/layout.tsx`: Update to include WebSocket provider
  - **Step Dependencies**: Step 42
  - **User Instructions**: None

## Optimization and Performance

- [ ] Step 44: Implement GPU Optimization
  - **Task**: Create optimizations for consumer GPUs
  - **Files**:
    - `lib/optimization/gpu.ts`: Create GPU optimization utilities
    - `lib/ai/model.ts`: Update with GPU optimizations
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 45: Implement Sparse Activation
  - **Task**: Create sparse activation optimizations
  - **Files**:
    - `lib/optimization/sparse-activation.ts`: Implement sparse activation
    - `lib/ai/model.ts`: Update with sparse activation
  - **Step Dependencies**: Step 44
  - **User Instructions**: None

- [ ] Step 46: Create System Profiling
  - **Task**: Implement system profiling capabilities
  - **Files**:
    - `lib/profiling/metrics.ts`: Create metrics collection
    - `lib/profiling/visualization.ts`: Create profiling visualization
    - `components/profiling/profiler.tsx`: Create profiler component
    - `app/profiling/page.tsx`: Create profiling page
  - **Step Dependencies**: Step 45
  - **User Instructions**: None

## Testing Framework

- [ ] Step 47: Set Up Jest Testing
  - **Task**: Set up Jest for backend testing
  - **Files**:
    - `jest.config.js`: Create Jest configuration
    - `package.json`: Update with Jest dependencies
  - **Step Dependencies**: None
  - **User Instructions**: Run `npm install` after this step to install testing dependencies

- [ ] Step 48: Create Unit Tests for Core Functions
  - **Task**: Implement unit tests for core AI functions
  - **Files**:
    - `__tests__/lib/ai/model.test.ts`: Create model tests
    - `__tests__/lib/memory/integration.test.ts`: Create memory integration tests
    - `__tests__/lib/specialization/router.test.ts`: Create router tests
  - **Step Dependencies**: Step 47
  - **User Instructions**: None

- [ ] Step 49: Set Up React Testing Library
  - **Task**: Set up React Testing Library for frontend components
  - **Files**:
    - `jest.setup.js`: Create Jest setup file for React Testing Library
    - `__tests__/components/chat/conversation.test.tsx`: Create conversation tests
    - `__tests__/components/status/model-status.test.tsx`: Create model status tests
  - **Step Dependencies**: Step 48
  - **User Instructions**: None

- [ ] Step 50: Create Specialized Evaluation Framework
  - **Task**: Implement specialized model evaluation framework
  - **Files**:
    - `lib/evaluation/forgetting.ts`: Create forgetting benchmarks
    - `lib/evaluation/retrieval.ts`: Create retrieval accuracy metrics
    - `lib/evaluation/specialization.ts`: Create specialization effectiveness tests
    - `app/evaluation/page.tsx`: Create evaluation page
    - `components/evaluation/results.tsx`: Create evaluation results component
  - **Step Dependencies**: Step 49
  - **User Instructions**: None

## Deployment and Documentation

- [ ] Step 51: Create Docker Configuration
  - **Task**: Set up Docker containerization
  - **Files**:
    - `Dockerfile`: Create Docker configuration
    - `docker-compose.yml`: Create Docker Compose configuration
    - `.dockerignore`: Create Docker ignore file
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 52: Create Documentation Pages
  - **Task**: Create documentation pages for the system
  - **Files**:
    - `app/docs/page.tsx`: Create documentation main page
    - `app/docs/getting-started/page.tsx`: Create getting started page
    - `app/docs/api/page.tsx`: Create API documentation page
    - `app/docs/memory-system/page.tsx`: Create memory system documentation
    - `app/docs/specializations/page.tsx`: Create specializations documentation
  - **Step Dependencies**: None
  - **User Instructions**: None

## Summary

This implementation plan outlines a structured approach to building the Kook brain-inspired memory system. The plan is organized into logical sections, starting with basic infrastructure and progressing through the AI components, memory systems, specialization framework, and finally the web interface.

Key considerations for implementation:
1. The database schema is established early to provide a foundation for data storage
2. AI components are implemented in a modular fashion, allowing for easy integration
3. Memory systems are built upon the AI foundation, with clear separation of concerns
4. The web interface is developed to provide intuitive access to the underlying systems
5. Testing and documentation are integrated throughout the process

This plan provides a comprehensive roadmap for implementing all the features described in the project specification, with clear dependencies and instructions for each step.

---

_**User**_

4 more issues:
we won't be using docker, 
use ollama to run the model,
look at the cursorrules and suggest any improvements
should they be .mdc rather than .md?

---

_**Assistant**_

<think>Let me address each of the issues raised:

1. No Docker: We should remove the Docker-related steps from the implementation plan.

2. Use Ollama to run the model: We'll need to update the plan to incorporate Ollama for model running instead of loading models directly with PyTorch. This will simplify the implementation but requires specific Ollama integration steps.

3. Review CursorRules and suggest improvements: I need to check what CursorRules are in the current codebase to suggest improvements.

4. File extension question - .mdc vs .md: I need to address whether files should use .mdc instead of .md extension.

Let me first check what CursorRules might be in the codebase.</think>I'll address each of these issues and make the necessary adjustments to the implementation plan:

1. **Docker Removal**: I'll update the plan to remove Docker-related steps.

2. **Ollama Integration**: I'll modify the AI infrastructure section to use Ollama for running the model instead of direct PyTorch integration.

3. **CursorRules Review**: Let me check if there are any CursorRules files in the codebase.

---

_****_



---

_****_

Let me check what's in one of these files to understand their purpose and content structure:

---

_****_

Read file: .cursorrules/index.md

---

_****_

Now let me check one of the other rule files to see the content format:

---

_****_

Read file: .cursorrules/pytorch.md

---

_****_

Let me check one more rule file to get a comprehensive understanding:

---

_****_

Read file: .cursorrules/documentation.md

---

_****_

Now that I have a better understanding of the CursorRules and the project specifications, I'll address the issues and provide an updated implementation plan:

## Updated Implementation Plan with Requested Changes

1. **Docker Removal**:
   - I'll remove the Docker-related step (Step 51) from the plan.

2. **Ollama Integration**:
   - I'll modify the AI infrastructure section to use Ollama for running the model instead of direct PyTorch integration.

3. **CursorRules Improvements**:
   Based on reviewing the existing CursorRules, here are some suggested improvements:

   - Add a specific `.cursorrules/ollama.md` file with guidelines for Ollama integration
   - Update the `.cursorrules/index.md` to include Ollama in the tech stack
   - Add more specific TypeScript typing guidelines in `.cursorrules/typescript.md`
   - Create a `.cursorrules/memory-systems.md` file with specific guidelines for implementing the brain-inspired memory architectures
   - Add a `.cursorrules/testing.md` file with comprehensive testing strategies specific to ML components

4. **File Extension (.mdc vs .md)**:
   - According to the documentation guidelines in `.cursorrules/documentation.md`, the project explicitly states to use `.md` for standard documentation and not to use `.mdc` files as they are not a standard format. Therefore, we should continue using `.md` files as specified in the documentation guidelines.

Here's the updated implementation plan with these changes incorporated:

```md
# Implementation Plan

## Project Setup and Infrastructure

- [ ] Step 1: Create Schema Directory Structure
  - **Task**: Set up the database schema directory structure and create the base schema index file
  - **Files**:
    - `db/schema/index.ts`: Create the main schema export file
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 2: Set Up Database Schema - Core Tables
  - **Task**: Define core database tables for the system (users, sessions, content)
  - **Files**:
    - `db/schema/index.ts`: Update to export all schema tables
    - `db/schema/users.ts`: Create user-related tables
    - `db/schema/sessions.ts`: Create session tracking tables
    - `db/schema/content.ts`: Create content and memory storage tables
  - **Step Dependencies**: Step 1
  - **User Instructions**: None

- [ ] Step 3: Set Up Database Schema - Memory Systems
  - **Task**: Define tables for memory systems including vectors, importance scores, and specialty domains
  - **Files**:
    - `db/schema/memory.ts`: Create memory-related tables including vector storage
    - `db/schema/specializations.ts`: Create tables for specialty domains and LoRA adapters
    - `db/schema/index.ts`: Update to include new schema tables
  - **Step Dependencies**: Step 2
  - **User Instructions**: None

- [ ] Step 4: Update Database Connection
  - **Task**: Update the database connection to use the complete schema
  - **Files**:
    - `db/db.ts`: Update the schema import and configuration
  - **Step Dependencies**: Step 3
  - **User Instructions**: None

- [ ] Step 5: Install AI and Database Dependencies
  - **Task**: Add necessary dependencies for AI and database functionality
  - **Files**:
    - `package.json`: Update with new dependencies
  - **Step Dependencies**: None
  - **User Instructions**: After this step, run `npm install` to install the new dependencies

- [ ] Step 6: Create Supabase Configuration
  - **Task**: Set up Supabase integration for vector storage and retrieval
  - **Files**:
    - `lib/supabase.ts`: Create Supabase client configuration
    - `.env.local`: Update with Supabase credentials
  - **Step Dependencies**: None
  - **User Instructions**: You'll need to create a Supabase project and add your credentials to the .env.local file

## Core AI Infrastructure with Ollama

- [ ] Step 7: Create Ollama Integration
  - **Task**: Implement core functionality for connecting to and using Ollama for the Mistral 7B model
  - **Files**:
    - `lib/ai/ollama.ts`: Create Ollama client and integration functions
    - `lib/ai/config.ts`: Create configuration for Ollama parameters
    - `.env.local`: Update with Ollama endpoint details
  - **Step Dependencies**: Step 5
  - **User Instructions**: Ensure Ollama is installed and running with the Mistral 7B model loaded

- [ ] Step 8: Implement Model Management
  - **Task**: Create utilities for managing model tags, versions, and quantization options in Ollama
  - **Files**:
    - `lib/ai/model-management.ts`: Create model management utilities
    - `lib/ai/ollama.ts`: Update to support model management functions
  - **Step Dependencies**: Step 7
  - **User Instructions**: None

- [ ] Step 9: Create LoRA Adapter Framework for Ollama
  - **Task**: Implement LoRA adapter management for domain specializations through Ollama
  - **Files**:
    - `lib/ai/lora.ts`: Create LoRA adapter management utilities
    - `lib/ai/ollama.ts`: Update to support LoRA adapters
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 10: Implement Vector Embedding Pipeline
  - **Task**: Create the embedding pipeline for converting interactions to vectors
  - **Files**:
    - `lib/ai/embeddings.ts`: Create embedding generation utilities
    - `lib/ai/vectordb.ts`: Create vector storage and retrieval functions using Supabase
  - **Step Dependencies**: Step 6, Step 7
  - **User Instructions**: None

- [ ] Step 11: Create Keyword Extraction System
  - **Task**: Implement keyword extraction for hybrid retrieval
  - **Files**:
    - `lib/ai/keywords.ts`: Create keyword extraction utilities
    - `lib/ai/retrieval.ts`: Create hybrid retrieval functions
  - **Step Dependencies**: Step 10
  - **User Instructions**: None

## Memory Architecture

- [ ] Step 12: Implement Neocortical System
  - **Task**: Create the slow-learning neocortical system based on Mistral 7B via Ollama
  - **Files**:
    - `lib/memory/neocortical.ts`: Create neocortical system implementation
    - `lib/memory/types.ts`: Define memory system types
  - **Step Dependencies**: Step 9
  - **User Instructions**: None

- [ ] Step 13: Implement Hippocampal Fast Learning System
  - **Task**: Create the fast-learning hippocampal system using RAG with vector database
  - **Files**:
    - `lib/memory/hippocampal.ts`: Create hippocampal system implementation
    - `lib/memory/rag.ts`: Implement retrieval-augmented generation
  - **Step Dependencies**: Step 10, Step 11
  - **User Instructions**: None

- [ ] Step 14: Implement Memory Integration System
  - **Task**: Create the system that integrates slow and fast learning systems
  - **Files**:
    - `lib/memory/integration.ts`: Create integration logic
    - `lib/memory/index.ts`: Export unified memory system
  - **Step Dependencies**: Step 12, Step 13
  - **User Instructions**: None

## Specialization Framework

- [ ] Step 15: Implement Input Classification and Routing
  - **Task**: Create the system to classify inputs and route them to appropriate specializations
  - **Files**:
    - `lib/specialization/classifier.ts`: Create input classification
    - `lib/specialization/router.ts`: Create routing logic
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 16: Implement Factual Knowledge Specialization
  - **Task**: Create the factual knowledge (semantic memory) specialization
  - **Files**:
    - `lib/specialization/factual.ts`: Implement factual knowledge specialization
    - `lib/specialization/types.ts`: Define specialization interfaces
  - **Step Dependencies**: Step 15
  - **User Instructions**: None

- [ ] Step 17: Implement Procedural Memory Specialization
  - **Task**: Create the procedural memory (skills and processes) specialization
  - **Files**:
    - `lib/specialization/procedural.ts`: Implement procedural memory specialization
  - **Step Dependencies**: Step 16
  - **User Instructions**: None

- [ ] Step 18: Implement Social Interaction Memory Specialization
  - **Task**: Create the social interaction memory specialization
  - **Files**:
    - `lib/specialization/social.ts`: Implement social interaction memory specialization
  - **Step Dependencies**: Step 17
  - **User Instructions**: None

- [ ] Step 19: Implement Episodic Memory Specialization
  - **Task**: Create the episodic memory (temporal experiences) specialization
  - **Files**:
    - `lib/specialization/episodic.ts`: Implement episodic memory specialization
    - `lib/specialization/temporal.ts`: Create temporal context tracking
  - **Step Dependencies**: Step 18
  - **User Instructions**: None

- [ ] Step 20: Create Specialization Manager
  - **Task**: Implement a manager to coordinate between different specializations
  - **Files**:
    - `lib/specialization/manager.ts`: Create specialization management
    - `lib/specialization/index.ts`: Export unified specialization system
  - **Step Dependencies**: Step 19
  - **User Instructions**: None

## Memory Management

- [ ] Step 21: Implement Prediction Error Calculation
  - **Task**: Create system for calculating prediction error for memory importance
  - **Files**:
    - `lib/memory-management/prediction-error.ts`: Implement prediction error calculation
    - `lib/memory-management/types.ts`: Define memory management types
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 22: Implement Priority Queue for Memory Replay
  - **Task**: Create priority queue based on surprise scores for memory replay
  - **Files**:
    - `lib/memory-management/priority-queue.ts`: Implement priority queue
    - `lib/memory-management/replay.ts`: Create memory replay system
  - **Step Dependencies**: Step 21
  - **User Instructions**: None

- [ ] Step 23: Implement Memory Consolidation Scheduler
  - **Task**: Create scheduler for memory consolidation
  - **Files**:
    - `lib/memory-management/scheduler.ts`: Implement consolidation scheduler
    - `lib/memory-management/consolidation.ts`: Create consolidation logic
  - **Step Dependencies**: Step 22
  - **User Instructions**: None

- [ ] Step 24: Implement Parameter Importance Tracking
  - **Task**: Create Synaptic Intelligence for parameter importance tracking
  - **Files**:
    - `lib/memory-management/synaptic-intelligence.ts`: Implement parameter importance tracking
    - `lib/memory-management/importance.ts`: Create importance score utilities
  - **Step Dependencies**: Step 23
  - **User Instructions**: None

- [ ] Step 25: Implement Selective Regularization
  - **Task**: Create regularization based on importance scores
  - **Files**:
    - `lib/memory-management/regularization.ts`: Implement selective regularization
  - **Step Dependencies**: Step 24
  - **User Instructions**: None

- [ ] Step 26: Implement Conflict Resolution
  - **Task**: Create system for resolving contradictory information
  - **Files**:
    - `lib/memory-management/conflict-resolution.ts`: Implement conflict resolution
  - **Step Dependencies**: Step 25
  - **User Instructions**: None

- [ ] Step 27: Create Memory Management Integration
  - **Task**: Integrate all memory management components
  - **Files**:
    - `lib/memory-management/index.ts`: Export unified memory management system
  - **Step Dependencies**: Step 26
  - **User Instructions**: None

## Web Frontend - Core Components

- [ ] Step 28: Set Up UI Component Library
  - **Task**: Set up shadcn/ui component library with Tailwind CSS
  - **Files**:
    - `components.json`: Update components configuration
    - `lib/utils.ts`: Update utility functions
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 29: Create Theme Provider
  - **Task**: Implement theme provider with dark/light mode
  - **Files**:
    - `components/theme-provider.tsx`: Create theme provider component
    - `components/theme-switch.tsx`: Create theme switching component
    - `app/layout.tsx`: Update to include theme provider
  - **Step Dependencies**: Step 28
  - **User Instructions**: None

- [ ] Step 30: Create Layout Components
  - **Task**: Create reusable layout components
  - **Files**:
    - `components/layout/header.tsx`: Create header component
    - `components/layout/sidebar.tsx`: Create sidebar component
    - `components/layout/main.tsx`: Create main content component
    - `components/layout/footer.tsx`: Create footer component
    - `app/layout.tsx`: Update to use layout components
  - **Step Dependencies**: Step 29
  - **User Instructions**: None

- [ ] Step 31: Create Chat Interface Components
  - **Task**: Create components for the chat/query interface
  - **Files**:
    - `components/chat/message.tsx`: Create message component
    - `components/chat/input.tsx`: Create input component
    - `components/chat/history.tsx`: Create chat history component
    - `components/chat/conversation.tsx`: Create conversation component
  - **Step Dependencies**: Step 30
  - **User Instructions**: None

- [ ] Step 32: Create System Status Components
  - **Task**: Create components for system status and monitoring
  - **Files**:
    - `components/status/model-status.tsx`: Create model status component
    - `components/status/memory-status.tsx`: Create memory status component
    - `components/status/performance-metrics.tsx`: Create performance metrics component
    - `components/status/status-dashboard.tsx`: Create status dashboard component
  - **Step Dependencies**: Step 31
  - **User Instructions**: None

## Web Frontend - Pages and Features

- [ ] Step 33: Create Home Page
  - **Task**: Implement the main home page with chat interface
  - **Files**:
    - `app/page.tsx`: Update home page with chat interface
    - `app/actions.ts`: Create server actions for chat
  - **Step Dependencies**: Step 31
  - **User Instructions**: None

- [ ] Step 34: Implement Chat Functionality
  - **Task**: Add functionality to the chat interface
  - **Files**:
    - `app/api/chat/route.ts`: Create chat API route
    - `lib/chat.ts`: Create chat utility functions
    - `app/actions.ts`: Update server actions for chat
  - **Step Dependencies**: Step 33, Step 14
  - **User Instructions**: None

- [ ] Step 35: Create Model Management Page
  - **Task**: Implement the model management page for Ollama models
  - **Files**:
    - `app/model/page.tsx`: Create model management page
    - `app/model/actions.ts`: Create server actions for model management
    - `components/model/model-card.tsx`: Create model card component
    - `components/model/model-controls.tsx`: Create model controls component
  - **Step Dependencies**: Step 32, Step 9
  - **User Instructions**: None

- [ ] Step 36: Create Memory Visualization Page
  - **Task**: Implement the memory visualization page
  - **Files**:
    - `app/memory/page.tsx`: Create memory visualization page
    - `app/memory/actions.ts`: Create server actions for memory visualization
    - `components/visualizations/specialty-activation.tsx`: Create specialty activation visualization
    - `components/visualizations/importance-heatmap.tsx`: Create importance heatmap visualization
    - `components/visualizations/temporal-sequence.tsx`: Create temporal sequence visualization
  - **Step Dependencies**: Step 35, Step 20, Step 27
  - **User Instructions**: None

- [ ] Step 37: Create Configuration Panel
  - **Task**: Implement the configuration panel for system parameters
  - **Files**:
    - `app/config/page.tsx`: Create configuration page
    - `app/config/actions.ts`: Create server actions for configuration
    - `components/config/parameter-input.tsx`: Create parameter input component
    - `components/config/config-section.tsx`: Create configuration section component
    - `components/config/config-panel.tsx`: Create configuration panel component
  - **Step Dependencies**: Step 36
  - **User Instructions**: None

## API Routes and Integration

- [ ] Step 38: Create Ollama API Routes
  - **Task**: Implement API routes for Ollama model interaction
  - **Files**:
    - `app/api/ollama/query/route.ts`: Create model query API
    - `app/api/ollama/status/route.ts`: Create model status API
    - `app/api/ollama/specialization/route.ts`: Create specialization API
  - **Step Dependencies**: Step 20
  - **User Instructions**: None

- [ ] Step 39: Create Memory API Routes
  - **Task**: Implement API routes for memory management
  - **Files**:
    - `app/api/memory/store/route.ts`: Create memory storage API
    - `app/api/memory/retrieve/route.ts`: Create memory retrieval API
    - `app/api/memory/importance/route.ts`: Create importance scoring API
  - **Step Dependencies**: Step 27
  - **User Instructions**: None

- [ ] Step 40: Create WebSocket Setup
  - **Task**: Implement WebSocket for real-time communication
  - **Files**:
    - `lib/websocket.ts`: Create WebSocket utility functions
    - `app/api/ws/route.ts`: Create WebSocket API route
    - `components/websocket-provider.tsx`: Create WebSocket provider component
    - `app/layout.tsx`: Update to include WebSocket provider
  - **Step Dependencies**: Step 39
  - **User Instructions**: None

## Optimization and Performance

- [ ] Step 41: Implement Consumer GPU Optimization for Ollama
  - **Task**: Create optimizations for running Ollama on consumer GPUs
  - **Files**:
    - `lib/optimization/gpu.ts`: Create GPU optimization utilities
    - `lib/ai/ollama.ts`: Update with GPU optimizations
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 42: Create System Profiling
  - **Task**: Implement system profiling capabilities
  - **Files**:
    - `lib/profiling/metrics.ts`: Create metrics collection
    - `lib/profiling/visualization.ts`: Create profiling visualization
    - `components/profiling/profiler.tsx`: Create profiler component
    - `app/profiling/page.tsx`: Create profiling page
  - **Step Dependencies**: Step 41
  - **User Instructions**: None

## Testing Framework

- [ ] Step 43: Set Up Jest Testing
  - **Task**: Set up Jest for backend testing
  - **Files**:
    - `jest.config.js`: Create Jest configuration
    - `package.json`: Update with Jest dependencies
  - **Step Dependencies**: None
  - **User Instructions**: Run `npm install` after this step to install testing dependencies

- [ ] Step 44: Create Unit Tests for Core Functions
  - **Task**: Implement unit tests for core AI functions
  - **Files**:
    - `__tests__/lib/ai/ollama.test.ts`: Create Ollama integration tests
    - `__tests__/lib/memory/integration.test.ts`: Create memory integration tests
    - `__tests__/lib/specialization/router.test.ts`: Create router tests
  - **Step Dependencies**: Step 43
  - **User Instructions**: None

- [ ] Step 45: Set Up React Testing Library
  - **Task**: Set up React Testing Library for frontend components
  - **Files**:
    - `jest.setup.js`: Create Jest setup file for React Testing Library
    - `__tests__/components/chat/conversation.test.tsx`: Create conversation tests
    - `__tests__/components/status/model-status.test.tsx`: Create model status tests
  - **Step Dependencies**: Step 44
  - **User Instructions**: None

- [ ] Step 46: Create Specialized Evaluation Framework
  - **Task**: Implement specialized model evaluation framework
  - **Files**:
    - `lib/evaluation/forgetting.ts`: Create forgetting benchmarks
    - `lib/evaluation/retrieval.ts`: Create retrieval accuracy metrics
    - `lib/evaluation/specialization.ts`: Create specialization effectiveness tests
    - `app/evaluation/page.tsx`: Create evaluation page
    - `components/evaluation/results.tsx`: Create evaluation results component
  - **Step Dependencies**: Step 45
  - **User Instructions**: None

## CursorRules Improvements

- [ ] Step 47: Enhance CursorRules Documentation
  - **Task**: Update and enhance CursorRules documentation
  - **Files**:
    - `.cursorrules/index.md`: Update index to include Ollama in tech stack
    - `.cursorrules/ollama.md`: Create new file with Ollama integration guidelines
    - `.cursorrules/memory-systems.md`: Create new file with memory system guidelines
    - `.cursorrules/testing.md`: Create new file with testing guidelines
    - `.cursorrules/typescript.md`: Enhance TypeScript typing guidelines
  - **Step Dependencies**: None
  - **User Instructions**: None

## Documentation

- [ ] Step 48: Create Documentation Pages
  - **Task**: Create documentation pages for the system
  - **Files**:
    - `app/docs/page.tsx`: Create documentation main page
    - `app/docs/getting-started/page.tsx`: Create getting started page
    - `app/docs/api/page.tsx`: Create API documentation page
    - `app/docs/memory-system/page.tsx`: Create memory system documentation
    - `app/docs/specializations/page.tsx`: Create specializations documentation
  - **Step Dependencies**: None
  - **User Instructions**: None
```

## Summary of Changes

1. **Docker Removal**: Removed the Docker-related step as requested
2. **Ollama Integration**: 
   - Replaced direct PyTorch model loading with Ollama integration
   - Added specific steps for integrating with Ollama for running the Mistral 7B model
   - Modified the API routes to work with Ollama instead of direct model access
3. **CursorRules Improvements**:
   - Added a specific step (Step 47) to enhance CursorRules with new files for Ollama, memory systems, and testing
   - Updated the index to include Ollama in the tech stack
   - Improved TypeScript typing guidelines
4. **File Extension Clarification**:
   - Confirmed that `.md` is the correct extension to use based on existing documentation guidelines
   - The documentation explicitly states not to use `.mdc` files as they are not a standard format

These updates align the implementation plan with your requirements while maintaining the comprehensive coverage of all features described in the project specification.

---

_**User**_

cancel ollama.  keep pytorch model integration

---

_**Assistant**_

<think>I need to revert back to the original PyTorch model integration approach instead of Ollama, while still removing Docker as requested. Let me update the plan accordingly.</think>I'll update the implementation plan to keep the PyTorch model integration and remove Ollama, while still removing Docker as requested.

```md
# Implementation Plan

## Project Setup and Infrastructure

- [ ] Step 1: Create Schema Directory Structure
  - **Task**: Set up the database schema directory structure and create the base schema index file
  - **Files**:
    - `db/schema/index.ts`: Create the main schema export file
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 2: Set Up Database Schema - Core Tables
  - **Task**: Define core database tables for the system (users, sessions, content)
  - **Files**:
    - `db/schema/index.ts`: Update to export all schema tables
    - `db/schema/users.ts`: Create user-related tables
    - `db/schema/sessions.ts`: Create session tracking tables
    - `db/schema/content.ts`: Create content and memory storage tables
  - **Step Dependencies**: Step 1
  - **User Instructions**: None

- [ ] Step 3: Set Up Database Schema - Memory Systems
  - **Task**: Define tables for memory systems including vectors, importance scores, and specialty domains
  - **Files**:
    - `db/schema/memory.ts`: Create memory-related tables including vector storage
    - `db/schema/specializations.ts`: Create tables for specialty domains and LoRA adapters
    - `db/schema/index.ts`: Update to include new schema tables
  - **Step Dependencies**: Step 2
  - **User Instructions**: None

- [ ] Step 4: Update Database Connection
  - **Task**: Update the database connection to use the complete schema
  - **Files**:
    - `db/db.ts`: Update the schema import and configuration
  - **Step Dependencies**: Step 3
  - **User Instructions**: None

- [ ] Step 5: Install AI and Database Dependencies
  - **Task**: Add necessary dependencies for AI and database functionality
  - **Files**:
    - `package.json`: Update with new dependencies
  - **Step Dependencies**: None
  - **User Instructions**: After this step, run `npm install` to install the new dependencies

- [ ] Step 6: Create Supabase Configuration
  - **Task**: Set up Supabase integration for vector storage and retrieval
  - **Files**:
    - `lib/supabase.ts`: Create Supabase client configuration
    - `.env.local`: Update with Supabase credentials
  - **Step Dependencies**: None
  - **User Instructions**: You'll need to create a Supabase project and add your credentials to the .env.local file

## Core AI Infrastructure

- [ ] Step 7: Create Model Loading Infrastructure
  - **Task**: Implement the core functionality for loading and managing the Mistral 7B base model
  - **Files**:
    - `lib/ai/model.ts`: Create model loading and management functions
    - `lib/ai/config.ts`: Create configuration for model parameters
  - **Step Dependencies**: Step 5
  - **User Instructions**: None

- [ ] Step 8: Implement 8-bit Quantization
  - **Task**: Add 8-bit quantization support for memory efficiency
  - **Files**:
    - `lib/ai/quantization.ts`: Create quantization utilities
    - `lib/ai/model.ts`: Update to support quantized models
  - **Step Dependencies**: Step 7
  - **User Instructions**: None

- [ ] Step 9: Create LoRA Adapter Framework
  - **Task**: Implement LoRA adapter loading and switching for domain specializations
  - **Files**:
    - `lib/ai/lora.ts`: Create LoRA adapter management utilities
    - `lib/ai/model.ts`: Update to integrate LoRA adapters
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 10: Implement Vector Embedding Pipeline
  - **Task**: Create the embedding pipeline for converting interactions to vectors
  - **Files**:
    - `lib/ai/embeddings.ts`: Create embedding generation utilities
    - `lib/ai/vectordb.ts`: Create vector storage and retrieval functions using Supabase
  - **Step Dependencies**: Step 6, Step 7
  - **User Instructions**: None

- [ ] Step 11: Create Keyword Extraction System
  - **Task**: Implement keyword extraction for hybrid retrieval
  - **Files**:
    - `lib/ai/keywords.ts`: Create keyword extraction utilities
    - `lib/ai/retrieval.ts`: Create hybrid retrieval functions
  - **Step Dependencies**: Step 10
  - **User Instructions**: None

## Memory Architecture

- [ ] Step 12: Implement Neocortical System
  - **Task**: Create the slow-learning neocortical system based on Mistral 7B
  - **Files**:
    - `lib/memory/neocortical.ts`: Create neocortical system implementation
    - `lib/memory/types.ts`: Define memory system types
  - **Step Dependencies**: Step 9
  - **User Instructions**: None

- [ ] Step 13: Implement Hippocampal Fast Learning System
  - **Task**: Create the fast-learning hippocampal system using RAG with vector database
  - **Files**:
    - `lib/memory/hippocampal.ts`: Create hippocampal system implementation
    - `lib/memory/rag.ts`: Implement retrieval-augmented generation
  - **Step Dependencies**: Step 10, Step 11
  - **User Instructions**: None

- [ ] Step 14: Implement Memory Integration System
  - **Task**: Create the system that integrates slow and fast learning systems
  - **Files**:
    - `lib/memory/integration.ts`: Create integration logic
    - `lib/memory/index.ts`: Export unified memory system
  - **Step Dependencies**: Step 12, Step 13
  - **User Instructions**: None

## Specialization Framework

- [ ] Step 15: Implement Input Classification and Routing
  - **Task**: Create the system to classify inputs and route them to appropriate specializations
  - **Files**:
    - `lib/specialization/classifier.ts`: Create input classification
    - `lib/specialization/router.ts`: Create routing logic
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 16: Implement Factual Knowledge Specialization
  - **Task**: Create the factual knowledge (semantic memory) specialization
  - **Files**:
    - `lib/specialization/factual.ts`: Implement factual knowledge specialization
    - `lib/specialization/types.ts`: Define specialization interfaces
  - **Step Dependencies**: Step 15
  - **User Instructions**: None

- [ ] Step 17: Implement Procedural Memory Specialization
  - **Task**: Create the procedural memory (skills and processes) specialization
  - **Files**:
    - `lib/specialization/procedural.ts`: Implement procedural memory specialization
  - **Step Dependencies**: Step 16
  - **User Instructions**: None

- [ ] Step 18: Implement Social Interaction Memory Specialization
  - **Task**: Create the social interaction memory specialization
  - **Files**:
    - `lib/specialization/social.ts`: Implement social interaction memory specialization
  - **Step Dependencies**: Step 17
  - **User Instructions**: None

- [ ] Step 19: Implement Episodic Memory Specialization
  - **Task**: Create the episodic memory (temporal experiences) specialization
  - **Files**:
    - `lib/specialization/episodic.ts`: Implement episodic memory specialization
    - `lib/specialization/temporal.ts`: Create temporal context tracking
  - **Step Dependencies**: Step 18
  - **User Instructions**: None

- [ ] Step 20: Create Specialization Manager
  - **Task**: Implement a manager to coordinate between different specializations
  - **Files**:
    - `lib/specialization/manager.ts`: Create specialization management
    - `lib/specialization/index.ts`: Export unified specialization system
  - **Step Dependencies**: Step 19
  - **User Instructions**: None

## Memory Management

- [ ] Step 21: Implement Prediction Error Calculation
  - **Task**: Create system for calculating prediction error for memory importance
  - **Files**:
    - `lib/memory-management/prediction-error.ts`: Implement prediction error calculation
    - `lib/memory-management/types.ts`: Define memory management types
  - **Step Dependencies**: Step 14
  - **User Instructions**: None

- [ ] Step 22: Implement Priority Queue for Memory Replay
  - **Task**: Create priority queue based on surprise scores for memory replay
  - **Files**:
    - `lib/memory-management/priority-queue.ts`: Implement priority queue
    - `lib/memory-management/replay.ts`: Create memory replay system
  - **Step Dependencies**: Step 21
  - **User Instructions**: None

- [ ] Step 23: Implement Memory Consolidation Scheduler
  - **Task**: Create scheduler for memory consolidation
  - **Files**:
    - `lib/memory-management/scheduler.ts`: Implement consolidation scheduler
    - `lib/memory-management/consolidation.ts`: Create consolidation logic
  - **Step Dependencies**: Step 22
  - **User Instructions**: None

- [ ] Step 24: Implement Parameter Importance Tracking
  - **Task**: Create Synaptic Intelligence for parameter importance tracking
  - **Files**:
    - `lib/memory-management/synaptic-intelligence.ts`: Implement parameter importance tracking
    - `lib/memory-management/importance.ts`: Create importance score utilities
  - **Step Dependencies**: Step 23
  - **User Instructions**: None

- [ ] Step 25: Implement Selective Regularization
  - **Task**: Create regularization based on importance scores
  - **Files**:
    - `lib/memory-management/regularization.ts`: Implement selective regularization
  - **Step Dependencies**: Step 24
  - **User Instructions**: None

- [ ] Step 26: Implement Conflict Resolution
  - **Task**: Create system for resolving contradictory information
  - **Files**:
    - `lib/memory-management/conflict-resolution.ts`: Implement conflict resolution
  - **Step Dependencies**: Step 25
  - **User Instructions**: None

- [ ] Step 27: Create Memory Management Integration
  - **Task**: Integrate all memory management components
  - **Files**:
    - `lib/memory-management/index.ts`: Export unified memory management system
  - **Step Dependencies**: Step 26
  - **User Instructions**: None

## Fine-tuning Pipeline

- [ ] Step 28: Create PyTorch Training Loop
  - **Task**: Implement efficient PyTorch training loop for fine-tuning
  - **Files**:
    - `lib/training/loop.ts`: Create training loop implementation
    - `lib/training/types.ts`: Define training types
  - **Step Dependencies**: Step 9
  - **User Instructions**: None

- [ ] Step 29: Implement Checkpoint Management
  - **Task**: Create system for managing model checkpoints
  - **Files**:
    - `lib/training/checkpoints.ts`: Implement checkpoint management
    - `lib/training/storage.ts`: Create storage utilities
  - **Step Dependencies**: Step 28
  - **User Instructions**: None

- [ ] Step 30: Create Fine-tuning Pipeline Integration
  - **Task**: Integrate all fine-tuning components
  - **Files**:
    - `lib/training/index.ts`: Export unified training system
  - **Step Dependencies**: Step 29
  - **User Instructions**: None

## Web Frontend - Core Components

- [ ] Step 31: Set Up UI Component Library
  - **Task**: Set up shadcn/ui component library with Tailwind CSS
  - **Files**:
    - `components.json`: Update components configuration
    - `lib/utils.ts`: Update utility functions
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 32: Create Theme Provider
  - **Task**: Implement theme provider with dark/light mode
  - **Files**:
    - `components/theme-provider.tsx`: Create theme provider component
    - `components/theme-switch.tsx`: Create theme switching component
    - `app/layout.tsx`: Update to include theme provider
  - **Step Dependencies**: Step 31
  - **User Instructions**: None

- [ ] Step 33: Create Layout Components
  - **Task**: Create reusable layout components
  - **Files**:
    - `components/layout/header.tsx`: Create header component
    - `components/layout/sidebar.tsx`: Create sidebar component
    - `components/layout/main.tsx`: Create main content component
    - `components/layout/footer.tsx`: Create footer component
    - `app/layout.tsx`: Update to use layout components
  - **Step Dependencies**: Step 32
  - **User Instructions**: None

- [ ] Step 34: Create Chat Interface Components
  - **Task**: Create components for the chat/query interface
  - **Files**:
    - `components/chat/message.tsx`: Create message component
    - `components/chat/input.tsx`: Create input component
    - `components/chat/history.tsx`: Create chat history component
    - `components/chat/conversation.tsx`: Create conversation component
  - **Step Dependencies**: Step 33
  - **User Instructions**: None

- [ ] Step 35: Create System Status Components
  - **Task**: Create components for system status and monitoring
  - **Files**:
    - `components/status/model-status.tsx`: Create model status component
    - `components/status/memory-status.tsx`: Create memory status component
    - `components/status/performance-metrics.tsx`: Create performance metrics component
    - `components/status/status-dashboard.tsx`: Create status dashboard component
  - **Step Dependencies**: Step 34
  - **User Instructions**: None

## Web Frontend - Pages and Features

- [ ] Step 36: Create Home Page
  - **Task**: Implement the main home page with chat interface
  - **Files**:
    - `app/page.tsx`: Update home page with chat interface
    - `app/actions.ts`: Create server actions for chat
  - **Step Dependencies**: Step 34
  - **User Instructions**: None

- [ ] Step 37: Implement Chat Functionality
  - **Task**: Add functionality to the chat interface
  - **Files**:
    - `app/api/chat/route.ts`: Create chat API route
    - `lib/chat.ts`: Create chat utility functions
    - `app/actions.ts`: Update server actions for chat
  - **Step Dependencies**: Step 36, Step 14
  - **User Instructions**: None

- [ ] Step 38: Create Model Management Page
  - **Task**: Implement the model management page
  - **Files**:
    - `app/model/page.tsx`: Create model management page
    - `app/model/actions.ts`: Create server actions for model management
    - `components/model/model-card.tsx`: Create model card component
    - `components/model/model-controls.tsx`: Create model controls component
  - **Step Dependencies**: Step 35, Step 9
  - **User Instructions**: None

- [ ] Step 39: Create Memory Visualization Page
  - **Task**: Implement the memory visualization page
  - **Files**:
    - `app/memory/page.tsx`: Create memory visualization page
    - `app/memory/actions.ts`: Create server actions for memory visualization
    - `components/visualizations/specialty-activation.tsx`: Create specialty activation visualization
    - `components/visualizations/importance-heatmap.tsx`: Create importance heatmap visualization
    - `components/visualizations/temporal-sequence.tsx`: Create temporal sequence visualization
  - **Step Dependencies**: Step 38, Step 20, Step 27
  - **User Instructions**: None

- [ ] Step 40: Create Configuration Panel
  - **Task**: Implement the configuration panel for system parameters
  - **Files**:
    - `app/config/page.tsx`: Create configuration page
    - `app/config/actions.ts`: Create server actions for configuration
    - `components/config/parameter-input.tsx`: Create parameter input component
    - `components/config/config-section.tsx`: Create configuration section component
    - `components/config/config-panel.tsx`: Create configuration panel component
  - **Step Dependencies**: Step 39
  - **User Instructions**: None

## API Routes and Integration

- [ ] Step 41: Create Model API Routes
  - **Task**: Implement API routes for model interaction
  - **Files**:
    - `app/api/model/query/route.ts`: Create model query API
    - `app/api/model/status/route.ts`: Create model status API
    - `app/api/model/specialization/route.ts`: Create specialization API
  - **Step Dependencies**: Step 20
  - **User Instructions**: None

- [ ] Step 42: Create Memory API Routes
  - **Task**: Implement API routes for memory management
  - **Files**:
    - `app/api/memory/store/route.ts`: Create memory storage API
    - `app/api/memory/retrieve/route.ts`: Create memory retrieval API
    - `app/api/memory/importance/route.ts`: Create importance scoring API
  - **Step Dependencies**: Step 27
  - **User Instructions**: None

- [ ] Step 43: Create WebSocket Setup
  - **Task**: Implement WebSocket for real-time communication
  - **Files**:
    - `lib/websocket.ts`: Create WebSocket utility functions
    - `app/api/ws/route.ts`: Create WebSocket API route
    - `components/websocket-provider.tsx`: Create WebSocket provider component
    - `app/layout.tsx`: Update to include WebSocket provider
  - **Step Dependencies**: Step 42
  - **User Instructions**: None

## Optimization and Performance

- [ ] Step 44: Implement GPU Optimization
  - **Task**: Create optimizations for consumer GPUs
  - **Files**:
    - `lib/optimization/gpu.ts`: Create GPU optimization utilities
    - `lib/ai/model.ts`: Update with GPU optimizations
  - **Step Dependencies**: Step 8
  - **User Instructions**: None

- [ ] Step 45: Implement Sparse Activation
  - **Task**: Create sparse activation optimizations
  - **Files**:
    - `lib/optimization/sparse-activation.ts`: Implement sparse activation
    - `lib/ai/model.ts`: Update with sparse activation
  - **Step Dependencies**: Step 44
  - **User Instructions**: None

- [ ] Step 46: Create System Profiling
  - **Task**: Implement system profiling capabilities
  - **Files**:
    - `lib/profiling/metrics.ts`: Create metrics collection
    - `lib/profiling/visualization.ts`: Create profiling visualization
    - `components/profiling/profiler.tsx`: Create profiler component
    - `app/profiling/page.tsx`: Create profiling page
  - **Step Dependencies**: Step 45
  - **User Instructions**: None

## Testing Framework

- [ ] Step 47: Set Up Jest Testing
  - **Task**: Set up Jest for backend testing
  - **Files**:
    - `jest.config.js`: Create Jest configuration
    - `package.json`: Update with Jest dependencies
  - **Step Dependencies**: None
  - **User Instructions**: Run `npm install` after this step to install testing dependencies

- [ ] Step 48: Create Unit Tests for Core Functions
  - **Task**: Implement unit tests for core AI functions
  - **Files**:
    - `__tests__/lib/ai/model.test.ts`: Create model tests
    - `__tests__/lib/memory/integration.test.ts`: Create memory integration tests
    - `__tests__/lib/specialization/router.test.ts`: Create router tests
  - **Step Dependencies**: Step 47
  - **User Instructions**: None

- [ ] Step 49: Set Up React Testing Library
  - **Task**: Set up React Testing Library for frontend components
  - **Files**:
    - `jest.setup.js`: Create Jest setup file for React Testing Library
    - `__tests__/components/chat/conversation.test.tsx`: Create conversation tests
    - `__tests__/components/status/model-status.test.tsx`: Create model status tests
  - **Step Dependencies**: Step 48
  - **User Instructions**: None

- [ ] Step 50: Create Specialized Evaluation Framework
  - **Task**: Implement specialized model evaluation framework
  - **Files**:
    - `lib/evaluation/forgetting.ts`: Create forgetting benchmarks
    - `lib/evaluation/retrieval.ts`: Create retrieval accuracy metrics
    - `lib/evaluation/specialization.ts`: Create specialization effectiveness tests
    - `app/evaluation/page.tsx`: Create evaluation page
    - `components/evaluation/results.tsx`: Create evaluation results component
  - **Step Dependencies**: Step 49
  - **User Instructions**: None

## CursorRules Improvements

- [ ] Step 51: Enhance CursorRules Documentation
  - **Task**: Update and enhance CursorRules documentation
  - **Files**:
    - `.cursorrules/index.md`: Update with latest tech stack information
    - `.cursorrules/memory-systems.md`: Create new file with memory system guidelines
    - `.cursorrules/testing.md`: Create new file with testing guidelines
    - `.cursorrules/typescript.md`: Enhance TypeScript typing guidelines
  - **Step Dependencies**: None
  - **User Instructions**: None

## Documentation

- [ ] Step 52: Create Documentation Pages
  - **Task**: Create documentation pages for the system
  - **Files**:
    - `app/docs/page.tsx`: Create documentation main page
    - `app/docs/getting-started/page.tsx`: Create getting started page
    - `app/docs/api/page.tsx`: Create API documentation page
    - `app/docs/memory-system/page.tsx`: Create memory system documentation
    - `app/docs/specializations/page.tsx`: Create specializations documentation
  - **Step Dependencies**: None
  - **User Instructions**: None
```

## Summary of Changes

1. **Docker Removal**: Removed the Docker-related step as requested
2. **PyTorch Integration**: 
   - Kept the original PyTorch model integration approach
   - Maintained the direct PyTorch model loading and management infrastructure
   - Preserved the GPU optimization steps for PyTorch models
3. **CursorRules Improvements**:
   - Added a specific step (Step 51) to enhance CursorRules with new files for memory systems and testing
   - Updated the index to include the latest tech stack information
   - Improved TypeScript typing guidelines
4. **File Extension Clarification**:
   - Confirmed that `.md` is the correct extension to use based on existing documentation guidelines

This updated plan maintains your original request to keep the PyTorch model integration while removing Docker containerization. The comprehensive plan covers all aspects of the project specification with a logical step-by-step approach.

---

_**User**_

is it better to add the new cursorrules at the beginning or end of the implementation steps?

---

_**Assistant**_

<think>Let me consider the best placement for the CursorRules improvements in the implementation plan.

Arguments for adding CursorRules at the beginning:
1. Sets clear coding standards and documentation guidelines before any implementation begins
2. Ensures all subsequent code follows the established patterns and rules
3. Prevents having to refactor code later to conform to rules established after the fact
4. Provides a reference for decision-making throughout the implementation
5. Establishes consistency from the start

Arguments for adding CursorRules at the end:
1. The implementation experience might inform better rules
2. Rules can be derived from practical examples in the codebase
3. Avoids delaying the start of actual implementation
4. Can consolidate learnings from the entire project

For this specific project, since it's a complex system with many interconnected parts, having clear guidance upfront would be valuable. The CursorRules would establish patterns for code organization, documentation standards, and technical approaches before any implementation begins.</think>You raise an excellent point about the timing of CursorRules improvements. 

It would be significantly better to add the CursorRules improvements at the beginning of the implementation process rather than at the end, for several important reasons:

1. **Establishes Standards Early**: Creating or updating CursorRules at the beginning sets clear coding standards, architecture patterns, and documentation guidelines before any implementation begins.

2. **Ensures Consistency**: When rules are established upfront, all code written will follow the same patterns and standards from the start, ensuring a more consistent codebase.

3. **Prevents Refactoring**: Adding rules after implementation often requires going back and refactoring existing code to conform to newly established standards, which is inefficient.

4. **Guides Decision-Making**: Having clear guidelines from the beginning helps inform architectural and implementation decisions throughout the project.

5. **Onboarding Value**: Clear rules help new developers understand the project's standards quickly, which is valuable even at the beginning of implementation.

Let me revise the implementation plan to move the CursorRules improvement step to the beginning:

```md
# Implementation Plan

## Project Setup and Infrastructure

- [ ] Step 1: Enhance CursorRules Documentation
  - **Task**: Update and enhance CursorRules documentation
  - **Files**:
    - `.cursorrules/index.md`: Update with latest tech stack information
    - `.cursorrules/memory-systems.md`: Create new file with memory system guidelines
    - `.cursorrules/testing.md`: Create new file with testing guidelines
    - `.cursorrules/typescript.md`: Enhance TypeScript typing guidelines
  - **Step Dependencies**: None
  - **User Instructions**: None

- [ ] Step 2: Create Schema Directory Structure
  - **Task**: Set up the database schema directory structure and create the base schema index file
  - **Files**:
    - `db/schema/index.ts`: Create the main schema export file
  - **Step Dependencies**: Step 1
  - **User Instructions**: None

[... remaining steps continue with numbering adjusted ...]
```

By moving the CursorRules enhancement to the beginning as Step 1, you ensure that all subsequent development will follow the established guidelines, leading to a more consistent and maintainable codebase from the start. This approach sets clear expectations and standards for the entire development process.

---



---

