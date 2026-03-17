# This project aims to develop a simple CRUD web application.

## Functionalities:

- Registration page
- Login page
- User page
- User data redefinition
- Users management

## Technologies used

### Frontend

- TypeScript
- React
- Next.js
- Tailwind

### Backend

- Docker Compose
- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Express.js (for Sessions)

## Running The Full Stack With Docker Compose

### Services

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432

### Start The Stack

Run this from the repository root:

```bash
docker compose up --build
```

If one of the default host ports is already in use, override it when starting the stack. Example with the backend published on port 3002:

```bash
BACKEND_PORT=3002 docker compose up --build
```

### Environment Notes

- The backend uses `DATABASE_HOST=postgres` inside Docker Compose, so it connects to the database container through the Compose network instead of `localhost`.
- The backend CORS origin is controlled with `FRONTEND_ORIGIN`.
- The frontend uses two API URLs:
  - `NEXT_PUBLIC_API_URL` for browser requests.
  - `INTERNAL_API_URL` for server-side Next requests running inside the frontend container.

- !! Published host ports can be overridden with `FRONTEND_PORT`, `BACKEND_PORT`, and `POSTGRES_PORT` while the containers keep their internal ports unchanged.

### Stopping The Stack

```bash
docker compose down
```

To also remove the database volume:

```bash
docker compose down -v
```
