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
		sh 'docker build -t adittyapatil1818/spam-terminator-image:client client'
		sh 'docker build -t adittyapatil1818/spam-terminator-jenkins:server server'
	}
}

	}
}
