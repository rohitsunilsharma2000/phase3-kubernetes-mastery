
---

### 🛠️ Hands-On Task Title:

> **"Deploy a Frontend and Backend App with Persistent Volume Claims in Kubernetes"**

---

### 🎯 **Objective**:
Set up a full-stack app where:
- The **backend** writes logs or uploaded files to a mounted PVC.
- The **frontend** serves static files (React/Angular) from a volume populated via `initContainer` or shared PVC (advanced option).

---

### 📦 **Directory Structure**:
```
fullstack-pvc-demo/
├── backend/
│   ├── app.js
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   └── Dockerfile
└── k8s/
    ├── pvc-backend.yaml
    ├── pvc-frontend.yaml
    ├── backend-deployment.yaml
    ├── frontend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-service.yaml
```

---

### 🔑 Key Features in the YAML Files:
- PVC for backend logs (`/usr/src/app/logs`)
- PVC for frontend static content (optional: mount from shared volume or initContainer)
- Deployments mounting the PVCs as volumes

---

### ✅ Steps:
1. Create PVCs
2. Build Docker images and push to registry
3. Apply Kubernetes YAMLs
4. Access the frontend via NodePort or Ingress
5. Upload a file or trigger logging in backend
6. Verify PVC-mounted directories inside pods

---

