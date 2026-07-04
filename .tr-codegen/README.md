# .tr-codegen Directory

This directory contains Docker deployment configuration files for the Pokemon Frontend application.

## Purpose

The `.tr-codegen` directory holds infrastructure-as-code files for containerizing and deploying the frontend application. These files enable consistent deployment across different environments and support full-stack deployment with the backend.

## Key Files

| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage Docker build for React application with Nginx |
| `docker-compose.yml` | Full-stack orchestration for frontend and backend services |
| `nginx.conf` | Nginx configuration for serving the SPA |

## Dockerfile

Multi-stage build process:

**Stage 1 - Builder (Node.js 20 Alpine)**:
- Installs npm dependencies
- Builds the React application
- Outputs static files to `/app/build/`

**Stage 2 - Production (Nginx Alpine)**:
- Copies nginx configuration
- Copies built static files
- Serves application on port 80

## docker-compose.yml

Defines two services for full-stack deployment:

### main_app_web (Frontend)
- Image: `pokemon-frontend:latest`
- Port mapping: 3002:80
- Network: `pokemon-network`
- Depends on: `main_app_pokemon-backend`

### main_app_pokemon-backend (Backend)
- Port mapping: 3001:3001
- Environment: `NODE_ENV=production`, `PORT=3001`
- Health check configured
- Restart policy: `unless-stopped`

## nginx.conf

Nginx server configuration:
- Listens on port 80
- Serves files from `/usr/share/nginx/html`
- SPA routing support via `try_files $uri $uri/ /index.html`

## Usage

```bash
# Build and run full stack
docker-compose -f .tr-codegen/docker-compose.yml up -d

# Stop all services
docker-compose -f .tr-codegen/docker-compose.yml down

# Build only frontend
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend ..
```

## Network Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    pokemon-network                          │
│                                                             │
│  ┌─────────────────────┐     ┌─────────────────────────┐  │
│  │  main_app_web       │     │ main_app_pokemon-backend│  │
│  │  (Nginx/React)      │────>│     (Express/Node)      │  │
│  │  Port 3002:80       │     │     Port 3001:3001      │  │
│  └─────────────────────┘     └─────────────────────────┘  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

## Connection to Project

This directory supports the deployment workflow for the frontend application. See [ARCHITECTURE.md](../ARCHITECTURE.md) for the overall system architecture.
