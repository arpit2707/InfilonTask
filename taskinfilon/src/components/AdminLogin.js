import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ username, password }));
    navigate("/home");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h2>Admin Login</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label className="mt-3">Username</label>
        <input
          className="mt-1"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-3">Password</label>
        <input
          className="mt-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary mt-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
