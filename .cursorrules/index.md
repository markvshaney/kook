# Project Rules

This document serves as an index to all project rules. For specific guidelines, please refer to the individual rule files.

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind, Shadcn
- Backend: Postgres, Supabase, Drizzle ORM, Server Actions
- ML: PyTorch, NumPy, Pandas

## Rule Categories

- [General Rules](./general.md)
- [Frontend Rules](./frontend.md)
- [Backend Rules](./backend.md)
- [Database Rules](./database.md)
- [TypeScript Conventions](./typescript.md)
- [Storage Rules](./storage.md)
- [PyTorch Guidelines](./pytorch.md)
- [Documentation](./documentation.md)

## Project Structure

- `actions` - Server actions
  - `db` - Database related actions
  - Other actions
- `app` - Next.js app router
  - `api` - API routes
  - `route` - An example route
    - `_components` - One-off components for the route
    - `layout.tsx` - Layout for the route
    - `page.tsx` - Page for the route
- `components` - Shared components
  - `ui` - UI components
  - `utilities` - Utility components
- `db` - Database
  - `schema` - Database schemas
- `lib` - Library code
  - `hooks` - Custom hooks
- `public` - Static assets
- `types` - Type definitions