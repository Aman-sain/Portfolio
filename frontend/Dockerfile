# -------- Build Stage --------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the application source code
COPY . .

# Build the frontend (Vite / React)
RUN npm run build


# -------- Runtime Stage --------
FROM nginx:alpine

# Copy built static files to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 inside container
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
