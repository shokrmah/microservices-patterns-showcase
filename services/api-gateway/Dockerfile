# --- Stage 1: Builder ---
# We use a full Node.js image to install dependencies.
# "alpine" is a very small Linux distribution — keeps the image size small.
FROM node:20-alpine AS builder

# Set the working directory inside the container.
# All following commands run from this path.
WORKDIR /app

# Copy package.json and package-lock.json FIRST before copying source code.
# Docker caches each step — if these files haven't changed, it reuses the
# cached node_modules layer and skips npm install entirely. Much faster builds.
COPY package*.json ./

# Install only production dependencies — we don't need nodemon etc. in the image
RUN npm install --omit=dev

# --- Stage 2: Final image ---
# We copy only what we need from the builder into a fresh clean image.
# This keeps the final image small — no build tools, no cache, no temp files.
FROM node:20-alpine

WORKDIR /app

# Copy installed node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy our application source code
COPY src/ ./src
COPY package.json ./

# Document that this container listens on port 3000.
# This is informational — you still need to map it when running.
EXPOSE 3000

# The command that runs when the container starts.
# We use "node" directly here, not nodemon — nodemon is for development only.
CMD ["node", "src/server.js"]