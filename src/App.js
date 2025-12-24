import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Profile from './pages/profile';
import Home from './pages/home';
import Setting from './pages/settings';
import Report from './pages/reports';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="App">
        <div className="mobile-header">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <span className="mobile-title">Dashboard</span>

          <div className="user-menu-mobile">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="user-avatar-mobile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <span
              className="user-name-mobile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              John Doe
            </span>

            {isDropdownOpen && (
              <div className="dropdown-mobile">
                <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>View Profile</Link>
                <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                <button onClick={() => { setIsDropdownOpen(false); alert('Logout'); }}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <h2>Dashboard</h2>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/reports">Reports</Link>
        </div>

        {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

        <div className="main">
          <div className="header desktop-header">
            <span>Welcome, User!</span>

            <div className="user-menu">
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="user-avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <span className="user-name" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                John Doe
              </span>

              {isDropdownOpen && (
                <div className="dropdown">
                  <Link to="/profile">View Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={() => alert('Logout')}>Logout</button>
                </div>
              )}
            </div>
          </div>

          <div className="content">
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/reports" element={<Report />} />
              <Route
                path="*"
                element={
                  <>
                    <h3>Main Content Area</h3>
                    <p>This is where your dashboard widgets or data will appear.</p>
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;