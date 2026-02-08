# Design: Jest & SonarQube Integration

## Architecture

The testing architecture integrates the following components:

1.  **Test Runner (Jest)**: Executes unit tests. It uses `jest-environment-jsdom` to simulate a browser environment for React components.
2.  **Configuration (`next/jest`)**: A Next.js-provided wrapper that automatically configures Jest to work with the Next.js compiler (SWC/Rust), ensuring that `.ts` and `.tsx` files are transformed correctly without manual Babel configuration.
3.  **Assertions (`@testing-library/jest-dom`)**: Extends Jest specifically for DOM node assertions (e.g., `toBeInTheDocument`), making React component tests more readable.
4.  **Coverage Reporting (LCOV)**: Jest is configured to output coverage in LCOV format (`coverage/lcov.info`). This standard format is required by SonarQube/SonarCloud to display coverage within the quality dashboard.

## Implementation Details

### Configuration File (`jest.config.js`)

We opt for a `jest.config.js` file at the project root. Using `config.js` instead of `ts` avoids potential TS-node compilation issues in some CI environments, keeping the tooling chain simple.

The configuration will:

- Use `testEnvironment: 'jsdom'`.
- Define `setupFilesAfterEnv` to include `jest.setup.ts`.
- Exclude `.next/` and `node_modules/` from test discovery.
- Collect coverage from `src/` only.

### CI Integration Strategy

The `test:ci` script is crucial. It invokes `jest --ci --coverage`.

- `--ci` flag informs Jest it's running in a CI environment (modifies behavior like snapshot updates and console output).
- `--coverage` ensures the report is generated every time.

In the CI pipeline (Jenkins), this step must run _before_ the SonarQube analysis step so that the `lcov.info` file is available for ingestion.

### SonarQube Properties

We explicitly set `sonar.javascript.lcov.reportPaths`, ensuring the scanner knows exactly where to find the coverage data, regardless of default search paths.
