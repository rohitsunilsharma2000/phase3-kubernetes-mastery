#!/bin/bash
# Wait and get NodePort

echo "⏳ Waiting for service..."
kubectl get svc -n nginx-namespace my-nginx -w & sleep 10; kill $!

NODE_PORT=$(kubectl get svc -n nginx-namespace my-nginx -o jsonpath="{.spec.ports[0].nodePort}")
MINIKUBE_IP=$(minikube ip)

echo "🌐 Visit: http://${MINIKUBE_IP}:${NODE_PORT}"
echo "🔍 Curl test:"
curl --connect-timeout 5 http://${MINIKUBE_IP}:${NODE_PORT}
