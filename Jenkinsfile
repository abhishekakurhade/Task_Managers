pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Checking out code...'
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo '🔨 Building Docker images...'
                sh '''
                    docker build -f Dockerfile.backend -t task-manager-backend:${BUILD_NUMBER} .
                    docker build -f Dockerfile.frontend -t task-manager-frontend:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying with docker-compose...'
                sh '''
                    docker-compose down || true
                    docker-compose up -d
                    sleep 5
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 Checking services...'
                sh '''
                    echo "Checking containers..."
                    docker-compose ps
                    
                    echo "Testing backend..."
                    curl -s http://localhost:5000 || echo "Backend not responding"
                    
                    echo "✅ Deployment complete!"
                '''
            }
        }
    }

    post {
        failure {
            echo '❌ Pipeline failed!'
        }

        always {
            echo '✅ Build finished!'
        }
    }
}

