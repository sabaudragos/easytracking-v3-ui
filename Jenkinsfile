pipeline {
   agent any
   stages {
      stage('Checkout') {
          steps {
            sh '''#!/bin/bash
                echo 'Removing existing project directory'
                rm -rf easytracking-v3-ui
                echo 'Cloning git project'
                git clone 'https://github.com/Callin/easytracking-v3-ui.git'
            '''
          }
      }
      stage('Installing NPM Modules') {
          steps {
            sh '''#!/bin/bash
                echo 'Running npm install'
                cd easytracking-v3-ui
                npm install
            '''
            }
      }
      stage('Build') {
          steps {
            sh '''#!/bin/bash
                echo 'Running ng build'
                cd easytracking-v3-ui
                ng build
            '''
        }
      }

      stage('Deploy') {
          steps {
            sh '''#!/bin/bash
                echo 'Copying new version to temporary directory'
                cp -R easytracking-v3-ui/dist/easytracking-v3-ui /home/dragos/apps/easytracking/frontend-new
                echo "Rename the current version to old"
                cd /home/dragos/apps/easytracking
                mv frontend frontend-old
                echo "Rename the new version to current"
                mv frontend-new frontend
            '''
        }
      }
    }
}
