# 1. Build stage
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

# 2. Production stage
FROM nginx:stable-alpine

# Copy built files from the build stage to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the service will be available on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
