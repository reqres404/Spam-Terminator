pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Client Tests') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Server Tests') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Images') {
            steps {
                dir('client') {
                    sh 'docker build -t adittyapatil1818/spam-terminator-jenkins:client .'
                }
                dir('server') {
                    sh 'docker build -t adittyapatil1818/spam-terminator-jenkins:server .'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push adittyapatil1818/spam-terminator-jenkins:client'
                    sh 'docker push adittyapatil1818/spam-terminator-jenkins:server'
                }
            }
        }

        stage('Free Ports') {
            steps {
                sh '''
                    # Find and terminate processes using ports
                    PORT1=3000  # Specify the first port you want to free
                    PORT2=4000  # Specify the second port you want to free
                    
                    PROCESS_ID1=$(lsof -t -i:$PORT1)
                    PROCESS_ID2=$(lsof -t -i:$PORT2)
                    
                    if [ -n "$PROCESS_ID1" ]; then
                        echo "Terminating process with ID: $PROCESS_ID1 using port $PORT1"
                        kill -9 $PROCESS_ID1
                    else
                        echo "No process found using port $PORT1"
                    fi
                    
                    if [ -n "$PROCESS_ID2" ]; then
                        echo "Terminating process with ID: $PROCESS_ID2 using port $PORT2"
                        kill -9 $PROCESS_ID2
                    else
                        echo "No process found using port $PORT2"
                    fi
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker run -d -p 3000:3000 adittyapatil1818/spam-terminator-jenkins:client'
                sh 'docker run -d -p 4000:4000 adittyapatil1818/spam-terminator-jenkins:server'
            }
        }
    }
}
