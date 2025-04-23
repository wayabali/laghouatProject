import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginPage.css"; //

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://project-management-app-bvjs.onrender.com/accounts/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.user_type === "admin") {
          navigate("/admin-dashboard");
        } else {
          alert("Invalid user type for this login");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Agent Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Email"
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

        <div className="links">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
