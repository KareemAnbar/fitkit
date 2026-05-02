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
npm install
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
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:4000
```

Run frontend:

```bash
npm run dev
```

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

## 📸 Screens (optional)

> Add screenshots here later (Dashboard, Exercises, Charts, etc.)

---

## 🌍 Deployment

* **Frontend:** Vercel (https://fitkit-ja7asaqs8-kareemanbars-projects.vercel.app)
* **Backend:** Render
* **Database:** Supabase

---

## 🛠️ Future Improvements

* Exercise creation & customization
* Body metrics tracking (weight, body fat)
* Workout plans / routines
* Social features (share progress)
* Dark mode

---

## 👤 Author

**Kareem Anbar**

---

## 📄 License

This project is licensed under the MIT License.
