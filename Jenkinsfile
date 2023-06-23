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

		stage('Run Containers') {
			steps {
				script {
					def clientPort = 3000
					def serverPort = 4000

					stopContainersOnPort(clientPort)
					stopContainersOnPort(serverPort)

					// Placeholder step
					sh 'echo "Running containers..."'
				}
			}
		}
	}
}

def stopContainersOnPort(port) {
    def command = "docker ps -q -f \"publish=0.0.0.0:${port}\""
    def process = command.execute()
    process.waitFor()
    
    if (process.exitValue() == 0) {
        def containerIds = process.text.readLines()
        containerIds.each { containerId ->
            sh "docker stop ${containerId}"
        }
    }
}

