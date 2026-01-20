# Project Context

## Purpose
The "XI-asp" project is a Campaign Poster Generator designed for the "Xavier 2026" political campaign. It allows users to create and customize campaign posters.

## Tech Stack
- Angular ^21.1.0
- TypeScript ~5.9.2
- TailwindCSS ^4.1.12
- Angular Material
- Vitest ^4.0.8 (Unit Testing)

## Project Conventions

### Code Style
- **Formatter:** Prettier is used for code formatting.
- **Rules:**
  - Print Width: 100
  - Single Quotes: true
- **Naming:** Follow standard Angular and TypeScript naming conventions (camelCase for properties/methods, PascalCase for classes/interfaces).

### Architecture Patterns
- **Standalone Components:** The application uses Angular Standalone Components (bootstrapped via `bootstrapApplication` in `main.ts`).
- **State Management:** Angular Signals are used for local state management (e.g., `protected readonly title = signal(...)`).
- **Styling:** TailwindCSS is used for utility-first styling, complemented by Angular Material components.

### Testing Strategy
- **Unit Tests:** Run with Vitest using `ng test`.
- **E2E Tests:** Configurable (Angular CLI default, currently not explicitly set up with a specific framework in the explored files, but `ng e2e` is available).

### Git Workflow
- Standard feature branching workflow.
- Commits should be descriptive.

## Domain Context
- The domain revolves around political campaign materials, specifically posters.
- Key concepts likely include: Candidates, Slogans, Themes, Images, Templates.

## Important Constraints
- Ensure responsiveness and accessibility (standard web best practices).
- Performance budgets are configured in `angular.json` (Production: max warning 500kB, max error 1MB for initial bundle).

## External Dependencies
- **Angular Material:** UI Component library.
- **TailwindCSS:** CSS framework.
