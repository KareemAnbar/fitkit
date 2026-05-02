# fitkit
# 💪 FitKit

FitKit is a full-stack fitness tracking app that helps users log workouts, track progress, and monitor personal records (PRs) across different muscle groups.

---

## 🚀 Features

* 🔐 Authentication (JWT-based login & register)
* 🏋️ Track workouts by exercise and muscle group
* 📊 Automatic Personal Record (PR) detection
* 📈 Progress charts (volume over time)
* 📝 Workout history with edit & delete support
* ⚡ Responsive UI with modern UX (cards, modals, charts)

---

## 🧱 Tech Stack

### Frontend

* React + TypeScript
* Axios
* Recharts (for charts)
* Lucide React (icons)
* CSS (custom styling)

### Backend

* Node.js + Express
* TypeScript
* Supabase (PostgreSQL + RPC functions)
* JWT Authentication
* Cookie-based auth

---

## 🗂️ Project Structure (Monorepo)

```
FitKit/
├── frontend/     # React app
├── backend/      # Express API
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/fitkit.git
cd fitkit
```

---

### 2. Backend Setup

```bash
cd backend
pnpm install
```

Create a `.env` file:

```
PORT=4000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
pnpm dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
pnpm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:4000
```

Run frontend:

```bash
pnpm dev
```
---
Screenshots:
- login page:
  <img width="1359" height="772" alt="Screenshot 2026-05-03 at 00 02 15" src="https://github.com/user-attachments/assets/0d2756ff-a029-4b50-b64a-a2dc0f1c5a7c" />

- Dashboard page:
<img width="1416" height="798" alt="Screenshot 2026-05-02 at 23 56 46" src="https://github.com/user-attachments/assets/fd833f9c-03b4-4553-8594-7ccd3ff33497" />

- Body page:
<img width="1395" height="779" alt="Screenshot 2026-05-03 at 00 00 56" src="https://github.com/user-attachments/assets/fafddc34-ba9e-4b12-ba23-bf269910cc1b" />

- Exercises page:
  <img width="1409" height="791" alt="Screenshot 2026-05-03 at 00 01 03" src="https://github.com/user-attachments/assets/7ade25dd-4c92-4f3f-811d-8de42eb60b3d" />

- Exercise Detail page:
<img width="1402" height="757" alt="Screenshot 2026-05-03 at 00 01 15" src="https://github.com/user-attachments/assets/b763635f-1d4e-4e2b-9a80-7046128447b7" />
---

## 🔌 API Overview

### Auth

* `POST /users/register`
* `POST /users/login`
* `POST /users/logout`

### Workout Entries

* `GET /workoutEntry/prs` → Get PRs grouped by muscle group
* `GET /workoutEntry/exercise/:id` → Get exercise history
* `POST /workoutEntry` → Add entry
* `PUT /workoutEntry/:id` → Update entry
* `DELETE /workoutEntry/:id` → Delete entry

---

## 🧠 PR Logic

PRs (Personal Records) are calculated dynamically using a Supabase RPC function:

* Select highest weight per exercise
* Group by muscle group
* Return structured JSON for frontend rendering

---

## 🌍 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Supabase

---

## 🛠️ Future Improvements

* Exercise creation & customization
* Calorie tracking (Enter caloric intake and create meals)
* Workout plans / routines
* Social features (share progress)
* Dark mode

---

## 👤 Author

**Kareem Anbar**

---

## 📄 License

This project is licensed under the MIT License.
