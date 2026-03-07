# Client — React Frontend

## Overview

This directory contains the React frontend application for AssisTrends Module 1. It is built with Vite and provides the user interface through which visitors select interest tags and view matched user profiles returned by the Django REST API.

The interface follows a glassmorphism design language — dark background, translucent panels, soft violet accent colors, and smooth hover transitions.

---

## Directory Structure

```
client/
├── index.html              # HTML document root and script mount point
├── package.json            # Project metadata and npm scripts
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint linting rules
├── .gitignore              # Files excluded from version control
│
└── src/
    ├── main.jsx            # Application entry point — mounts React root
    ├── App.jsx             # Root component — defines client-side routes
    ├── App.css             # Global application styles
    ├── index.css           # CSS reset and base typography
    │
    ├── assets/             # Static asset files (images, SVGs)
    │
    └── pages/
        └── FindPeople/     # Primary page of the application
            ├── FindPeople.jsx      # Page-level component and data orchestration
            ├── FindPeople.css      # Page and match card styles
            ├── FilterTags.jsx      # Interest filter tag bar component
            ├── FilterTags.css      # Filter tag styles
            ├── ContentSection.jsx  # Matched users grid container
            └── UserCard.jsx        # Individual user profile card
```

---

## Setup and Installation

### Prerequisites

- Node.js 18 or higher
- npm

### Steps

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

---

## Available Scripts

| Command           | Description                                         |
|-------------------|-----------------------------------------------------|
| `npm run dev`     | Starts the Vite development server with HMR         |
| `npm run build`   | Compiles and bundles the application for production |
| `npm run preview` | Serves the production build locally for inspection  |
| `npm run lint`    | Runs ESLint across all source files                 |

---

## Application Routing (App.jsx)

The application uses `react-router-dom` with a `BrowserRouter` context. Currently there is a single defined route:

| Path | Component    | Description                        |
|------|--------------|------------------------------------|
| `/`  | `FindPeople` | Interest-based user matching page  |

Additional routes for future modules may be added to `App.jsx`.

---

## Component Reference

### FindPeople (pages/FindPeople/FindPeople.jsx)

The top-level page component. It owns all shared state and is responsible for all API communication. Child components receive data and callbacks via props.

**State:**

| State variable   | Type       | Description                                         |
|------------------|------------|-----------------------------------------------------|
| `interests`      | `string[]` | List of all interest tag names fetched from the API |
| `activeFilters`  | `string[]` | List of interest names currently selected by the user |
| `matchedUsers`   | `object[]` | Array of user profile objects returned by the match API |

**Side Effects:**

- On initial mount, `fetchInterestList` is called to populate the `interests` array from `GET /api/interests/`.
- Whenever `activeFilters` changes, `fetchMatchedUsers` is triggered to call `POST /api/match/` with the selected interests. If no filters are active, the call is skipped and `matchedUsers` is not cleared (the content section handles the empty state display).

**API Calls:**

| Function             | Method | Endpoint                                         |
|----------------------|--------|--------------------------------------------------|
| `fetchInterestList`  | GET    | `https://user-matching.onrender.com/api/interests/` |
| `fetchMatchedUsers`  | POST   | `https://user-matching.onrender.com/api/match/`   |

**Props passed down:**

- `FilterTags` receives: `interests`, `activeFilters`, `setActiveFilters`
- `ContentSection` receives: `matchedUsers`

---

### FilterTags (pages/FindPeople/FilterTags.jsx)

Renders the row of selectable interest filter tags. Each tag is a `<button>` element that toggles its inclusion in the `activeFilters` array when clicked.

**Props:**

| Prop               | Type       | Description                                              |
|--------------------|------------|----------------------------------------------------------|
| `interests`        | `string[]` | Full list of available interest names                    |
| `activeFilters`    | `string[]` | Currently selected interest names (default: `[]`)        |
| `setActiveFilters` | `function` | State setter from `FindPeople`, called on each toggle    |

