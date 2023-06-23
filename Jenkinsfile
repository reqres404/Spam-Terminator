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
				sh 'docker stop adittyapatil1818/spam-terminator-jenkins:client'
				sh 'docker stop adittyapatil1818/spam-terminator-jenkins:client'
				
				sh 'docker run -d -p 3000:3000 adittyapatil1818/spam-terminator-jenkins:client'
				sh 'docker run -d -p 4000:4000 adittyapatil1818/spam-terminator-jenkins:server'
			}
		
		}
	}
}
