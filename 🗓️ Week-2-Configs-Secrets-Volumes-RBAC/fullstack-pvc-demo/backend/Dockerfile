
# // backend/Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
VOLUME ["/usr/src/app/logs"]
EXPOSE 3001
CMD ["node", "app.js"]