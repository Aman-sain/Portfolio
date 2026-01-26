# End-to-End DevSecOps Portfolio Deployment using Jenkins, Kubernetes & ArgoCD

## 🎯 Project Objective
To design and implement a production-style DevSecOps pipeline for a portfolio web application that ensures:
- Automated builds
- Code quality enforcement
- Security scanning
- Containerization
- Kubernetes deployment
- GitOps-based continuous delivery

## 🧱 Tech Stack Used
- **Frontend**: Vite + Tailwind CSS (Node.js)
- **Containerization**: Docker, Docker Compose
- **Code Quality**: SonarQube
- **Security Scanning**: Trivy
- **CI**: Jenkins
- **Orchestration**: Kubernetes (Minikube)
- **Traffic Management**: NGINX Ingress Controller
- **CD / GitOps**: ArgoCD
- **Version Control**: Git & GitHub
- **OS**: Ubuntu Linux

## 🏗️ Project Architecture (High Level)
```mermaid
graph TD
    Dev[Developer] -->|Push Code| Github[GitHub (App Repo)]
    Github -->|Webhook| Jenkins[Jenkins CI]
    
    subgraph CI_Pipeline [CI Pipeline]
        Jenkins --> Sonar[SonarQube Scan]
        Jenkins --> Trivy[Trivy Scan]
        Jenkins --> DockerBuild[Docker Build]
        Jenkins --> DockerPush[Docker Push]
    end
    
    DockerPush --> Registry[Container Registry]
    
    subgraph CD_System [CD System]
        GitOpsRepo[GitOps Repository] -->|Sync| ArgoCD[ArgoCD]
        ArgoCD -->|Deploy| K8s[Kubernetes Cluster]
    end
    
    K8s --> Ingress[Ingress]
    Ingress --> Browser[Browser]
```

```text
Developer → GitHub (App Repo)
             |
             v
         Jenkins CI
   ┌─────────────────┐
   │ SonarQube Scan  │
   │ Trivy Scan      │
   │ Docker Build    │
   │ Docker Push     │
   └─────────────────┘
             |
             v
     GitOps Repository
             |
             v
         ArgoCD (CD)
             |
             v
     Kubernetes Cluster
             |
             v
         Ingress → Browser
```

## 📂 Repository Structure

### 1️⃣ Application Repository (CI)
`portfolio-frontend/`
```tree
frontend/
├── src/
├── public/
├── Dockerfile
├── Jenkinsfile
├── sonar-project.properties
└── package.json
```
👉 Used by Jenkins for CI.

### 2️⃣ GitOps Repository (CD)
`portfolio-gitops/`
```tree
portfolio/
├── deployment.yaml
├── service.yaml
└── ingress.yaml
```
👉 Used by ArgoCD for deployment.

## 🔄 Implementation Steps
### 🔹 Step 1: Frontend Development
- Developed a portfolio UI using Vite + Tailwind CSS
- Verified local build and production output
- Prepared application for containerization

### 🔹 Step 2: Dockerization
- Created a multi-stage Dockerfile
- Built optimized NGINX-based image
- Verified container locally using Docker

### 🔹 Step 3: Code Quality with SonarQube
- Deployed SonarQube using Docker
- Configured `sonar-project.properties`
- Integrated SonarScanner
- Analyzed frontend code for:
  - Bugs
  - Code smells
  - Security hotspots

### 🔹 Step 4: Security Scanning with Trivy
- Performed filesystem scans for vulnerable dependencies
- Scanned Docker images for OS & runtime vulnerabilities
- Prepared Trivy checks to block insecure builds in CI

### 🔹 Step 5: Kubernetes Deployment
- Deployed application to Minikube
- Created:
  - Deployment (replicas, containers)
  - Service (NodePort)
- Verified pod and service health

### 🔹 Step 6: Ingress Configuration
- Enabled NGINX Ingress Controller
- Created Ingress resource for host-based routing
- Mapped domain using `/etc/hosts`
- Accessed application via `portfolio.local`

### 🔹 Step 7: Jenkins CI Pipeline
- Installed and configured Jenkins
- Created a declarative Jenkins pipeline:
  - Git checkout
  - SonarQube scan
  - Trivy scan
  - Docker build
  - Docker push to registry
- Secured secrets using Jenkins Credentials

### 🔹 Step 8: GitOps with ArgoCD
- Installed ArgoCD in Kubernetes
- Understood and fixed GitOps path issues
- Separated CI and CD repositories
- Created ArgoCD Application
- Enabled auto-sync to Kubernetes
- Achieved declarative, Git-driven deployments


## 📸 Project Screenshots

### ArgoCD Dashboard
<img src="./screenshots/argocd_dashboard.png" alt="ArgoCD Dashboard" width="800"/>

### File Structure
<img src="./screenshots/file_structure.png" alt="File Structure" width="400"/>

### Log Details
<div style="display: flex; gap: 10px;">
  <img src="./screenshots/jenkins_logs_1.png" alt="Jenkins Logs 1" width="45%"/>
  <img src="./screenshots/jenkins_logs_2.png" alt="Jenkins Logs 2" width="45%"/>
</div>
<br/>
<img src="./screenshots/argocd_details.png" alt="ArgoCD Details" width="800"/>


## 🧠 Key Learnings & Troubleshooting
- Importance of separating app repo and GitOps repo
- Debugging ArgoCD `InvalidSpecError`
- Handling Kubernetes resource constraints locally
- Using Git as the single source of truth
- Understanding CI vs CD responsibilities clearly

## 🏁 Final Outcome
- [x] Fully automated CI pipeline
- [x] Secure and quality-gated builds
- [x] Kubernetes-based deployment
- [x] Ingress-based routing
- [x] GitOps-driven continuous delivery

> This project simulates real-world DevSecOps workflows used in modern cloud-native environments.
