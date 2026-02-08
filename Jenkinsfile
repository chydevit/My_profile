pipeline {
  agent any

  environment {
    CI = 'true'
  }

  options {
    timestamps()
  }

  stages {

    stage('Print OS & Runtime Info') {
      steps {
        sh '''
          echo "===== OS INFO ====="
          uname -a || true
          cat /etc/os-release || true

          echo "===== NODE & NPM ====="
          node -v || true
          npm -v || true

          echo "===== JAVA (Required for SonarScanner) ====="
          java -version || true

          echo "===== WORKSPACE ====="
          pwd
          ls -la
        '''
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
        sh '''
          echo "===== GIT INFO ====="
          git rev-parse --short HEAD
          git branch --show-current
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          set -e
          echo "===== INSTALL DEPENDENCIES ====="
          npm ci

          echo "===== BUILD NEXT.JS ====="
          npm run build
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          set -e
          echo "===== RUN TESTS (CI MODE) ====="
          npm run test:ci
        '''
      }
    }

    stage('Coverage Verification') {
      steps {
        sh '''
          echo "===== VERIFY COVERAGE FILE ====="
          ls -la coverage || true

          if [ -f coverage/lcov.info ]; then
            echo "✅ coverage/lcov.info found"
            head -n 20 coverage/lcov.info
          else
            echo "❌ coverage/lcov.info missing"
            exit 1
          fi
        '''
      }
    }

    stage('Sonar Analysis') {
      steps {
        withSonarQubeEnv('sonarqube') {
          sh '''
            set -e
            echo "===== RUN SONAR SCANNER ====="
            sonar-scanner
          '''
        }
      }
    }
  }

  post {
    always {
      echo "===== ARCHIVING COVERAGE ARTIFACTS ====="
      archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
    }

    failure {
      echo "❌ Pipeline failed"
    }

    success {
      echo "✅ Pipeline completed successfully"
    }
  }
}
