# Proposal: Implement Jest Coverage for SonarQube

## Goal

Implement a proper testing infrastructure using Jest and React Testing Library to enable real LCOV code coverage reporting in SonarQube. This addresses the need for accurate quality metrics in the CI pipeline.

## Context

Currently, the project lacks a test runner and coverage generation. SonarQube cannot reflect accurate coverage percentages without a valid LCOV report. We need to introduce a testing setup that integrates seamlessly with Next.js and TypeScript.

## Design

We will use the official `next/jest` configuration to ensure compatibility with the Next.js build process (SWC/Rust compiler).

### Key Components

1.  **Test Runner**: Jest, configured via `next/jest`.
2.  **Testing Utilities**: React Testing Library for component testing.
3.  **Environment**: `jsdom` for browser-like environment in Node.js.
4.  **Coverage**: LCOV reporter configuration in Jest to output `coverage/lcov.info`.
5.  **CI Integration**: npm scripts optimized for CI execution (`test:ci`).

## Constraints

- **Framework**: Must use Jest + React Testing Library + `next/jest`.
- **CI**: Must be compatible with Jenkins (headless, non-interactive).
- **Scope**: Minimal changes to get coverage working; avoid large refactors.
- **Output**: Strict LCOV format for SonarQube ingestion.
- **Coverage Target**: Application code only (`src/**/*.{ts,tsx}`), excluding definitions and generated files.

## Risks

- **Configuration Conflicts**: Potential issues with SWC or existing Babel usage (though `next/jest` handles this well).
- **Performance**: Test execution time in CI may increase slightly.
