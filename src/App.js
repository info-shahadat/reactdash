import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./App.css";

import Profile from "./pages/profile";
import Home from "./pages/home";
import Setting from "./pages/settings";
import Report from "./pages/reports";
import User from "./pages/users";

function InnerApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/reports")) {
      setIsReportsOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="App">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span className="mobile-title">Dashboard</span>

        <div className="user-menu-mobile" ref={mobileDropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="user-avatar-mobile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <span className="user-name-mobile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            John Abraham
          </span>

          {isDropdownOpen && (
            <div className="dropdown-mobile">
              <NavLink to="/profile" onClick={() => setIsDropdownOpen(false)}>View Profile</NavLink>
              <NavLink to="/settings" onClick={() => setIsDropdownOpen(false)}>Settings</NavLink>
              <button onClick={() => { setIsDropdownOpen(false); alert("Logout"); }}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/img/logo.png" alt="Company Logo" className="company-logo" />
        </div>

        <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
          <i className="bi bi-house-door"></i><span>Home</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
          <i className="bi bi-person-circle"></i><span>Profile</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
          <i className="bi bi-gear"></i><span>Settings</span>
        </NavLink>

        {/* Reports */}
        <div className="sidebar-menu">
          <div className="sidebar-link" onClick={() => setIsReportsOpen(!isReportsOpen)}>
            <i className="bi bi-bar-chart-line"></i>
            <span>Reports</span>
            <i className={`bi bi-chevron-${isReportsOpen ? "up" : "down"} submenu-arrow`}></i>
          </div>

          {isReportsOpen && (
            <div className="submenu">
              <NavLink to="/reports/sell" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="bi bi-currency-dollar"></i><span>Sell Report</span>
              </NavLink>

              <NavLink to="/reports/activity" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="bi bi-activity"></i><span>Activity Report</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
          <i className="bi bi-people"></i><span>User List</span>
        </NavLink>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="main">
        <div className="header desktop-header">
          <span>Welcome, User!</span>

          <div className="user-menu" ref={desktopDropdownRef}>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="user-avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <span className="user-name" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              John Abraham
            </span>

            {isDropdownOpen && (
              <div className="dropdown">
                <NavLink to="/profile">View Profile</NavLink>
                <NavLink to="/settings">Settings</NavLink>
                <button onClick={() => alert("Logout")}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="content">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Setting />} />
            {/* <Route path="/reports/*" element={<Report />} /> */}
            <Route path="/reports/sell" element={<Report />} />
            <Route path="/reports/activity" element={<Report />} />
            <Route path="/users" element={<User />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}