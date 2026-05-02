import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="app">
      {/* Mobile Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Main */}
      <div className="main">
        {/* Top bar (mobile only) */}
        <div className="topbar">
          <button onClick={() => setIsOpen(true)} className="hamburger">
            ☰
          </button>
          <h3>Fit Kit</h3>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
