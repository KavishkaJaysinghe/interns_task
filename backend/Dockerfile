FROM node:18-alpine

# Define build-time variables (optional, if you want to use --build-arg)
ARG MONGO_URI
ARG JWT_SECRET

# Set environment variables (they can be passed securely during build)
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["npm", "start"]

# Dockerfile for Node.js backend
# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["npm", "start"]
