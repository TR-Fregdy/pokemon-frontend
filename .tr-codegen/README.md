# .tr-codegen Directory

> Docker configuration files for containerized deployment

## Purpose

This directory contains Docker-related configuration files used for building and deploying the Pokemon Frontend in containerized environments.

## Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage container build instructions |
| `docker-compose.yml` | Full-stack service orchestration |
| `nginx.conf` | Production web server configuration |

## Dockerfile

Multi-stage build for optimized production images:

### Stage 1: Builder (`node:20-alpine`)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
```

### Stage 2: Runtime (`nginx:alpine`)
```dockerfile
FROM nginx:alpine
COPY ./.tr-codegen/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
```

**Benefits**:
- Small final image (~25MB)
- No Node.js runtime in production
- Only static files served

## nginx.conf

Minimal nginx configuration for SPA:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Key Features**:
- Listens on port 80
- Serves static files from build output
- SPA routing support via `try_files`
- Falls back to `index.html` for client-side routing

## docker-compose.yml

Full-stack orchestration including backend:

```yaml
services:
  main_app_web:              # Frontend service
    build: context: ..
    ports: "3002:80"
    depends_on: main_app_pokemon-backend

  main_app_pokemon-backend:  # Backend service
    build: context: ../../pokemon-backend
    ports: "3001:3001"
```

### Services

| Service | Port (Host:Container) | Purpose |
|---------|----------------------|---------|
| `main_app_web` | 3002:80 | React frontend (nginx) |
| `main_app_pokemon-backend` | 3001:3001 | Node.js API |

### Network
- **Name**: `pokemon-network`
- **Driver**: bridge
- Enables inter-container communication

## Usage

### Build Frontend Only
```bash
cd /path/to/pokemon-frontend
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .
```

### Run Frontend Only
```bash
docker run -p 3002:80 pokemon-frontend
```

### Full Stack (Frontend + Backend)
```bash
cd .tr-codegen
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Points
- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3001

## Production Considerations

### Environment Variables
For production, update API URL:
```dockerfile
# In Dockerfile, before build stage
ARG REACT_APP_API_URL=https://your-production-api.com
ENV REACT_APP_API_URL=$REACT_APP_API_URL
```

### Nginx Enhancements
Consider adding to nginx.conf:
```nginx
# Gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
```

## Related Documentation

- [Project README](../README.md) - Quick start guide
- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture overview
- [CLAUDE.md](../CLAUDE.md) - AI agent reference guide
- [Backend .tr-codegen](../../pokemon-backend/.tr-codegen/README.md) - Backend Docker config
