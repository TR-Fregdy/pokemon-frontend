# .tr-codegen Directory

## Purpose

This directory contains Docker and deployment configuration files for containerizing and deploying the Pokemon Frontend application.

## Key Files

| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage Docker build for production deployment |
| `docker-compose.yml` | Full-stack orchestration including frontend and backend services |
| `nginx.conf` | Nginx configuration for serving the React SPA |

## Dockerfile Details

### Build Stage (node:20-alpine)
1. Install npm dependencies
2. Run `npm run build` to create optimized bundle
3. Output: `/app/build/` directory

### Runtime Stage (nginx:alpine)
1. Copy custom nginx configuration
2. Copy built static files to Nginx html directory
3. Serve on port 80

## docker-compose.yml Details

Orchestrates the full Pokemon Explorer stack:

### Services

**main_app_web (Frontend)**
- Image: `pokemon-frontend:latest`
- Port: `3002:80`
- Depends on: backend service

**main_app_pokemon-backend (Backend)**
- Port: `3001:3001`
- Environment: `NODE_ENV=production`, `PORT=3001`
- Health Check: `GET /health` every 30s
- Restart Policy: `unless-stopped`

### Network

- Network Name: `pokemon-network`
- Driver: `bridge`

## nginx.conf Details

- Listens on port 80
- Serves files from `/usr/share/nginx/html`
- SPA routing support via `try_files $uri $uri/ /index.html`

## Usage

```bash
# Build and run full stack
docker-compose -f .tr-codegen/docker-compose.yml up -d

# Build only frontend
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .

# Stop all services
docker-compose -f .tr-codegen/docker-compose.yml down
```

## Connection to Project

- **package.json**: Docker scripts reference this directory
- **Backend**: docker-compose.yml references backend's Dockerfile at `../../pokemon-backend/.tr-codegen/Dockerfile`
- **Build output**: Frontend build is served by Nginx container

For overall project architecture, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
