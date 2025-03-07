# Backend Rules

Follow these rules when working on the backend.

## PyTorch Integration

- Create dedicated server actions for ML model inference
- Implement proper error handling for ML predictions
- Use the ML service API for model inference
- Cache predictions when appropriate for performance

Example ML integration:

```typescript
"use server"

import { ActionState } from "@/types"
import { z } from "zod"

// Define input schema for validation
const predictionInputSchema = z.object({
  features: z.array(z.number()),
})

type PredictionInput = z.infer<typeof predictionInputSchema>
type PredictionResult = { prediction: number; confidence: number }

export async function getPredictionAction(
  input: PredictionInput
): Promise<ActionState<PredictionResult>> {
  try {
    // Validate input
    const validInput = predictionInputSchema.parse(input)
    
    // Call ML service
    const response = await fetch("http://ml:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validInput),
    })
    
    if (!response.ok) {
      throw new Error(`ML service returned ${response.status}`)
    }
    
    const result = await response.json()
    
    return {
      isSuccess: true,
      message: "Prediction successful",
      data: result,
    }
  } catch (error) {
    console.error("Error getting prediction:", error)
    return { 
      isSuccess: false, 
      message: error instanceof Error ? error.message : "Failed to get prediction" 
    }
  }
}
```

## Server Actions

Server actions are the primary way to perform mutations in the application.

### Organization

- DB related actions should go in the `actions/db` folder
- Other actions should go in the `actions` folder
- Name files using underscore case: `example_actions.ts`
- Include "Action" at the end of function names: `createTodo` → `createTodoAction`

### Implementation

- Always use `"use server"` at the top of the file
- Actions should return a Promise with an `ActionState<T>` type
- Implement proper error handling with try/catch
- Sort actions in CRUD order: Create, Read, Update, Delete
- Return undefined as the data type if the action doesn't return data
- Use consistent logging for errors

Example of a server action:

```typescript
"use server"

import { db } from "@/db/db"
import { InsertTodo, SelectTodo, todosTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createTodoAction(
  todo: InsertTodo
): Promise<ActionState<SelectTodo>> {
  try {
    const [newTodo] = await db.insert(todosTable).values(todo).returning()
    return {
      isSuccess: true,
      message: "Todo created successfully",
      data: newTodo
    }
  } catch (error) {
    console.error("Error creating todo:", error)
    return { isSuccess: false, message: "Failed to create todo" }
  }
}
```

## API Routes

Use Next.js API routes for external integrations or when server actions aren't suitable.

### Organization

- Place API routes in the `app/api` directory
- Structure routes logically by feature
- Use proper HTTP methods (GET, POST, PUT, DELETE)

### Implementation

- Validate input data with Zod or similar
- Return consistent response formats
- Implement proper error handling
- Use appropriate status codes
- Add CORS headers when necessary

Example API route:

```typescript
// app/api/todos/route.ts
import { db } from "@/db/db"
import { todosTable } from "@/db/schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const todos = await db.query.todos.findMany()
    return NextResponse.json({ todos })
  } catch (error) {
    console.error("Error fetching todos:", error)
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }
    
    const [todo] = await db.insert(todosTable)
      .values({
        content: body.content,
        completed: false
      })
      .returning()
      
    return NextResponse.json({ todo }, { status: 201 })
  } catch (error) {
    console.error("Error creating todo:", error)
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    )
  }
}
```

## Middleware

Use Next.js middleware for request processing that should happen before reaching routes.

- Place middleware in the root directory as `middleware.ts`
- Keep middleware lightweight and focused
- Use middleware for tasks like authentication, logging, or redirects
- Test middleware thoroughly