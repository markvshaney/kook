# Documentation Guidelines

Follow these guidelines when writing and organizing documentation for the project.

## File Formats

- Use `.md` (Markdown) files for standard documentation
- Use `.mdx` (Markdown + JSX) files for documentation that requires interactive components
- Do not use `.mdc` files as they are not a standard format

## Documentation Structure

### Project-Level Documentation

- `README.md`: Project overview, setup instructions, and quick start guide
- `CONTRIBUTING.md`: Guidelines for contributing to the project
- `CHANGELOG.md`: Record of all notable changes

### Code Documentation

- Document code with appropriate comments and TypeScript type definitions
- Add JSDoc comments for functions and classes
- Document APIs with clear input/output specifications
- Add README files in key directories explaining their purpose

### User Documentation

- Place user documentation in a dedicated `docs` folder
- Organize by feature or user journey
- Include screenshots and examples where helpful

## Writing Style

- Use clear, concise language
- Target the appropriate audience (developers, end-users, etc.)
- Format code examples with proper syntax highlighting
- Use lists and tables to organize information
- Keep paragraphs short and focused

## Markdown Usage

- Use proper heading hierarchy (H1 for title, H2 for sections, etc.)
- Use code blocks with language specification for syntax highlighting
- Include links to related documentation or external resources
- Use emphasis (bold/italic) sparingly and consistently

Example of well-formatted markdown:

```markdown
# Feature Name

A brief description of the feature and its purpose.

## Getting Started

Instructions for getting started with this feature.

### Prerequisites

- Requirement 1
- Requirement 2

### Installation

```bash
npm install feature-package
```

## Usage

```typescript
import { Feature } from 'feature-package';

const feature = new Feature();
feature.doSomething();
```

## API Reference

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|--------------|
| `doSomething()` | Performs an action | None | `void` |
```

## MDX Usage

Use `.mdx` files when you need to include React components in your documentation:

```mdx
# Interactive Documentation

This is standard markdown text.

<Tabs>
  <TabItem value="js" label="JavaScript">
    ```js
    function hello() {
      console.log('Hello, world!');
    }
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```python
    def hello():
      print("Hello, world!")
    ```
  </TabItem>
</Tabs>

The component above renders a tabbed interface.
```

## Documentation for ML Components

- Document model architecture and design decisions
- Include training procedures and hyperparameters
- Explain input/output formats and preprocessing steps
- Document performance metrics and evaluation methodology
- Add diagrams to illustrate complex concepts

## Keeping Documentation Updated

- Update documentation when code changes
- Review documentation regularly for accuracy
- Automate documentation generation where possible
- Follow the "Documentation as Code" principle