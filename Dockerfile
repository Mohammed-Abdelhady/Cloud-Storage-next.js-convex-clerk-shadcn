FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script and set execute permissions
COPY entrypoint-frontend.sh /entrypoint-frontend.sh
RUN chmod +x /entrypoint-frontend.sh

# Expose the port the app runs on
EXPOSE 3000

# Run the entrypoint script
ENTRYPOINT ["/entrypoint-frontend.sh"]
