# .tr-codegen Directory

This directory contains Docker and deployment configuration files for the Pokemon Frontend application.

## Contents

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage Docker build configuration |
| `docker-compose.yml` | Full-stack orchestration (frontend + backend) |
| `nginx.conf` | Nginx web server configuration |

## Dockerfile

Multi-stage build:

**Stage 1 - Builder (node:20-alpine):**
- Installs npm dependencies
- Runs production build (`npm run build`)
- Outputs to `/app/build/`

**Stage 2 - Runtime (nginx:alpine):**
- Copies nginx configuration
- Copies built static files to nginx html directory
- Serves on port 80

## docker-compose.yml

Orchestrates both frontend and backend services:

| Service | Port | Description |
|---------|------|-------------|
| `main_app_web` | 3002:80 | Frontend (Nginx) |
| `main_app_pokemon-backend` | 3001:3001 | Backend API |

Services communicate via `pokemon-network` bridge network.

## nginx.conf

Minimal Nginx configuration:
- Listens on port 80
- Serves static files from `/usr/share/nginx/html`
- SPA routing support: falls back to `index.html` for client-side routes

## Usage

```bash
# Start full stack (frontend + backend)
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# View logs
docker-compose logs -f
```

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for system architecture
