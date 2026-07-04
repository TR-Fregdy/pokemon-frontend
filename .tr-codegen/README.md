# Docker Deployment Configuration

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains Docker deployment configurations for the Pokemon Frontend application.

## Directory Structure

```
.tr-codegen/
├── Dockerfile           # Multi-stage container build
├── docker-compose.yml   # Full-stack orchestration
├── nginx.conf           # Production web server config
└── README.md            # This file
```

## File Descriptions

### Dockerfile

**Purpose**: Multi-stage build for optimized production container.

**Stage 1: Builder** (`node:20-alpine`)
- Installs dependencies
- Builds React application
- Produces optimized static files

**Stage 2: Runtime** (`nginx:alpine`)
- Copies built static files
- Serves with Nginx
- Minimal container size

**Build Process**:

| Stage | Image | Purpose |
|-------|-------|---------|
| Builder | `node:20-alpine` | Build React app |
| Runtime | `nginx:alpine` | Serve static files |

**Key Instructions**:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY ./.tr-codegen/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
```

### nginx.conf

**Purpose**: Production web server configuration for SPA routing.

**Configuration**:

| Directive | Value | Purpose |
|-----------|-------|---------|
| `listen` | `80` | HTTP port |
| `server_name` | `_` | Match all hostnames |
| `root` | `/usr/share/nginx/html` | Static file location |
| `index` | `index.html` | Default document |

**SPA Routing**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This ensures all routes return `index.html` for client-side React Router handling.

### docker-compose.yml

**Purpose**: Full-stack orchestration including both frontend and backend services.

**Services**:

| Service | Port | Description |
|---------|------|-------------|
| `main_app_web` | `3002:80` | Frontend (Nginx) |
| `main_app_pokemon-backend` | `3001:3001` | Backend (Node.js) |

**Service Dependencies**:
```yaml
main_app_web:
  depends_on:
    - main_app_pokemon-backend
```

**Network Configuration**:
- Network: `pokemon-network`
- Driver: `bridge`
- Enables inter-container communication

## Usage

### Build and Run Frontend Only

```bash
# From repository root
docker build -t pokemon-frontend -f .tr-codegen/Dockerfile .

# Run container
docker run -p 3002:80 pokemon-frontend
```

### Full Stack Deployment

```bash
# Start all services
docker-compose -f .tr-codegen/docker-compose.yml up -d

# View logs
docker-compose -f .tr-codegen/docker-compose.yml logs -f

# Stop all services
docker-compose -f .tr-codegen/docker-compose.yml down
```

### Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3002 |
| Backend API | http://localhost:3001 |
| Health Check | http://localhost:3001/health |

## Production Considerations

### Environment Variables

For production, set the API URL during build:

```dockerfile
ARG REACT_APP_API_URL=https://api.example.com
ENV REACT_APP_API_URL=$REACT_APP_API_URL
```

### Nginx Enhancements

Consider adding to `nginx.conf`:

```nginx
# Gzip compression
gzip on;
gzip_types text/plain application/json application/javascript text/css;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
```

## Container Health

The backend includes a health check. For frontend, Nginx default health is used.

To add frontend health check:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:80"]
  interval: 30s
  timeout: 10s
  retries: 3
```

## Related Documentation

- [../ARCHITECTURE.md](../ARCHITECTURE.md) - Full architecture overview
- [../CLAUDE.md](../CLAUDE.md) - AI agent context
- [../src/README.md](../src/README.md) - Source code overview
