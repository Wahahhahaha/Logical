# Logical backend

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

## Profile photos

`PUT /api/profile` accepts an optional `photo` field (a base64 `data:image/...` URL, max 2.5MB decoded). Send `photo: null` to remove the current photo. Files are written to `uploads/avatars/<userId>.<ext>` and served at `/uploads/avatars/...`; the path is stored in `users.photo_url` (migration `004_profile_photo.sql`).

`PUT /api/profile` is partial: send only the fields you want to change (`fullName`, `language`, `photo`), so the language toggle in the navbar does not overwrite other profile data.

`PUT /api/profile/password` changes the password. Body: `{ "currentPassword": "...", "newPassword": "..." }` (new password, minimum 4 characters). The current password is verified with bcrypt before the hash is replaced.

## Quests

`GET /api/student/activities` returns `{ completedLessons, todayLessonKeys, lessonsToday, checkedInToday }` from `student_activities`.

`POST /api/student/activity/complete` records the lesson + daily check-in and also awards EXP for any daily quest completed by that activity in the same transaction (stored as `activity_type = 'quest'`, `activity_key = '<questId>:<YYYY-MM-DD>'`, deduped once per quest per day). Response includes `questAwarded` and `questsCompleted`. Quest definitions live in `src/quests.js` and mirror `frontend/src/lib/quests.js`; the `quest` activity type is added by migration `005_quest_activities.sql` (also self-healed on startup by `ensureQuestActivityType`).
