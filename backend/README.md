# Mathpath backend

## Database setup

1. Create a MySQL 8 database named `mathpath`.
2. Copy `.env.example` to `.env`.
3. Set the MySQL connection values and a long random `JWT_SECRET`.
4. Run the schema migration and development seed:

```powershell
npm run migrate
npm run seed
```

The seed creates these development accounts:

- Teacher: `teacher.demo` / `teacher123`
- Students: `STU-001`, `STU-002`, `STU-003` / `student123`

## Run the API

```powershell
npm run dev
```

The API owns authentication, authorization, profile updates, student CRUD, level lookup, and database-backed session data. Student delete is implemented as deactivation so academic history is not removed.
