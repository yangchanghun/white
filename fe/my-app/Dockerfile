# Use an official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application (with environment variable set directly)
CMD ["npm", "start"]
