## Secure Fullstack App with Secrets, PVC, RBAC

[Visit the problem statement](https://github.com/rohitsunilsharma2000/DevOps-Mastery-Roadmap/blob/main/Kubernetes_HandsOn_Task/%F0%9F%97%93%EF%B8%8F%20Week%202%3A%20k8s-hands-on-config-secrets-volumes-rbac-apps.md)


### **Complete Guide for Deploying on Minikube with Testing and Cleanup**

---

### **1. Start Minikube and Set Up Kubernetes**

#### **Command**: Start Minikube
```bash
minikube start
```

This will start a local Kubernetes cluster using Minikube.

#### **Command**: Set up Docker environment to work with Minikube's Docker daemon
```bash
eval $(minikube docker-env)
```

This allows your Kubernetes setup in Minikube to access your locally built Docker images.

---

### **2. Build Docker Images**

#### **Command**: Build backend image
```bash
docker build -t meghnadsaha422/backend-image:latest ./backend
```

#### **Command**: Build frontend image
```bash
docker build -t meghnadsaha422/frontend-image:latest ./frontend
```

These commands build the Docker images for the backend and frontend applications.

---

### **3. Push Docker Images to Docker Hub (Optional)**

If you want to push the images to Docker Hub:

#### **Command**: Login to Docker Hub
```bash
docker login
```

#### **Command**: Push backend image
```bash
docker push meghnadsaha422/backend-image:latest
```

#### **Command**: Push frontend image
```bash
docker push meghnadsaha422/frontend-image:latest
```

This will make the images accessible from anywhere (useful for Kubernetes deployments).

---

### **4. Create Kubernetes Resources (YAML Files)**

Create the following YAML files for your Kubernetes resources (MongoDB, backend, and frontend):

#### **mongo-pvc.yaml**: Persistent Volume Claim for MongoDB
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

#### **mongodb-deployment.yaml**: MongoDB Deployment and Service
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:latest
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-data
          mountPath: /data/db
      volumes:
      - name: mongo-data
        persistentVolumeClaim:
          claimName: mongo-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-service
spec:
  selector:
    app: mongo
  ports:
    - port: 27017
      targetPort: 27017
```

#### **backend-deployment.yaml**: Backend Deployment and Service
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
        image: meghnadsaha422/backend-image:latest
        ports:
        - containerPort: 8080
        envFrom:
        - secretRef:
            name: mongo-secrets
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - port: 8080
      targetPort: 8080
```

#### **frontend-deployment.yaml**: Frontend Deployment and Service
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
        image: meghnadsaha422/frontend-image:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - port: 3000
      targetPort: 3000
```

---

### **5. Apply the Kubernetes Configurations**

#### **Command**: Apply all YAML files to Kubernetes
```bash
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

This will create the persistent volume claim, deployments, and services for MongoDB, backend, and frontend.

---

### **6. Verify Pod Status**

#### **Command**: Check the status of the pods
```bash
kubectl get pods --namespace default
```

- **Expectation**: All pods should be in the `Running` state (backend, frontend, and mongo).
- **Troubleshooting**: If any pod is in `CrashLoopBackOff` or `Error`, describe the pod for more details:
  ```bash
  kubectl describe pod <pod-name> --namespace default
  ```

---

### **7. Expose Backend and Frontend Services Locally**

#### **Command**: Expose backend service
```bash
kubectl port-forward svc/backend-service 8080:8080 --namespace default
```

#### **Command**: Expose frontend service
```bash
kubectl port-forward svc/frontend-service 3000:3000 --namespace default
```

- **Expectation**: The backend should be accessible at `http://localhost:8080` and the frontend at `http://localhost:3000`.

---

### **8. Test the Application**

#### **Command**: Test backend API from the frontend
Open a browser and access the frontend at `http://localhost:3000`.

- **Expectation**: The frontend should successfully call the backend API, and you should see the expected message from `/api/info`.

#### **Command**: Test backend API using `curl`:
```bash
curl http://localhost:8080/api/info
```

- **Expectation**: This should return a response from the backend API.

---

### **9. Clean Up the Environment (After Testing)**

Once you’ve finished testing and want to clean up your Kubernetes resources:

#### **Command**: Delete the deployments and services
```bash
kubectl delete -f mongo-pvc.yaml
kubectl delete -f mongodb-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f frontend-deployment.yaml
```

#### **Command**: Stop Minikube (Optional)
```bash
minikube stop
```

---

### **Summary**:
1. **Start Minikube** and set up the Docker environment.
2. **Build and push Docker images** for the backend and frontend.
3. **Create Kubernetes resources** (PVC, Deployments, Services).
4. **Apply the resources** to Kubernetes and verify pod status.
5. **Expose services locally** using `kubectl port-forward` and test the application.
6. **Clean up** by deleting the Kubernetes resources and stopping Minikube.

---

This guide covers everything from starting Minikube, deploying your full stack app, testing it, and cleaning up. Let me know if you need any further clarification!