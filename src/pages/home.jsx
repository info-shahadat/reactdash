import './home.css';

function Home() {
  return (
    <div className="profile-page">
      <div className="welcome-container">
        <h1 className="text-white">
          <b>Welcome to the App Admin Portal!</b>
        </h1>
        <p>Manage your platform effectively with our easy-to-use interface.</p>
        <div className="icon-grid">
          <div className="icon-box">
            <i className="bi bi-people" />
            <span>Manage Users</span>
          </div>
          <div className="icon-box">
            <i className="bi bi-graph-up" />
            <span>View Analytics</span>
          </div>
          <div className="icon-box">
            <i className="bi bi-person-badge" />
            <span>Manage Clients</span>
          </div>
          <div className="icon-box">
            <i className="bi bi-file-earmark-text" />
            <span>Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;