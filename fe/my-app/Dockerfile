# 1. Build stage: Node.js를 사용하여 애플리케이션을 빌드합니다.
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (for production)
RUN npm run build

# 2. Production stage: Nginx를 사용하여 빌드된 파일을 서빙합니다.
FROM nginx:stable-alpine

# Copy built files from the build stage to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the service will be available on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