**Behavior:**

The `toggleFilter` function checks whether the clicked interest name is already present in `activeFilters`. If it is, the name is removed; if it is not, it is appended. The active state is reflected visually by conditionally applying the `active` CSS class to the button.

---

### ContentSection (pages/FindPeople/ContentSection.jsx)

A layout container that wraps the matched user results grid. It conditionally renders either the populated grid or a plain-text prompt when no users have been matched.

**Props:**

| Prop           | Type       | Description                                              |
|----------------|------------|----------------------------------------------------------|
| `matchedUsers` | `object[]` | Array of user profile objects from the match API         |

**Behavior:**

- If `matchedUsers` contains at least one entry, it renders one `UserCard` per user inside a `match-card` article element.
- If `matchedUsers` is empty or undefined, it renders the fallback string: `"Try selecting some interests to find like-minded individuals!"`

---

### UserCard (pages/FindPeople/UserCard.jsx)

A presentational component that displays the profile information for a single matched user. It takes a single `user` prop and renders the profile image, name, location, interest tags, and a connect button.

**Props:**

| Prop   | Type     | Description                                                              |
|--------|----------|--------------------------------------------------------------------------|
| `user` | `object` | A user profile object: `{ id, name, image, location, interests: [{id, name}] }` |

**Rendered Elements:**

| Element             | Source field         |
|---------------------|----------------------|
| Profile image       | `user.image` (URL)   |
| Display name        | `user.name`          |
| Location            | `user.location`      |
| Interest tag pills  | `user.interests[]`   |
| Connect button      | Static UI element    |

---

## Styling Architecture

All styles are written in plain CSS and are scoped at the component or page level via separately imported `.css` files. No CSS framework is used.

### Design Tokens (FindPeople.css)

| Token / Class       | Description                                                  |
|---------------------|--------------------------------------------------------------|
| `page-container`    | Full-viewport dark background (`#050505`), flexbox centered  |
| `background-blobs`  | Fixed-position aurora gradient blobs (violet palette)        |
| `glass-interface`   | Main content panel with `backdrop-filter: blur(16px)` glass effect |
| `matches-grid`      | Responsive CSS Grid; `auto-fill` with `minmax(260px, 1fr)`  |
| `match-card`        | Individual card with hover lift (`translateY(-5px)`)         |
| `filter-tag`        | Pill-shaped toggle button; gains `active` class when selected |
| `connect-btn`       | Transparent bordered button with violet hover background     |

**Breakpoints:**

| Breakpoint          | Behavior                                              |
|---------------------|-------------------------------------------------------|
| `max-width: 768px`  | `matches-grid` collapses to a single-column layout    |

---

## Dependencies

### Runtime Dependencies

| Package          | Version  | Purpose                                     |
|------------------|----------|---------------------------------------------|
| react            | ^19.2.0  | Core UI library                             |
| react-dom        | ^19.2.0  | React DOM renderer                          |
| react-router-dom | ^7.13.1  | Client-side routing                         |
| lucide-react     | ^0.577.0 | SVG icon set (imported but available for use) |

### Development Dependencies

| Package                     | Version  | Purpose                               |
|-----------------------------|----------|---------------------------------------|
| vite                        | ^7.3.1   | Build tool and development server     |
| @vitejs/plugin-react        | ^5.1.1   | Vite plugin for React and JSX support |
| eslint                      | ^9.39.1  | JavaScript/JSX linter                 |
| eslint-plugin-react-hooks   | ^7.0.1   | Lint rules for React hook usage       |
| eslint-plugin-react-refresh | ^0.4.24  | Fast Refresh compatibility checks     |

---

## Build and Production

To generate a production-optimized build:

```bash
npm run build
```

Output is written to the `dist/` directory. This directory can be served by any static hosting provider (Netlify, Vercel, GitHub Pages, etc.) or served through Nginx, Apache, or a similar web server.
