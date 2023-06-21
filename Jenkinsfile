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
			sh 'npm test'
		}
	}
}


	}
}
