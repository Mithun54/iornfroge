# Stage 1: Build the client application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests for optimal layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies required for Vite & TypeScript)
RUN npm ci

# Copy application source code (excluding items in .dockerignore)
COPY . .

# Build production assets into /app/dist
RUN npm run build

# Stage 2: Production runtime
FROM node:22-alpine AS runner

WORKDIR /app

# Production environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled frontend from builder
COPY --from=builder --chown=node:node /app/dist ./dist

# Copy production server and API endpoints
COPY --chown=node:node server.js ./server.js
COPY --chown=node:node api ./api

# Ensure /app ownership for non-root node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose application port
EXPOSE 3000

# Launch production server
CMD ["npm", "start"]
