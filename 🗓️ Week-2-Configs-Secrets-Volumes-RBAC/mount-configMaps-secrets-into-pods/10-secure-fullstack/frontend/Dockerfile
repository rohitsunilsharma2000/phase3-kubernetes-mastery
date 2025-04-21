# Use official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
