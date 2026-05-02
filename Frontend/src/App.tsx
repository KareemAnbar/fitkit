import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/MainLayout";
import { AuthLayout } from "./components/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ExerciseDetail from "./pages/ExerciseDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<ExerciseDetail />} />
          <Route path="body" element={<Body />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
