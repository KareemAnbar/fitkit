import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Dumbbell, User, LogOut } from "lucide-react";

interface Props {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: Props) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/auth/login");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">
          <Dumbbell size={18} />
        </div>
        <h2>Fit Kit</h2>
      </div>
      <NavLink to="/dashboard" className="nav-item" onClick={closeSidebar}>
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/body" className="nav-item" onClick={closeSidebar}>
        <User size={18} />
        <span>Body</span>
      </NavLink>

      <NavLink to="/exercises" className="nav-item" onClick={closeSidebar}>
        <Dumbbell size={18} />
        <span>Exercises</span>
      </NavLink>

      <button
        className="nav-item"
        style={{
          border: "2px solid #ff6b6b",
          background: "white",
          color: "#ff6b6b",
        }}
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
