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
