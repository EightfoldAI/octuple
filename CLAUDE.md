# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About Octuple

Octuple is Eightfold's React Design System Component Library. It's a comprehensive collection of reusable React components, utilities, and hooks built with TypeScript and SCSS modules.

## Development Commands

### Primary Development Commands
- `yarn storybook` - Run Storybook development server on port 2022
- `yarn build` - Build the library for production (runs lint + rollup build)
- `yarn test` - Run Jest unit tests with coverage
- `yarn lint` - Run ESLint on all JS/JSX/TS/TSX files
- `yarn typecheck` - Run TypeScript type checking without emitting files

### Testing Commands
- `yarn test:update` - Update Jest snapshots
- Run single test: `jest path/to/test.test.tsx`

### Build Commands
- `yarn build-storybook` - Build Storybook for deployment
- `yarn build:webpack` - Alternative webpack-based build (runs lint + webpack)

### Release Commands
- `yarn release` - Standard version release (skips tests)
- `yarn release:minor` - Minor version release
- `yarn release:patch` - Patch version release
- `yarn release:major` - Major version release

## Code Architecture

### Component Structure
Components follow a strict modular structure in `src/components/`:
- Each component has its own directory with TypeScript files, SCSS modules, Storybook stories, and Jest tests
- Main export file: `src/octuple.ts` - exports all public components and utilities
- Locale exports: `src/locale.ts` - internationalization utilities

### Key Directories
- `src/components/` - All React components organized by component name
- `src/hooks/` - Custom React hooks (useBoolean, useGestures, useMatchMedia, etc.)
- `src/shared/` - Shared utilities and common components (FocusTrap, ResizeObserver, utilities)
- `src/styles/` - Global SCSS styles and variables
- `src/tests/` - Test utilities and setup files

### Component Patterns
Components follow consistent patterns:
- TypeScript interfaces defined in `ComponentName.types.ts`
- SCSS modules using kebab-case class names (referenced as camelCase in JS)
- Exported through barrel exports in `index.ts` files
- Use `mergeClasses` utility for conditional class name handling
- Support for themes via ConfigProvider context

### Build System
- **Rollup** for library bundling (primary build system)
- **Webpack** alternative build available
- **SCSS modules** with camelCase conversion
- **TypeScript** compilation with strict type checking
- **PostCSS** for CSS processing and minification
- Outputs both ESM (.mjs) and CommonJS (.js) formats

### Testing Approach
- **Jest** with React Testing Library
- **Enzyme** with React 17 adapter
- **Snapshot testing** for component rendering
- **MatchMedia mock** for responsive testing
- **ResizeObserver** polyfill for tests
- Coverage collection configured

### Component Guidelines
Follow the established patterns in `src/components/COMPONENTS.md`:
- Use functional components with TypeScript
- Define props interfaces with JSDoc comments
- Use SCSS modules for styling
- Include Storybook stories for documentation
- Write comprehensive Jest tests with snapshots
- Export all public APIs through barrel exports

### Storybook
- Development server runs on port 2022
- Stories follow the pattern `ComponentName.stories.tsx`
- Used for component documentation and visual testing

### Key Dependencies
- React 17+ (peer dependency)
- TypeScript for type safety
- SCSS for styling with CSS modules
- Storybook for component documentation
- Jest + React Testing Library for testing
- Various UI utility libraries (@floating-ui/react, react-spring, etc.)

### Conventional Commits
Commit messages must follow the Conventional Commits specification:
- Format: `<type>[optional scope]: <description>`
- Types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Subject line max 100 characters
- Combined body and footer max 100 characters