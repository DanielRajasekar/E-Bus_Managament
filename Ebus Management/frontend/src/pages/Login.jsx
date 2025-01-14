import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { setUser  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(URL + "/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, role })
      });

      // Check if the response is OK
      if (!res.ok) {
        const errorData = await res.json(); // Get error details
        setError(errorData.message || "Login failed.");
        return;
      }

      const data = await res.json(); // Parse the response data
      localStorage.setItem('token', data.token); // Store the token

      setUser (data);
      setEmail("");
      setPassword("");
      setRole("");

      // Check if the returned data matches the input
      if (data.email === email && data.role === role) {
        console.log("Login successful:", data);

        // Navigate based on role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate(`/user`);
        }
        else if (role === "driver"){
            navigate("/driver");
        }
      } else {
        setError("Login failed: Username or role does not match.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container mt-5" style={{width:"700px"}}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email ID:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter your Email ID"
          required
          autoComplete="email" // Added autocomplete attribute
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter your password"
          required
          autoComplete="current-password" // Added autocomplete attribute
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
          required
          autoComplete="off" // Optionally, you can set this to off for select fields
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="driver">Driver/Travels</option>
          <option value="user">User </option>
          
        </select>
      </div>

      <button onClick={handleLogin} className="btn btn-primary mt-3">
        Login
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}
      <h3 className="mt-3">
            <Link to="/register" className="d-block mt-3">
                Don't have an account? Sign up
            </Link>
       </h3>
      
    </div>
  );
};

export default Login;