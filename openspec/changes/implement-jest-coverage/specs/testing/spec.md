# Capabilities: Testing

## ADDED Requirements

#### Requirement: Unit Testing Infrastructure

The system must support running unit tests for React components and TypeScript logic using a standard test runner.

#### Scenario: Developer runs tests locally

Given the developer has installed dependencies
When they run `npm run test`
Then the test runner executes all test files matching the pattern `src/**/*.{test,spec}.{ts,tsx}`
And reports pass/fail status in the console.

#### Scenario: Continuous Integration Execution

Given the code is pushed to the repository
When the CI pipeline executes `npm run test:ci`
Then the tests run in a headless environment
And the process exits with a non-zero code if any test fails.

#### Requirement: Code Coverage Reporting

The system must generate code coverage reports in LCOV format to be consumed by external quality tools.

#### Scenario: Generate LCOV report

Given the test suite is configured for coverage
When `npm run test:ci` is executed
Then a `coverage/lcov.info` file is generated
And the file contains coverage data for `src/**/*.{ts,tsx}` files
And definitions (`.d.ts`) and test files are excluded from coverage.

#### Requirement: SonarQube Integration

The project configuration must enable SonarQube to ingest the generated LCOV report.

#### Scenario: SonarQube analysis

Given a `coverage/lcov.info` file exists
And `sonar-project.properties` is configured with `sonar.javascript.lcov.reportPaths`
When the SonarQube scanner runs
Then it successfully imports the coverage data
And reflects the correct coverage percentage in the dashboard.
