import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import "./LoginPage.css"; // Import CSS for styling

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAgent, setIsAgent] = useState(false); // State to toggle between agent and project login
  const navigate = useNavigate(); // Navigation hook for redirecting after login

  const handleLogin = () => {
    // Project login logic
    if (!isAgent) {
      if (username === "project123" && password === "projectpassword") {
        localStorage.setItem("isProject", true);
        navigate("/project-home"); // Redirect to project dashboard
      } else {
        alert("Invalid project credentials");
      }
    }
    // Agent login logic
    else {
      if (username === "agent" && password === "agent123") {
        localStorage.setItem("isAgent", true);
        navigate("/admin-dashboard"); // Redirect to agent dashboard
      } else {
        alert("Invalid agent credentials");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isAgent ? "Agent Login" : "Project Login"}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="username">
              {isAgent ? "Email" : "Project Name"}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={isAgent ? "Enter Email " : "Enter Project Name"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me on this computer</label>
          </div>
          <button type="button" onClick={handleLogin} className="login-btn">
            Login
          </button>
        </form>

        {/* Toggle between project login and agent login */}
        <div className="toggle-login">
          <button
            className={`toggle-btn ${isAgent ? "" : "active"}`}
            onClick={() => setIsAgent(false)}
          >
            Project Login
          </button>
          <button
            className={`toggle-btn ${isAgent ? "active" : ""}`}
            onClick={() => setIsAgent(true)}
          >
            Agent Login
          </button>
        </div>

        <div className="links">
          {!isAgent ? (
            <span>
              Your <span>Don't Have a Project?</span>
              <a href="/create-project">Create One</a>
            </span>
          ) : null}
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
