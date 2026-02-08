pipeline {
  agent any

  tools {
    nodejs 'node-20'
  }

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
          node -v
          npm -v

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
          git branch --show-current || true
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          set -e
          npm ci
          npm run build
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          set -e
          npm run test:ci
        '''
      }
    }

    stage('Coverage Verification') {
      steps {
        sh '''
          set -e
          echo "===== VERIFY COVERAGE FILE ====="
          ls -la coverage || true
          test -f coverage/lcov.info
          echo "✅ coverage/lcov.info found"
          head -n 20 coverage/lcov.info
        '''
      }
    }

    stage('Sonar Analysis') {
      steps {
        withSonarQubeEnv('sonarqube') {
          sh """
            set -e
            ${tool 'sonarqube'}/bin/sonar-scanner
          """
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
    }
  }
}
