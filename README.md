# Medha

> From first problem to dream career — practice coding, prepare for interviews, build real-world skills, and get hired with confidence.

Medha is a full AI-powered learning, coding, problem-solving, and career growth ecosystem for students and developers.

---

## Architecture

```
Medha/
├── client/           # React + Vite frontend
├── server/           # Main REST API  (Node.js + Express)
├── code-execution/   # Judge / code runner  (Node.js + Express)
├── ai-engine/        # AI services  (Python + FastAPI)
├── docs/             # Architecture & API docs
├── docker-compose.yml
└── README.md
```

---

## Services & Ports

| Service         | Port  | Tech                  |
|-----------------|-------|-----------------------|
| Frontend        | 5173  | React + Vite          |
| Main API        | 5000  | Node.js + Express     |
| Code Execution  | 5001  | Node.js + Express     |
| AI Engine       | 8000  | Python + FastAPI      |

---

## Quick Start

### 1. Code Execution Engine
```bash
cd code-execution
npm install
node execute.js
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

### 3. Main API Server
```bash
cd server
npm install
npm run dev
```

### 4. AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## Phase 1 — Foundation (Current)
- [x] Clean monorepo architecture
- [x] Code Playground (Python execution)
- [x] Monaco Editor integration
- [x] Frontend → Backend connection
- [x] Custom input support

## Phase 2 — Platform Core (Next)
- [ ] User authentication (JWT)
- [ ] Problem set & test case judge
- [ ] DSA learning paths
- [ ] AI roadmap generator

## Phase 3 — Career Layer
- [ ] Resume parser & ATS scorer
- [ ] Interview preparation system
- [ ] Job & internship portal
- [ ] AI mentor & personalized paths

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, Vite, Monaco Editor     |
| Main API   | Node.js, Express, MongoDB         |
| Judge      | Node.js, Express, child_process   |
| AI Engine  | Python, FastAPI                   |
| Deployment | Vercel (frontend), Render (APIs)  |
