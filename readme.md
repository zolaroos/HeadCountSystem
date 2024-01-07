# Crowdy Head Count System

## Overview

The Crowdy application employs a microservices architecture within a Kubernetes pod, featuring two nodes encapsulated in containers. The first node serves as an Image Upload Service, handling uploads from city cameras and monitoring the `uploads` folder for new images. The second node, functioning as an Image Processing Service for head counting. Both nodes run within the same pod, facilitating seamless communication. 

Note: Node 2 is currently a random generator but will be replaced with the actual AI code in the future.

## Technologies Used

- JavaScript
- Kubernetes
- Docker

## How to Run

### Build Docker Images

Before running the application, you need to build the Docker images for the `app.js` and `headcount.js` services. Execute the following commands in the project root directory:

```bash
docker build -t app:v1 .
docker build -t headcount:v1 .
```

### Deploy with Kubernetes

The application is deployed using Kubernetes. Apply the configuration from the `deployment.yaml` file:

```bash
kubectl apply -f deployment.yaml
```

### Port Forwarding

To access the services, use port forwarding with Kubernetes:

```bash
# Get Pods
kubectl get pods

# Port forward
kubectl port-forward pod/<app-pod-name> 8090:3333
```
Replace `<app-pod-name>` with the actual name of the pod running the service (it should be assignment-deployment-something).

Now, you can access the application locally at `http://localhost:8090`.



