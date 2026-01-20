# Multi-stage Dockerfile that uses package-lock.json (npm ci) and exposes port 3000.
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps using package-lock.json for deterministic installs
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source and build if a build script exists
COPY . .
RUN npm run build || true

# Final image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy app and installed node_modules from builder stage
COPY --from=builder /app ./

EXPOSE 3000

# Start the app (assumes `npm start` starts the server on PORT)
CMD ["npm", "start"]
