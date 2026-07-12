# API Documentation

## Base URL
`/api`

## Authentication

### `POST /api/auth/register`
Register a new user.
- **Body**: `{ "username": "user", "email": "user@example.com", "password": "password", "role": ["mod", "user"] }`
- **Response**: Success Message

### `POST /api/auth/login`
Authenticate and receive JWT.
- **Body**: `{ "username": "user", "password": "password" }`
- **Response**: JWT Token & User Details

## Protected Endpoints (Requires `Authorization: Bearer <token>`)

### `GET /api/test/user`
Access user-level data.

### `GET /api/test/mod`
Access moderator-level data. (Requires `ROLE_TRAINER`)

### `GET /api/test/admin`
Access admin-level data. (Requires `ROLE_ADMIN`)
