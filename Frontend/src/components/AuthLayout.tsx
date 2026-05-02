import { Dumbbell } from "lucide-react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="app-logo">
          <div className="logo-box">
            <Dumbbell size={23} />
          </div>
          <h1>Fit Kit</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
