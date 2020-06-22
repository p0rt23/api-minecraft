def image_name = 'api-minecraft'
def container_name, version, image_tag, node_env, restart, traefik_rule, domain

if (env.BRANCH_NAME == 'master') {
    container_name = image_name 
    node_env       = 'production'
    restart        = 'always'
    domain         = 'api.nearzero.io'
}
else {
    container_name = "${image_name}-develop" 
    node_env       = 'test'
    restart        = 'no'
    domain         = 'api-develop.nearzero.io'
}
traefik_rule = domain.replace('.', '-')

pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'apk add build-base'
                sh 'apk add nodejs'
                sh 'apk add npm'
                sh 'apk add python3'
                script {
                    version = sh(
                        returnStdout: true, 
                        label: 'Getting version from package.json',
                        script: 'node -e "const { version } = require(\'./api/package.json\'); process.stdout.write(version)"'
                    ).trim()
                    println "Version: ${version}"
                    image_tag = version
                }
            }
        }
        stage('Run Tests') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('Docker Build and Run') {
            steps {      
                sh "docker build -t p0rt23/${image_name}:${image_tag} ."
                script {
                    try {
                        sh "docker stop ${container_name}"
                        sh "docker rm ${container_name}"
                    }
                    catch (Exception e) { 
                        
                    }
                }
                sh """
                    docker run -d \
                        --restart=${restart} \
                        --name=${container_name} \
                        --network=traefik \
                        --label="traefik.enable=true" \
                        --label='traefik.http.routers.${traefik_rule}.rule=Host(`${domain}`) && PathPrefix(`/${image_name}/`)' \
                        --env="NODE_ENV=${node_env}" \
                        p0rt23/${image_name}:${image_tag}
                """
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    } 
}
