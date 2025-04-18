

## 🧠 **Generate app with ConfigMap & Secret mount**

> Create a minimal full-stack application using **NestJS** for the backend and **React** for the frontend. The backend should:
> 
> 1. Read its configuration (e.g., `APP_NAME`, `PORT`, and `LOG_LEVEL`) from environment variables mounted via a Kubernetes **ConfigMap**
> 2. Read a secret value (e.g., `API_SECRET_KEY`) from a Kubernetes **Secret**
> 3. Expose a single endpoint `/api/info` that returns this configuration in JSON format
>
> The frontend should:
> 
> 1. Be built in React and call the backend `/api/info` endpoint on load
> 2. Display the returned configuration details
> 
> Also:
> 
> - Write **Dockerfiles** for both frontend and backend
> - Write **Kubernetes YAMLs** to deploy:
>   - Backend Deployment + Service
>   - Frontend Deployment + Service
>   - ConfigMap
>   - Secret
> - Use NodePort to expose the frontend
> - Use environment variables in the NestJS app (`process.env.*`) to read the mounted values
>
> Keep the code clean and minimal, suitable for a hands-on Kubernetes demo.

---

