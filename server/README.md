# Server — Django REST API

## Overview

This directory contains the Django REST Framework backend for AssisTrends Module 1. It exposes a JSON API that manages user profiles and interest tags, and implements an interest-overlap matching algorithm to surface relevant user profiles based on selected criteria.

---

## Directory Structure

```
server/
├── manage.py              # Django management entry point
├── requirements.txt       # Python dependencies
├── build.sh               # Deployment build script (Render)
├── db.sqlite3             # SQLite database file (development)
│
├── server/                # Django project configuration package
│   ├── settings.py        # Application settings and configuration
│   ├── urls.py            # Root URL configuration
│   ├── asgi.py            # ASGI server entry point
│   └── wsgi.py            # WSGI server entry point
│
└── api/                   # Primary application package
    ├── models.py          # Database models (Users, Interest)
    ├── serializers.py     # DRF serializers for input/output
    ├── views.py           # API view logic
    ├── urls.py            # API-level URL routing
    ├── admin.py           # Django admin registration
    ├── apps.py            # App configuration
    └── migrations/        # Auto-generated database migrations
        └── 0001_initial.py
```

---

## Setup and Installation

### Prerequisites

- Python 3.10 or higher
- pip

### Steps

```bash
# Navigate to the server directory
cd server

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

---

## Configuration (server/settings.py)

| Setting              | Value / Notes                                                 |
|----------------------|---------------------------------------------------------------|
| `DEBUG`              | `False` — Set to `True` for local development                 |
| `ALLOWED_HOSTS`      | `['*']` — Restrict to specific domains in production          |
| `DATABASE`           | SQLite3, stored at `server/db.sqlite3`                        |
| `CORS_ALLOW_ALL_ORIGINS` | `True` — Permits cross-origin requests from the frontend  |
| `STATIC_ROOT`        | `server/staticfiles/` — Collected by `collectstatic`          |
| `INSTALLED_APPS`     | Includes `api`, `rest_framework`, and `corsheaders`           |

> **Security Note:** The `SECRET_KEY` in `settings.py` is a development placeholder. This value must be replaced with an environment variable before any production deployment.

---

## Data Models (api/models.py)

### Interest

Represents a single interest tag that can be associated with user profiles.

| Field  | Type        | Constraints         |
|--------|-------------|---------------------|
| `id`   | BigAutoField | Primary key, auto  |
| `name` | CharField   | max_length=50, unique |

### Users

Represents a registered user profile.

| Field       | Type         | Constraints                                        |
|-------------|--------------|-----------------------------------------------------|
| `id`        | BigAutoField | Primary key, auto                                   |
| `name`      | CharField    | max_length=100                                      |
| `image`     | CharField    | max_length=250, stores a URL to the profile image   |
| `location`  | CharField    | max_length=50                                       |
| `interests` | ManyToManyField | Related to `Interest`; accessible via `user_profiles` |

The relationship between `Users` and `Interest` is many-to-many, meaning a single user may hold multiple interests, and a single interest may belong to multiple users.

---

## Serializers (api/serializers.py)

### InterestSerializer

Serializes individual interest objects. Used for read operations and nested within `UserSerializer`.

**Output fields:** `id`, `name`

### UserSerializer

Serializes full user profiles, including nested interests.

**Read fields:** `id`, `name`, `image`, `location`, `interests` (nested `InterestSerializer` objects)

**Write fields:** `interest_list` (write-only) — A flat list of interest name strings sent by the client during `POST` requests.

**Create behavior:** On `POST`, the serializer accepts a list of interest name strings via `interest_list`. For each name, it performs a `get_or_create` lookup on the `Interest` table, then associates the resolved interest objects with the newly created user.

---

## API Endpoints (api/urls.py)

All routes are mounted under the `/api/` prefix, configured in `server/urls.py`.

### GET /api/users/

Returns a list of all registered user profiles.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Alex Chen",
    "image": "https://example.com/alex.jpg",
    "location": "San Francisco",
    "interests": [
      { "id": 1, "name": "React" },
      { "id": 2, "name": "Node.js" }
    ]
  }
]
```

---

### POST /api/users/

Creates a new user profile.

**Request Body:**
```json
{
  "name": "Alex Chen",
  "image": "https://example.com/alex.jpg",
  "location": "San Francisco",
  "interest_list": ["React", "Node.js", "TypeScript"]
}
```

**Response:** `201 Created` — Returns the newly created user object.

**Response:** `400 Bad Request` — Returns validation errors if any field is invalid.

---

### PUT /api/users/\<id\>

Updates an existing user profile by its integer ID.

**Request Body:** Same shape as `POST /api/users/`.

**Response:** `200 OK` — Returns the updated user object.

**Response:** `404 Not Found` — If no user with the given ID exists.

---

### DELETE /api/users/\<id\>

Permanently deletes a user profile by its integer ID.

**Response:** `204 No Content` — Successful deletion.

**Response:** `404 Not Found` — If no user with the given ID exists.

---

### GET /api/interests/

Returns all interest tags registered in the database.

**Response:** `200 OK`
```json
[
  { "id": 1, "name": "React" },
  { "id": 2, "name": "Django" },
  { "id": 3, "name": "Machine Learning" }
]
```

---

### POST /api/match/

The core matching endpoint. Accepts a list of interest names and returns all user profiles whose registered interests overlap with the provided list, sorted in descending order by the number of matching interests.

**Request Body:**
```json
{
  "interests": ["React", "Python", "Django"]
}
```

**Response:** `200 OK` — Array of matched user objects, ordered by `overlap_count` descending.

**Response:** `400 Bad Request` — If the `interests` field is absent or empty.

**Matching Logic:**

The view uses Django ORM annotations to count intersecting interests:

```python
Users.objects.filter(
    interests__name__in=interests
).annotate(
    overlap_count=Count('interests', filter=Q(interests__name__in=interests))
).order_by('-overlap_count')
```

This ensures the most relevant matches appear first.

---

## Deployment

The `build.sh` script is used by Render's build pipeline:

```bash
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
```

The production server uses **Gunicorn** (included in `requirements.txt`) as the WSGI process manager, configured by Render via its start command.

---

## Python Dependencies

| Package                | Version    | Purpose                              |
|------------------------|------------|--------------------------------------|
| Django                 | 6.0.2      | Web framework                        |
| djangorestframework    | 3.16.1     | REST API toolkit                     |
| django-cors-headers    | 4.9.0      | Cross-Origin Resource Sharing (CORS) |
| gunicorn               | 25.1.0     | Production WSGI server               |
| asgiref                | 3.11.1     | ASGI compatibility layer             |
| sqlparse               | 0.5.5      | SQL formatting utility (Django dep)  |
| tzdata                 | 2025.3     | Timezone data                        |

---

## Database Migrations

Migrations are located in `api/migrations/`. The initial migration (`0001_initial.py`) creates the `Interest` and `Users` tables and establishes the many-to-many join table.

To apply migrations after any model changes:

```bash
python manage.py makemigrations
python manage.py migrate
```
