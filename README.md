# AssisTrends — Module 1: User Matching Platform

## Overview

AssisTrends Module 1 is a full-stack web application that enables users to discover and connect with like-minded individuals based on shared interests. Users select interest tags from a dynamically populated list, and the platform surfaces matching profiles ranked by the degree of interest overlap.

The system is built as a decoupled architecture: a **Django REST Framework** backend exposes a JSON API, and a **React (Vite)** frontend consumes that API to deliver the user interface.

---

## Project Structure

```
module 1/
├── client/          # React frontend application (Vite)
└── server/          # Django REST API backend
```

---

## Technology Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | React 19, React Router DOM 7, Vite 7 |
| Backend   | Django 6, Django REST Framework 3  |
| Database  | SQLite 3 (development)             |
| Styling   | Vanilla CSS (Glassmorphism design) |
| Deployment| Render (backend), Vite build (frontend) |
| Icons     | Lucide React                       |

---

## Core Features

- **Interest-based user matching** — Users select one or more interests from a paginated tag list. The backend returns all registered users whose interest sets overlap with the selection, ordered by the count of matching interests.
- **Dynamic interest registry** — The interest tag list is fetched live from the database, ensuring newly added interests appear without any frontend changes.
- **User profile display** — Matched profiles surface the user's name, profile image, location, and associated interest tags.
- **Responsive UI** — The interface adapts to mobile screen widths using CSS Grid and media queries.

---

## Getting Started

### Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher and **npm**
- **pip** and **pipenv** (optional but recommended for virtual environments)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "module 1"
```

---

### 2. Start the Backend Server

```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

---

### 3. Start the Frontend Development Server

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173/`.

---

## API Endpoints Summary

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/api/interests/`    | Returns all available interest tags      |
| GET    | `/api/users/`        | Returns all registered user profiles     |
| POST   | `/api/users/`        | Creates a new user profile               |
| PUT    | `/api/users/<id>`    | Updates an existing user profile         |
| DELETE | `/api/users/<id>`    | Deletes a user profile                   |
| POST   | `/api/match/`        | Returns users matched by interest overlap |

Full API documentation is included in the [server README](./server/README.md).

---

## Deployment

The backend is configured for deployment on **Render** using the `build.sh` script located at `server/build.sh`. This script installs dependencies, collects static files, and applies database migrations in a single step.

The live API base URL is: `https://user-matching.onrender.com`

---

## Folder-Level Documentation

- [Backend Documentation](./server/README.md)
- [Frontend Documentation](./client/README.md)

---

## Project Context

This module is the foundational component of the AssisTrends platform. Its primary responsibility is user discovery through shared interests. Subsequent modules may build on this foundation to add features such as messaging, trend analysis, and collaborative workspaces.
