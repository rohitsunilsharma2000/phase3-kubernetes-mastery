#!/bin/bash
# Start Minikube and add Bitnami repo

minikube start
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Create namespace if not exists
kubectl create namespace nginx-namespace || true

# Install Nginx with custom values
helm install my-nginx bitnami/nginx \
  -n nginx-namespace \
  -f values.yaml
