# Jenkins Pipeline Configuration

## Prerequisites

Before running the pipeline, configure these Jenkins credentials:

### 1. Docker Registry Credentials
- **Credential Type**: Username with password
- **Credential ID**: `docker-registry-credentials`
- **Username**: Your Docker registry username
- **Password**: Your Docker registry password/token

### 2. Docker Registry URL
- **Credential Type**: Secret text
- **Credential ID**: `docker-registry-url`
- **Secret**: Your Docker registry URL (e.g., `docker.io` or `myregistry.azurecr.io`)

## Pipeline Stages

1. **Checkout** - Clones the repository
2. **Build Backend** - Builds the Node.js/Express Docker image
3. **Build Frontend** - Builds the React Docker image
4. **Test** - Runs tests inside Docker containers
5. **Push to Registry** - Pushes images to Docker registry (main branch only)
6. **Deploy** - Deploys using docker-compose (main branch only)
7. **Health Check** - Verifies deployment health (main branch only)

## Configuration

### Update for Your Environment

Replace these values in the Jenkinsfile:

```groovy
REGISTRY = credentials('docker-registry-url')              // Your registry URL
IMAGE_NAME_BACKEND = 'task-manager-backend'               // Your backend image name
IMAGE_NAME_FRONTEND = 'task-manager-frontend'             // Your frontend image name
```

### Environment Variables

Add to Jenkins:
- `DOCKER_HOST`: Docker daemon URL (optional)
- `NODE_ENV`: Set to `production` for deployments

## Usage

### Option 1: Create Pipeline Job in Jenkins UI

1. New Item → Pipeline
2. Name: `Task-Manager-Pipeline`
3. Pipeline section → Definition: `Pipeline script from SCM`
4. SCM: Git
5. Repository URL: Your repo
6. Branch: `*/main`
7. Script Path: `Jenkinsfile`

### Option 2: Declarative Pipeline from Repository

If Jenkinsfile is in root of repo, Jenkins will auto-detect it.

## Triggering the Pipeline

### Webhook (Recommended)
```
GitHub/GitLab webhook → Jenkins URL/github-webhook/
```

### Poll SCM
Schedule: `H/15 * * * *` (every 15 minutes)

### Manual
Click "Build Now" button in Jenkins UI

## Customization

### Add Slack Notifications

```groovy
post {
    failure {
        slackSend(color: 'danger', message: "Build failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
    }
}
```

### Add Email Notifications

```groovy
post {
    failure {
        emailext(
            subject: "Build Failed: ${env.JOB_NAME}",
            body: "Build #${env.BUILD_NUMBER} failed",
            to: 'team@example.com'
        )
    }
}
```

### Add SonarQube Analysis

```groovy
stage('Code Quality') {
    steps {
        sh 'sonar-scanner'
    }
}
```

## Docker Registry Options

### Docker Hub
```groovy
REGISTRY = 'docker.io'
REGISTRY_CREDENTIALS = credentials('dockerhub-credentials')
```

### Azure Container Registry
```groovy
REGISTRY = 'myregistry.azurecr.io'
REGISTRY_CREDENTIALS = credentials('acr-credentials')
```

### Private Registry
```groovy
REGISTRY = 'registry.example.com:5000'
REGISTRY_CREDENTIALS = credentials('private-registry-credentials')
```

## Troubleshooting

### Docker Permission Issues
```bash
sudo usermod -aG docker jenkins
```

### Cannot Connect to Docker Daemon
- Verify Jenkins user has Docker permissions
- Check Docker socket is accessible: `ls -la /var/run/docker.sock`

### Build Fails at Push Stage
- Verify Docker registry credentials are correct
- Check registry URL is accessible
- Ensure credentials are stored with correct ID in Jenkins

## Security Best Practices

1. Use Jenkins Credentials Store (never hardcode)
2. Rotate Docker registry tokens regularly
3. Use specific image tags instead of `latest`
4. Sign container images
5. Scan images for vulnerabilities: `trivy`
6. Limit pipeline execution to protected branches

## Performance Optimization

- Use Docker layer caching
- Cache Maven/npm dependencies
- Run builds in parallel where possible
- Clean up old images regularly

