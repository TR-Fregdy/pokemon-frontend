# TR-Codegen Directory

This directory contains Docker and deployment configuration files generated for containerization.

> For detailed architecture information, see [ARCHITECTURE.md](../ARCHITECTURE.md)

## Directory Structure

```
.tr-codegen/
├── Dockerfile          # Multi-stage Docker build configuration
├── docker-compose.yml  # Full-stack deployment configuration
├── nginx.conf          # Nginx web server configuration
└── README.md           # This file
```

## Files Overview

### `Dockerfile`

Multi-stage Docker build for the React application.

**Stage 1 - Builder (node:20-alpine)**:
- Installs npm dependencies
- Runs `npm run build` to create production build
- Output: `/app/build/` directory with static files

**Stage 2 - Runtime (nginx:alpine)**:
- Copies Nginx configuration
- Copies built static files from builder stage
- Serves application on port 80

**Build Command**:
```bash
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .
```

### `docker-compose.yml`

Docker Compose configuration for full-stack deployment.

**Services**:

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `main_app_web` | pokemon-frontend | 3002:80 | React frontend via Nginx |
| `main_app_pokemon-backend` | pokemon-backend | 3001:3001 | Express API server |

**Network**: `pokemon-network` (bridge driver)

**Dependencies**: Frontend depends on backend service

**Run Command**:
```bash
cd .tr-codegen
docker-compose up -d
```

### `nginx.conf`

Nginx server configuration for SPA routing.

**Configuration**:
```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # SPA routing support
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Features**:
- Listens on port 80
- Serves static files from `/usr/share/nginx/html`
- Falls back to `index.html` for client-side routing

## Deployment

### Single Service (Frontend Only)

```bash
# Build
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend ..

# Run
docker run -p 3002:80 pokemon-frontend
```

### Full Stack (Frontend + Backend)

```bash
cd .tr-codegen
docker-compose up -d

# Access
# Frontend: http://localhost:3002
# Backend:  http://localhost:3001
```

### Stop Services

```bash
docker-compose down
```

## Notes

- Frontend container requires backend to be running for API calls
- API URL should be configured via environment or build args for production
- Nginx config can be extended for gzip, caching, security headers
