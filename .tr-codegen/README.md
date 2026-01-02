# Deployment Configuration (.tr-codegen)

> Part of [Pokemon Frontend](../ARCHITECTURE.md) | [Deployment Architecture](../ARCHITECTURE.md#deployment-architecture)

## Purpose

This directory contains Docker and deployment configuration files for containerizing and deploying the Pokemon Frontend application.

## Directory Structure

```
.tr-codegen/
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Full-stack orchestration
├── nginx.conf            # Nginx web server config
└── README.md             # This file
```

## File Descriptions

### Dockerfile

Multi-stage build configuration:

**Stage 1: Builder (node:20-alpine)**
- Installs npm dependencies
- Runs `npm run build` to create production bundle
- Output: `/app/build/` directory

**Stage 2: Runtime (nginx:alpine)**
- Copies nginx configuration
- Copies built static files
- Serves on port 80

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

### docker-compose.yml

Orchestrates both frontend and backend services:

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `main_app_web` | pokemon-frontend | 3002:80 | Nginx serving React build |
| `main_app_pokemon-backend` | pokemon-backend | 3001:3001 | Node.js API |

**Network:** `pokemon-network` (bridge driver)

**Dependencies:** Frontend depends on backend

### nginx.conf

Minimal Nginx configuration for SPA routing:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - all paths serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Key Feature:** `try_files` directive enables client-side routing by falling back to `index.html` for all routes.

## Usage

### Build and Run Frontend Only

```bash
# From project root
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .
docker run -p 3002:80 pokemon-frontend
```

### Run Full Stack

```bash
# From .tr-codegen directory
docker-compose up -d

# Or from project root
docker-compose -f .tr-codegen/docker-compose.yml up -d
```

### Stop Services

```bash
docker-compose -f .tr-codegen/docker-compose.yml down
```

## Network Architecture

```
┌────────────────────────────────────────────┐
│           pokemon-network                   │
│                                             │
│  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Frontend       │  │  Backend        │ │
│  │  (nginx:80)     │──│  (node:3001)    │ │
│  │  Port: 3002     │  │  Port: 3001     │ │
│  └─────────────────┘  └─────────────────┘ │
│                                             │
└────────────────────────────────────────────┘
```

## Environment Variables

The frontend container uses build-time environment variables. Set in the build command or docker-compose:

```yaml
environment:
  - REACT_APP_API_URL=http://backend:3001
```

**Note:** Environment variables prefixed with `REACT_APP_` are embedded at build time.

## Customization

### Change Port

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 3002 to 8080
```

### Add SSL/TLS

1. Add SSL certificates to container
2. Update `nginx.conf` with HTTPS configuration
3. Expose port 443

### Add Caching Headers

Extend `nginx.conf`:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Related Documentation

- [Frontend Architecture](../ARCHITECTURE.md) - Full architecture documentation
- [CLAUDE.md](../CLAUDE.md) - AI agent quick reference
- [Backend Deployment](../../pokemon-backend/.tr-codegen/README.md) - Backend container config
