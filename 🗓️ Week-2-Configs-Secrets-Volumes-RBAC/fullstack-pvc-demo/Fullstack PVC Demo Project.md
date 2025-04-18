# 📦 Fullstack PVC Demo Project

This hands-on Kubernetes project demonstrates deploying a fullstack application (Node.js backend and HTML frontend) using **Persistent Volume Claims (PVCs)**. You'll build, containerize, deploy, and test both services on a local Kubernetes cluster using Minikube.

---

## 🧾 Project Structure
```
fullstack-pvc-demo/
├── backend/
│   ├── app.js              # Express backend server
│   ├── Dockerfile          # Dockerfile for backend
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── index.html          # Static frontend page
│   ├── Dockerfile          # Dockerfile for frontend (NGINX)
│   └── package.json        # Placeholder (no build tools used)
└── k8s/
    ├── pvc-backend.yaml
    ├── pvc-frontend.yaml
    ├── backend-deployment.yaml
    ├── frontend-deployment.yaml
    ├── backend-service.yaml
    └── frontend-service.yaml
```

---

## ✅ Prerequisites
- Docker
- Minikube (with Docker driver on macOS)
- kubectl
- Docker Hub account (for image push)

---

## ⚙️ Step-by-Step Setup

### 1. Build & Push Docker Images

#### Backend:
```bash
cd fullstack-pvc-demo/backend

docker build -t meghnadsaha422/backend:latest .
docker push meghnadsaha422/backend:latest
```

#### Frontend:
```bash
cd ../frontend

docker build -t meghnadsaha422/frontend:latest .
docker push meghnadsaha422/frontend:latest
```

---

### 2. Deploy Kubernetes Resources
```bash
cd ../k8s

# Apply Persistent Volume Claims
kubectl apply -f pvc-backend.yaml
kubectl apply -f pvc-frontend.yaml

# Deploy backend and frontend
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

---

### 3. Access Services

#### If using ClusterIP (default):
```bash
minikube service backend-service
minikube service frontend-service
```

#### If using NodePort (you must modify `backend-service.yaml`):
```yaml
spec:
  type: NodePort
```
Then get the port:
```bash
kubectl get svc backend-service
minikube ip
```
Test backend:
```bash
curl -X POST http://<minikube-ip>:<node-port>/log -H "Content-Type: application/json" -d '{"message": "Test log entry"}'
```

---

## 📄 YAML Explanation

### pvc-backend.yaml
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: backend-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```
Creates a PVC that backend pods will mount to write logs.

---

### pvc-frontend.yaml
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: frontend-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```
Creates a PVC for frontend — can be used for persistent static content.

---

### backend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: meghnadsaha422/backend:latest
          ports:
            - containerPort: 3001
          volumeMounts:
            - name: backend-logs
              mountPath: /usr/src/app/logs
      volumes:
        - name: backend-logs
          persistentVolumeClaim:
            claimName: backend-pvc
```
Mounts PVC to `/usr/src/app/logs` where log entries will be written.

---

### frontend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: meghnadsaha422/frontend:latest
          ports:
            - containerPort: 80
```
Simple NGINX container serving static `index.html`.

---

### backend-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 3001
  type: NodePort  # Optional, for external access
```
Exposes the backend app on NodePort or via Minikube tunnel.

---

### frontend-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```
Exposes frontend NGINX service.

---

## 🧪 How to Test

### ✅ Backend:
```bash
curl http://127.0.0.1:<port>/         # should return 'Backend is running'
curl -X POST http://127.0.0.1:<port>/log \
  -H "Content-Type: application/json" \
  -d '{"message": "Test log entry"}'   # should return 'Log written'
```

### ✅ Verify PVC Log:
```bash
kubectl get pods
kubectl exec -it <backend-pod> -- /bin/sh
cat /usr/src/app/logs/log.txt
```
You should see:
```
<timestamp> - Test log entry
```

---

## ✅ Summary
- 🐳 Built Docker containers for backend and frontend
- 📦 Deployed to Kubernetes with PVCs
- 🧪 Tested endpoints via curl
- 🗂 Verified persistent volume functionality

---

