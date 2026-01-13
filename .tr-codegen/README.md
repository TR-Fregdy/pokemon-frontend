# .tr-codegen Directory

## Purpose

This directory contains Docker deployment configuration files for containerizing the Pokemon Frontend application and orchestrating it with the backend service.

## Key Files

| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage Docker build for production deployment |
| `docker-compose.yml` | Full-stack orchestration (frontend + backend) |
| `nginx.conf` | Nginx web server configuration for serving the SPA |

## File Responsibilities

### Dockerfile

**Multi-Stage Build Process**:

1. **Builder Stage** (`node:20-alpine`):
   - Installs npm dependencies
   - Runs `npm run build` to create production bundle
   - Outputs to `/app/build/`

2. **Runtime Stage** (`nginx:alpine`):
   - Copies nginx configuration
   - Copies built static files from builder stage
   - Serves on port 80

### docker-compose.yml

**Services Defined**:

| Service | Purpose | Port |
|---------|---------|------|
| `main_app_web` | Frontend (this app) | 3002:80 |
| `main_app_pokemon-backend` | Backend API | 3001:3001 |

**Network Configuration**:
- Creates `pokemon-network` bridge network
- Both services communicate over this network
- Frontend depends on backend (`depends_on`)

**Backend Health Check**:
- Polls `http://localhost:3001/health` every 30 seconds
- 10-second timeout, 3 retries
- 40-second start period for container initialization

### nginx.conf

**Configuration**:
- Listens on port 80
- Serves files from `/usr/share/nginx/html`
- **SPA Support**: `try_files $uri $uri/ /index.html`
  - Allows client-side routing to work
  - All unknown paths fall back to `index.html`

## Usage

### Build and Run Full Stack

```bash
# From pokemon-frontend root directory
docker-compose -f .tr-codegen/docker-compose.yml up -d

# View logs
docker-compose -f .tr-codegen/docker-compose.yml logs -f

# Stop services
docker-compose -f .tr-codegen/docker-compose.yml down
```

### Build Frontend Only

```bash
# From pokemon-frontend root directory
docker build -t pokemon-frontend -f .tr-codegen/Dockerfile .
docker run -p 3002:80 pokemon-frontend
```

## Connection to Other Parts

- **Parent Directory**: Contains the React application source code
- **Backend Reference**: `docker-compose.yml` references `../../pokemon-backend` for the backend service
- **Build Context**: Dockerfile uses parent directory (`..`) as build context
- **Network**: Creates shared network for frontend-backend communication

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for high-level system design
