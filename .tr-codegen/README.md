# .tr-codegen Directory

> Part of [Pokemon Frontend](../ARCHITECTURE.md)

This directory contains deployment and containerization configuration files for the Pokemon Frontend application.

## Purpose

The `.tr-codegen` directory holds Docker and Nginx configuration that enables the React application to be built, containerized, and deployed as a production-ready static site.

## Files

### Dockerfile

**Purpose**: Multi-stage Docker build for optimized production deployment.

**Build Stages**:

**Stage 1 - Builder**:
- Base image: `node:20-alpine`
- Installs npm dependencies
- Runs production build (`npm run build`)
- Output: `/app/build` directory with static files

**Stage 2 - Runtime**:
- Base image: `nginx:alpine`
- Copies built static files to Nginx html directory
- Applies custom Nginx configuration
- Serves application on port 80

**Usage**:
```bash
# Build from repository root
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .
```

### docker-compose.yml

**Purpose**: Orchestrates both frontend and backend containers for full-stack deployment.

**Services Defined**:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `main_app_web` | pokemon-frontend:latest | 3002:80 | Frontend (Nginx) |
| `main_app_pokemon-backend` | pokemon-backend | 3001:3001 | Backend API |

**Network Configuration**:
- Network name: `pokemon-network`
- Driver: `bridge`
- Frontend depends on backend service

**Backend Health Check**:
| Parameter | Value |
|-----------|-------|
| Test | `curl -f http://localhost:3001/health` |
| Interval | 30 seconds |
| Timeout | 10 seconds |
| Retries | 3 |
| Start Period | 40 seconds |

**Usage**:
```bash
# Start both services
docker-compose -f .tr-codegen/docker-compose.yml up -d

# Stop all services
docker-compose -f .tr-codegen/docker-compose.yml down

# View logs
docker-compose -f .tr-codegen/docker-compose.yml logs -f
```

### nginx.conf

**Purpose**: Nginx server configuration for serving the React SPA.

**Configuration Details**:
- Listen port: 80
- Server name: `_` (catch-all)
- Root directory: `/usr/share/nginx/html`
- Index file: `index.html`

**SPA Routing Support**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This configuration ensures that:
- Direct file requests are served if they exist
- All other routes fall back to `index.html`
- Client-side routing (React Router) works correctly

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                        │
│                     (pokemon-network)                            │
│                                                                  │
│  ┌───────────────────────────┐  ┌───────────────────────────┐   │
│  │     main_app_web          │  │  main_app_pokemon-backend │   │
│  │     (Frontend)            │  │  (Backend)                │   │
│  │  ┌─────────────────────┐  │  │  ┌─────────────────────┐  │   │
│  │  │   nginx:alpine      │  │  │  │   node:18-alpine    │  │   │
│  │  │   Port: 80          │  │  │  │   Port: 3001        │  │   │
│  │  │                     │  │  │  │                     │  │   │
│  │  │   /index.html       │──┼──┼─>│   /api/pokemons     │  │   │
│  │  │   /static/...       │  │  │  │   /api/types        │  │   │
│  │  └─────────────────────┘  │  │  └─────────────────────┘  │   │
│  └───────────────────────────┘  └───────────────────────────┘   │
│           │                              │                       │
│           │ 3002:80                      │ 3001:3001             │
└───────────┼──────────────────────────────┼───────────────────────┘
            │                              │
            v                              v
       Host Port 3002                 Host Port 3001
```

## Build Process

```
Source Code                Multi-Stage Build                 Production
    │                           │                                │
    v                           v                                v
┌─────────┐    ┌─────────────────────────────┐    ┌─────────────────┐
│ src/    │───>│ Stage 1: Node.js Build      │───>│ Stage 2: Nginx  │
│ public/ │    │ npm install                 │    │ Copy /app/build │
│         │    │ npm run build               │    │ Apply nginx.conf│
│         │    │ Output: /app/build          │    │ Serve on :80    │
└─────────┘    └─────────────────────────────┘    └─────────────────┘
```

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Full system architecture overview
- [CLAUDE.md](../CLAUDE.md) - AI agent context and quick reference
- [src/README.md](../src/README.md) - Source code documentation
