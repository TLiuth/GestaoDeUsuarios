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

## Backend Structure

I followed NestJS usual patterns as best as I could, implementing:

### User component

- User entity: to model the user objects that TypeORM would use to create the db
- UserController: to deal with routes
- UserServices: user related services
- UserModule: to manage NodeJS modules structure (imports, controllers, providers, exports)
- DTOs: to model Data Transfer Objects, that allow to defined more rigid rules for objects transference over the routes and to validate the data.

### Auth component

- All the files to deal with sessions, authentication and authorization

## Frontend Structure

### Pages and components

- Reusable templates that can go inside other structures are defined on components/templates
- The folders under "/app" define the accessing routes for the pages

### Hooks

- Custom hooks to deal with data input, handling and submission
- Custom hooks to receive the response from the backend and parse it as needed (success responde, error fields, ...)

### Services

- Complementary utility services that can be reused.
