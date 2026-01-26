# Portfolio Project: Interview Preparation Guide

This document summarizes your project and provides detailed answers to potential interview questions based on your specific implementation.

## 1. Project Overview & Achievements
**"Tell me about this project."**

**Summary:**
"I built a comprehensive **End-to-End DevSecOps Portfolio** project. It is a React-based frontend application containerized using Docker and orchestrated with Kubernetes. I implemented a CI/CD pipeline using Jenkins that automates code quality checks (SonarQube), security scanning (Trivy), image building, and deployment. The infrastructure is managed via GitOps principles."

**Key Tech Stack:**
*   **Frontend:** React, Vite, TSX, Tailwind CSS.
*   **Containerization:** Docker (Multi-stage builds).
*   **CI/CD:** Jenkins (Pipeline as Code).
*   **Security & Quality:** SonarQube (Static Analysis), Trivy (Vulnerability Scanning).
*   **Orchestration:** Kubernetes (Deployments, Services, Ingress).

---

## 2. Docker
**Question:** *"What does your Dockerfile contain? Can you explain how it works line-by-line?"*

**Your Dockerfile Strategy:**
You used a **Multi-Stage Build**. This is a best practice because it separates the *build environment* (which needs heavy tools like Node.js and npm) from the *runtime environment* (which only needs a light web server). This results in a much smaller, more secure final image.

**Detailed Explanation:**

**Stage 1: The Build Stage**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
```
*   `FROM node:20-alpine AS builder`: This pulls a lightweight Node.js image (Alpine Linux version) and names this stage "builder". We use this temporary stage to compile the React code.
*   `WORKDIR /app`: Sets the working directory inside the container to `/app`.
*   `COPY package.json ...`: We copy *only* the dependency definitions first.
*   `RUN npm ci`: We install dependencies. **Why do we copy package.json separate from the rest of the code?** This uses Docker's **Layer Caching**. If you change your source code but not your dependencies, Docker skips this step and reuses the cached node_modules, making builds much faster.
*   `COPY . .`: Now we copy the actual source code.
*   `RUN npm run build`: This command runs the Vite build script, creating the optimized static HTML/CSS/JS files in the `dist` folder.

**Stage 2: The Runtime Stage**
```dockerfile
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
*   `FROM nginx:alpine`: We start a fresh, new image using Nginx (a high-performance web server). This discards all the heavy Node.js tools from the previous stage.
*   `COPY --from=builder ...`: **Crucial Step.** We copy *only* the `dist` folder (the built website) from the `builder` stage into Nginx's hosting directory (`/usr/share/nginx/html`).
*   `EXPOSE 80`: Documents that this container listens on port 80.
*   `CMD ...`: Starts the Nginx server in the foreground so the container keeps running.

---

## 3. Jenkins
**Question:** *"How is this Jenkinsfile made? What does it contain?"*

**Answer:**
"I created a **Declarative Pipeline** using a `Jenkinsfile`. This follows the 'Pipeline as Code' philosophy, meaning my build process is version-controlled alongside my application code."

**Pipeline Walkthrough:**

1.  **Environment Variables:**
    *   `environment { IMAGE_NAME = "amansain01/portfolio-ui" }`: Defines the Docker image name globally.

2.  **The Stages:**

    *   **Stage 1: Checkout**
        *   `checkout scm`: Pulls the latest code from GitHub (Source Control Management).

    *   **Stage 2: SonarQube Scan (Code Quality)**
        *   Uses `sonar-scanner` to analyze the code for bugs, code smells, and duplication.
        *   It authenticates using the `sonar-token2` credentials.
        *   Result: Ensures no bad code gets merged.

    *   **Stage 3: Trivy FS Scan (Filesystem Security)**
        *   Runs `trivy fs .` to scan the source code/dependencies for known vulnerabilities *before* building.

    *   **Stage 4: Build Docker Image**
        *   Runs `docker build` to create the container image based on the Dockerfile.

    *   **Stage 5: Trivy Image Scan (Container Security)**
        *   Runs `trivy image ...` on the *built* image.
        *   The flag `--exit-code 1` specifically for `HIGH,CRITICAL` severities means the pipeline will **FAIL** and stop if dangerous vulnerabilities are found. This is "DevSecOps" in action—blocking insecure builds.

    *   **Stage 6: Push Image**
        *   Logs into Docker Hub using secure credentials (`docker-creds`).
        *   Pushes the image to the registry so it can be pulled by Kubernetes.

