#!/bin/bash
helm uninstall my-nginx -n nginx-namespace
kubectl delete namespace nginx-namespace
minikube stop
