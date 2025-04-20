## Mount configMaps secrets into pods :

Absolutely! Here's the full **end-to-end script** to:

1. ✅ Rebuild & push frontend and backend images  
2. ✅ Restart the deployments  
3. ✅ Port-forward both services for testing  
4. ✅ Delete everything after test  
5. ✅ Re-apply from `../k8s` folder

---

## ✅ STEP-BY-STEP SCRIPT

Assuming your structure is:

```
project/
├── backend/
├── frontend/
└── k8s/
```

---

### ✅ 1. Build & Push Images

```bash
# Build & Push Backend
cd backend
docker build -t meghnadsaha422/item-backend:latest .
docker push meghnadsaha422/item-backend:latest

# Build & Push Frontend
cd ../frontend
docker build -t meghnadsaha422/item-frontend:latest .
docker push meghnadsaha422/item-frontend:latest
```

---

### ✅ 2. Restart Deployments

```bash
kubectl rollout restart deployment item-backend
kubectl rollout restart deployment item-frontend
```

---

### ✅ 3. Port-forward Both Services

Open **two terminals** and run:

```bash
# Terminal 1 - Backend
kubectl port-forward service/item-backend-service 3001:3001
```

```bash
# Terminal 2 - Frontend
kubectl port-forward service/item-frontend-service 3000:3000
```

Now visit:
- [http://localhost:3000](http://localhost:3000) → frontend
- [http://localhost:3001/items](http://localhost:3001/items) → backend

---

### ✅ 4. After Testing, Delete Everything

```bash
kubectl delete -f k8s/
```

---

### ✅ 5. Re-Apply from `../k8s`

```bash
cd ../k8s
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

---


---

## 🧼 Clean-Up Commands

### 1. **Delete All Kubernetes Resources**
```bash
kubectl delete -f k8s/frontend-service.yaml
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/pvc-frontend.yaml

kubectl delete -f k8s/backend-service.yaml
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/pvc-backend.yaml
```

### 2. **Delete All PVCs and Volumes (if lingering)**
```bash
kubectl delete pvc backend-pvc
kubectl delete pvc frontend-pvc
```

### 3. **Delete Docker Images Locally (optional)**
```bash
docker rmi meghnadsaha422/backend:latest

docker rmi meghnadsaha422/frontend:latest
```

---

