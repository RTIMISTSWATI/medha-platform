from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Medha AI Engine", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-engine"}


# Phase 2 routers
# from app.routes import roadmap, resume, mentor
# app.include_router(roadmap.router, prefix="/roadmap")
# app.include_router(resume.router,  prefix="/resume")
# app.include_router(mentor.router,  prefix="/mentor")
