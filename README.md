# Full-Stack Task Manager (Docker Architecture)

A 3-tier containerized full-stack application built to learn and implement core Docker concepts: custom networks, persistent volumes, multi-stage production builds, and declarative multi-container orchestration.

---

## Architecture Overview

```
Host Browser (Windows)
   │
   ├─► localhost:5173 ──► [ frontend: Nginx / Vite ]
   │                            │
   └─► localhost:3000 ──► [ backend: Node.js 22 / Express ]
                                │ (Docker DNS: mongodb:27017)
                                ▼
                          [ mongodb: Community Server 8.0 ]
                                │
                          (Volume: task-manager-mongodb-data)
```

Frontend: Vanilla JS / Vite, served via a multi-stage nginx:alpine production image.
Backend: Node.js 22 (Alpine) with Express & Mongoose. Connects to MongoDB via Docker network DNS (mongodb:27017).
Database: MongoDB Community Server 8.0 with stateful persistent named volume storage.
Orchestration: Managed via docker-compose.yml on a unified bridge network.

## Tech Stack
Runtime & Frameworks: Node.js 22, Express, Vite
Database: MongoDB 8.0
Web Server: Nginx (Alpine)
Containerization: Docker, Docker Compose, Docker Hub

## Quickstart (Local Development)

**Prerequisites**
Docker Desktop installed and running
Git

**Clone the repository**
`git clone https://github.com/<your-github-username>/<your-repo-name>.git`

**Run the complete stack**
`docker compose up -d --build`

**Teardown**
```
# Stop and remove containers and network (preserves database volume)
docker compose down

# Stop, remove containers, and wipe database volume completely
docker compose down -v
```

## Published Docker Hub Images
Backend:   docker pull nahezulkhair/task-manager-backend:1.1.0
Frontend:   docker pull nahezulkhair/task-manager-frontend:1.1.0
