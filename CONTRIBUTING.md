# Contributing to KooK

Thank you for considering contributing to KooK! This document outlines the process for contributing to the project.

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/yourusername/KooK.git
cd KooK
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Development Workflow

1. **Create a branch for your changes**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**

3. **Test your changes**

```bash
# Run TypeScript type checking
npm run type-check

# Run linting
npm run lint

# Run unit tests
npm run test
```

4. **Commit your changes**

We use conventional commit messages. Please format your commit messages as follows:

```
type(scope): description

[optional body]

[optional footer]
```

Where `type` is one of:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect the code's meaning (formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

5. **Push your changes**

```bash
git push origin feature/your-feature-name
```

6. **Create a pull request**

Create a pull request against the `main` branch of the original repository.

## Code Style and Guidelines

- Follow the existing code style
- Write tests for your code
- Update documentation as necessary
- Ensure TypeScript types are correct
- Use accessibility best practices

## Working with the Design System

KooK uses shadcn/ui for UI components and Lucide React for icons.

### Adding a new shadcn component

```bash
npx shadcn@latest add component-name
```

### Using Lucide icons

Import icons directly from the lucide-react package:

```tsx
import { Brain, Cpu, Database } from "lucide-react";
```

## Pull Request Process

1. Ensure your PR includes a clear description of the changes
2. Make sure all tests pass
3. Update documentation as necessary
4. Request a review from at least one maintainer
5. Address any feedback from reviews

## Release Process

The release process is managed by the core team. After your PR is merged, it will be included in the next release.

## Questions?

If you have any questions about contributing, please open an issue or contact the maintainers directly.

Thank you for contributing to KooK!
