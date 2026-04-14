# Mayank Arora — Portfolio Website

A full-stack developer portfolio built with **React**, **FastAPI**, and **MongoDB**.

---

## Tech Stack

| Layer    | Technology                                                    |
| -------- | ------------------------------------------------------------- |
| Frontend | React 19, Tailwind CSS, Framer Motion, tsParticles, shadcn/ui |
| Backend  | FastAPI, Motor (async MongoDB driver), Pydantic               |
| Database | MongoDB                                                       |
| Fonts    | Space Grotesk, Inter, JetBrains Mono (Google Fonts)           |

---

## Prerequisites

Make sure you have these installed on your machine:

- **Node.js** ≥ 18 & **Yarn** (for frontend)
- **Python** ≥ 3.10 & **pip** (for backend)
- **MongoDB** — either installed locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster

---

## Project Structure

```
/app
├── frontend/                # React app
│   ├── public/
│   ├── src/
│   │   ├── components/      # All UI components (Navbar, Hero, About, etc.)
│   │   ├── context/         # PortfolioContext (fetches data from backend)
│   │   ├── data/mock.js     # Fallback mock data
│   │   └── App.js           # Main app entry
│   ├── .env                 # REACT_APP_BACKEND_URL
│   └── package.json
│
├── backend/                 # FastAPI app
│   ├── server.py            # All API routes + DB seed logic
│   ├── .env                 # MONGO_URL, DB_NAME
│   └── requirements.txt
│
├── contracts.md             # API contracts reference
└── README.md                # You are here
```

---

## Local Setup

### 1. Clone / Download the project

```bash
git clone <your-repo-url>
cd app
```

### 2. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
touch .env
```

Add these to `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
```

> **If using MongoDB Atlas**, replace `MONGO_URL` with your Atlas connection string:
> `MONGO_URL=mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority`

Start the backend:

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend will:
- Auto-seed MongoDB with all your portfolio data on first startup
- Be available at `http://localhost:8001`
- API docs at `http://localhost:8001/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Create .env file
touch .env
```

Add this to `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start the frontend:

```bash
yarn start
```

The frontend will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/api/portfolio` | Returns all portfolio sections       |
| POST   | `/api/contact`   | Submit a contact message             |
| GET    | `/api/messages`  | List all received contact messages   |

**POST /api/contact** body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Let's connect!"
}
```

---

## Deployment Guide

### Option A: Vercel (Frontend) + Railway/Render (Backend) + MongoDB Atlas (DB)

This is the simplest and cheapest (free tier) approach.

#### Step 1 — MongoDB Atlas (Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free cluster
2. Create a database user with a password
3. Whitelist `0.0.0.0/0` in Network Access (allows all IPs)
4. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### Step 2 — Railway or Render (Backend)

**Using Railway:**
1. Go to [railway.app](https://railway.app) and connect your GitHub repo
2. Create a new service pointing to the `/backend` directory
3. Set environment variables:
   - `MONGO_URL` = your Atlas connection string
   - `DB_NAME` = `portfolio_db`
4. Set the start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Deploy — Railway gives you a public URL like `https://your-app.up.railway.app`

**Using Render:**
1. Go to [render.com](https://render.com) and create a new **Web Service**
2. Point to your repo, set root directory to `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `MONGO_URL`, `DB_NAME`
6. Deploy — Render gives you a URL like `https://your-app.onrender.com`

#### Step 3 — Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com) and import your GitHub repo
2. Set the root directory to `frontend`
3. Framework preset: **Create React App**
4. Add environment variable:
   - `REACT_APP_BACKEND_URL` = your Railway/Render backend URL (e.g., `https://your-app.up.railway.app`)
5. Deploy

---

### Option B: Single VPS (DigitalOcean / AWS EC2 / Hetzner)

If you want everything on one server:

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js, Python, MongoDB, Nginx
sudo apt update
sudo apt install -y nodejs npm python3 python3-pip python3-venv mongodb nginx

# Clone your repo
git clone <your-repo> /opt/portfolio
cd /opt/portfolio

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install -g yarn
yarn install
yarn build    # Creates optimized production build in /build
```

Then configure **Nginx** to:
- Serve the frontend build files on port 80
- Reverse proxy `/api/*` requests to `localhost:8001`

Example Nginx config (`/etc/nginx/sites-available/portfolio`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend — serve React build
    root /opt/portfolio/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend — proxy API calls
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Use **systemd** or **pm2** to keep the backend running:

```bash
# Start backend in background
cd /opt/portfolio/backend
source venv/bin/activate
nohup uvicorn server:app --host 0.0.0.0 --port 8001 &
```

---

### Option C: Docker (Advanced)

Create a `docker-compose.yml` at the project root:

```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=portfolio_db
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001

volumes:
  mongo_data:
```

You'd need to add a `Dockerfile` in each folder. This is more advanced but gives you a portable, reproducible setup.

---

## Updating Portfolio Content

All portfolio content is stored in MongoDB in the `portfolio` collection. To update:

1. **Quick way** — Delete the document in MongoDB and restart the backend. Edit the `SEED_DATA` dictionary in `server.py` before restarting.

2. **Better way** — Use MongoDB Compass or Atlas UI to directly edit the document in the `portfolio` collection. Changes reflect immediately on the next page load.

3. **Best way** — Build an admin panel (future enhancement) that lets you edit content through a UI.

---

## Customization Tips

- **Colors** — Edit the hex values in component files or `index.css`. Main palette: `#080C18`, `#7B5EEA`, `#3B6FD4`, `#A78BFA`
- **Photo** — Update the `photo` field in `SEED_DATA` in `server.py` or directly in MongoDB
- **Resume** — Host your PDF anywhere (Google Drive, S3, GitHub) and update the `resumeUrl` field
- **Sections** — Each section is a separate React component in `src/components/`. Add, remove, or reorder in `App.js`

---

## License

This project is personal. Feel free to use it as a reference or template for your own portfolio.

---

Built by **Mayank Arora** · 2025
