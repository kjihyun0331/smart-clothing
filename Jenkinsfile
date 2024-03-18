pipeline {
    agent any

    stages {
        stage('Shutdown Docker Compose') {
            steps {
                script {
                    // Docker Compose를 내리는 단계
                    sh 'sudo docker-compose down'
                }
            }
        }
        stage('Start Docker Compose') {
            steps {
                script {
                    // Docker Compose를 시작하는 단계
                    sh 'sudo docker-compose up -d'
                }
            }
        }
    }
}