---

## 4. Kubernetes (k8s)
**Question:** *"How do these k8s working parts fit together? Explain deployment.yaml, service.yaml, and ingress.yaml."*

**The Big Picture:**
"Kubernetes orchestrates the containers. I use a **Deployment** to manage the pods (replicas), a **Service** to network them internally, and an **Ingress** to expose them to the outside world."

### A. deployment.yaml
**What it does:** Ensures your app is running and self-healing.

*   `kind: Deployment`: Tells k8s "I want you to manage a set of identical pods."
*   `replicas: 2`: "Run exactly 2 copies of my app at all times." If one crashes, k8s immediately starts a new one to replace it. This provides **High Availability**.
*   `selector: matchLabels: app: portfolio-ui`: This is how the Deployment finds which Pods belong to it.
*   `strategy: RollingUpdate`: When I deploy a new version (`v2`), k8s won't kill all `v1` pods at once. It gradually replaces them (maxSurge/maxUnavailable 25%) so users experience **Zero Downtime**.
*   `image: portfolio_frontend:latest`: The specific container image to run.

### B. service.yaml
**What it does:** Provides a stable internal IP address for your pods.

*   `kind: Service`: Pods have dynamic IPs that change if they die/restart. The Service gives a single, constant entry point to reach them.
*   `type: NodePort`: Exposes the service on a specific port on every Node in the cluster. This allows external traffic to reach the pods (though usually, we put an Ingress in front of this).
*   `selector: app: portfolio-ui`: Connects this Service to the pods managed by the Deployment above.

### C. ingress.yaml
**What it does:** Acts as the "Smart Router" or HTTP Load Balancer.

*   `kind: Ingress`: Manages external access to the services in the cluster (HTTP/HTTPS).
*   `host: portfolio.local`: This is the rule. It says "If a request comes in looking for the domain `portfolio.local`, send it to this app."
*   `backend: service: name: portfolio-ui`: Maps that domain request to your internal Service on port 80.
*   **Why use this?** It allows you to host many different apps (e.g., `api.local`, `portfolio.local`) on the same cluster/IP address, routing traffic based on the domain name.

---

## 5. Personal Question: Mapping the Domain
**Question:** *"How did you map the specific IP address to `portfolio.ui` (or `portfolio.local`) on the browser?"*

**The Magic Trick: `/etc/hosts` (Local DNS)**

Since you don't own the actual domain `portfolio.ui` on the public internet (like a `.com`), you "tricked" your computer into thinking it exists.

1.  **The Ingress Controller:** Your Kubernetes cluster has an Entry Point (usually the Nginx Ingress Controller or Minikube IP). Let's say that IP is `192.168.49.2`.
2.  **The Browser's Lookup:** When you type `portfolio.local` in Chrome, Chrome asks the OS: "What is the IP for this?"
3.  **The Override:** Your OS checks the `/etc/hosts` file *before* asking a public DNS server (like Google's 8.8.8.8).
4.  **The Mapping:** You (or a script) added a line like this to your hosts file:
    ```text
    192.168.49.2  portfolio.local
    ```
5.  **The Flow:**
    *   Browser sees `portfolio.local` -> OS checks hosts file -> Returns `192.168.49.2`.
    *   Browser sends request to `192.168.49.2` with header `Host: portfolio.local`.
    *   Kubernetes Ingress sees the `Host` header, matches it to your `ingress.yaml` rule, and routes traffic to your Portfolio App.
