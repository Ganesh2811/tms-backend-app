# Use Node base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Give permission to build.sh
RUN chmod +x build.sh

# Run build script
RUN ./build.sh

# Expose port
EXPOSE 8800

# Start app
CMD ["node", "build/app.cjs"]