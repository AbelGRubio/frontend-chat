---
sidebar_position: 1
---

# Full Stack Project Intro

Welcome! This tutorial will help you set up and run a **full stack application** with a **frontend (React)** and **backend (FastAPI)**.

---

## 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v18+)
- [Python](https://www.python.org/downloads/) (v3.10+)
- [Docker](https://www.docker.com/) (optional but recommended)
- A package manager like `npm`, `yarn` or `pnpm`
- [pip](https://pip.pypa.io/en/stable/installation/) (Python package installer)
- [Poetry](https://python-poetry.org/docs/#installation) (recommended for backend dependency management)

---

## 🚀 Project Structure

```
my-project/
├── backend/           # FastAPI backend
│   ├── app/
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🔧 Backend Setup (FastAPI)

### 1. Install dependencies

From the `backend/` folder:

```bash
cd backend
poetry install  # or use pip install -r requirements.txt if not using Poetry
```

### 2. Run the backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> Your backend will be available at `http://localhost:8000`

You can also use Docker:

```bash
docker build -t my-backend .
docker run -p 8000:8000 my-backend
```

---

## 🌐 Frontend Setup (React)

### 1. Install dependencies

From the `frontend/` folder:

```bash
cd frontend
npm install
```

### 2. Start the frontend

```bash
npm run dev  # or npm start depending on the setup
```

> Your frontend will be available at `http://localhost:5173` (or `3000` if using CRA)

---

## 🔗 Connecting Frontend to Backend

Make sure your frontend fetches data from the correct backend URL:

```ts
// Example (frontend/src/api.ts)
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
```

> In production, use environment variables to configure URLs.

---

## ✅ Running Both with Docker (Optional)

You can use Docker Compose to run both frontend and backend:

```yaml
# docker-compose.yml (in root)
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

```bash
docker-compose up --build
```

---

## 🧪 Testing

You can run tests for:

- **Backend**: `pytest` inside the `backend/` directory
- **Frontend**: `npm test` or `vitest` inside the `frontend/` directory

---

## 📦 Build for Production

- **Frontend**:
  ```bash
  npm run build
  ```

- **Backend**:
  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```

---

## 🧠 Summary

| Area     | Command Example             | Description                   |
|----------|-----------------------------|-------------------------------|
| Backend  | `uvicorn app.main:app`      | Starts FastAPI server         |
| Frontend | `npm run dev`               | Starts React dev server       |
| Docker   | `docker-compose up`         | Runs both services together   |

Now you're ready to develop, test and deploy your full stack application! 🚀
