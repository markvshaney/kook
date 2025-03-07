# Storage Rules

Follow these rules when working with Supabase Storage for file uploads, downloads, and management.

## ML-Specific Storage

### Model Storage

- Create a dedicated bucket for ML models: `ml_models`
- Use versioned paths for model storage: `ml_models/model_name/version/model.pt`
- Store model metadata alongside model files: `ml_models/model_name/version/metadata.json`
- Include training metrics and parameters in metadata

### Dataset Storage

- Create a dedicated bucket for datasets: `ml_datasets`
- Organize datasets by purpose: `ml_datasets/raw`, `ml_datasets/processed`
- Include data schema and documentation
- Track dataset versions and preprocessing steps

## General Rules

- Use environment variables for bucket names to maintain consistency
- Never hardcode bucket names in the application code
- Handle file size limits and allowed file types at the application level
- Use the `upsert` method instead of `upload` when replacing existing files
- Implement proper error handling for storage operations
- Use content-type headers when uploading files

## Bucket Organization

- Name buckets in underscore_case: `user_uploads`, `profile_images`
- Create separate buckets for different types of files
- Document bucket purposes in a central location
- Set appropriate bucket policies (public/private) based on access requirements

## File Structure

Organize files within buckets using a consistent pattern:

- Structure: `{bucket}/{purpose}/{filename}`
- Example: `profile_images/avatar/profile.jpg`
- Include timestamps in filenames when version history is important
- Example: `documents/contracts/2024-02-13-contract.pdf`

## Storage Actions

- Place storage-related actions in `actions/storage`
- Name files like `example_storage_actions.ts`
- Include "Storage" at the end of function names: `uploadFile` → `uploadFileStorage`
- Follow the same ActionState pattern as DB actions

Example of a storage action:

```typescript
"use server"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ActionState } from "@/types"

export async function uploadFileStorage(
  bucket: string,
  path: string,
  file: File
): Promise<ActionState<{ path: string }>> {
  try {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: false,
        contentType: file.type
      })

    if (error) throw error

    return {
      isSuccess: true,
      message: "File uploaded successfully",
      data: { path: data.path }
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { isSuccess: false, message: "Failed to upload file" }
  }
}
```

## File Validation

Always validate files before upload:

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function validateFile(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds limit")
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("File type not allowed")
  }

  return true
}
```

## File Operations

### Uploading Files

- Generate unique filenames to prevent collisions
- Set appropriate content-type headers
- Handle existing files appropriately (error or upsert)
- Implement progress indicators for large files

### Downloading Files

- Handle missing files gracefully
- Implement proper error handling for failed downloads
- Use signed URLs for private files

### Deleting Files

- Verify ownership before deletion
- Clean up related database records when deleting files
- Handle bulk deletions carefully
- Delete all versions/transforms of a file

## Security

- Make buckets private by default
- Only make buckets public when absolutely necessary
- Generate short-lived signed URLs for private files
- Implement proper CORS policies
- Use separate buckets for public and private files
- Never expose internal file paths
- Validate user permissions before any operation

## Client-Side Integration

- Create custom hooks for file uploads
- Handle file selection and preview
- Implement drag-and-drop functionality
- Show progress indicators for uploads
- Validate files on the client before sending to the server

Example client hook:

```typescript
"use client"

import { useState } from "react"
import { uploadFileStorage } from "@/actions/storage/upload_storage_actions"

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedPath, setUploadedPath] = useState<string | null>(null)

  const uploadFile = async (
    bucket: string, 
    path: string, 
    file: File
  ) => {
    setIsUploading(true)
    setError(null)
    
    try {
      const result = await uploadFileStorage(bucket, path, file)
      
      if (result.isSuccess) {
        setUploadedPath(result.data.path)
        return result.data.path
      } else {
        setError(result.message)
        return null
      }
    } catch (err) {
      setError('Upload failed')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadFile,
    isUploading,
    error,
    uploadedPath
  }
}
```