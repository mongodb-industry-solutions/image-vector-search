# GitHub Copilot Instructions

## Project Architecture

This is a **MongoDB Vector Search demo** for insurance image similarity detection. It's a full-stack application demonstrating production-ready vector search capabilities for insurance claims processing.

### Core Components
- **Backend**: FastAPI (Python 3.11) with PyTorch/torchvision for image vectorization
- **Frontend**: Next.js with MongoDB Leafy Green UI components
- **Database**: MongoDB Atlas with vector search index on `photoEmbedding` field
- **Deployment**: Dual-environment with Drone CI/CD to MongoDB's Kanopy platform

## Key Architecture Patterns

### Vector Search Pipeline
- Images are processed using **SqueezeNet** model via `ImageVectorizer` class in `backend/image_search.py`
- MongoDB's `$vectorSearch` aggregation stage queries `photoEmbedding` field (1000 dimensions, cosine similarity)
- Results exclude embedding fields before returning to frontend
- Temporary image storage in `backend/img/` for processing

### Environment Configuration Strategy
- **Local Dev**: `.env` files in both `backend/` and `frontend/` directories
- **Production**: Separate YAML configs in `environment/` directory for staging/prod environments
- **Container**: Docker Compose with internal network communication on port 8080

### API Communication Pattern
Frontend uses **Next.js API Route Proxy Pattern** to communicate with backend. Client-side code calls local `/api/imageSearch` route, which server-side proxies to backend via `INTERNAL_API_URL`. This solves the client-side environment variable access limitation.

**Flow**: `Browser → /api/imageSearch → INTERNAL_API_URL → Backend`

### Environment Variable Configuration
- **Backend**: Uses `MONGODB_URI` (not `MONGO_URI`) and `ORIGINS` for CORS
- **Frontend**: Uses `INTERNAL_API_URL` for server-side proxy calls and `NEXT_PUBLIC_API_URL` for fallback
- **Docker**: Both containers expose port 8080, frontend maps to host port 3000

## Development Workflows

### Local Development
```bash
# Backend (Poetry-based)
cd backend && poetry install && poetry run uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend  
cd frontend && npm install && npm run dev

# Docker (preferred for full stack)
make build  # Uses docker-compose up --build -d
```

### Required Environment Variables
- **Backend**: `MONGODB_URI` (note: not MONGO_URI), `ORIGINS` (allowed frontend URLs)
- **Frontend**: `INTERNAL_API_URL` (server-side proxy), `NEXT_PUBLIC_API_URL` (fallback)
- **Docker**: Use `.env.example` as template, containers auto-configure internal routing

### Testing Vector Search
Upload images through frontend drag-and-drop interface. Backend processes via base64 → PIL → SqueezeNet → MongoDB vector query → filtered results.

## MongoDB-Specific Patterns

### Vector Index Configuration
Collection `demo_rag_insurance.claims_final` requires vector index:
```json
{
  "fields": [{"type": "vector", "path": "photoEmbedding", "numDimensions": 1000, "similarity": "cosine"}]
}
```

### Data Structure
Claims documents contain `photoEmbedding`, `damageDescriptionEmbedding`, `claimDescriptionEmbedding` fields. Frontend displays filtered results excluding embedding fields.

## Deployment (MongoDB Internal)

### Kanopy Platform Requirements
- **Port 8080**: All containers must expose port 8080 (Kanopy standard)
- **Health endpoint**: Root path `/` returns status for liveness checks
- **Drone CI/CD**: Branch-based deployment (staging/main) with ECR image builds
- **AWS Integration**: Backend containers require AWS credentials for MongoDB Atlas connection

### Branch Strategy
- `staging` → `staging.corp.mongodb.com` deployment
- `main` → `prod.corp.mongodb.com` deployment

## Component Conventions

### Backend Structure
- `main.py`: FastAPI app with CORS middleware and single `/imageSearch` endpoint
- `image_search.py`: Core vector processing logic with `ImageVectorizer` class
- `pyproject.toml`: Poetry dependencies (PyTorch, FastAPI, pymongo)

### Frontend Structure  
- Component-based with CSS modules (`.module.css` pattern)
- Leafy Green UI for MongoDB-consistent styling
- Image upload via drag-and-drop with base64 encoding
- Results display with similarity cards showing claim details

When working on this codebase, prioritize vector search accuracy and MongoDB integration patterns. The demo showcases production-grade vector search capabilities rather than basic CRUD operations.