import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuthContext";

import "./AdminLogin.css";


function AdminLogin() {

  const navigate = useNavigate();

  const { login } = useAdminAuth();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  function handleSubmit(event) {

    event.preventDefault();

    setError("");


    const success =
      login(username, password);


    if (success) {

      navigate("/admin");

      return;
    }


    setError(
      "Invalid username or password."
    );
  }


  return (

    <section className="admin-login-page">

      <div className="admin-login-card">

        {/* ICON */}

        <div className="admin-login-icon">

          <i className="bi bi-shield-lock-fill"></i>

        </div>


        <p className="admin-login-brand">
          SRI LAXMI MOBILES
        </p>


        <h1>
          Admin Login
        </h1>


        <p className="admin-login-description">
          Sign in to manage products and orders.
        </p>


        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >

          {/* USERNAME */}

          <div className="admin-login-field">

            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Enter username"
              autoComplete="username"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="admin-login-field">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />

          </div>


          {/* ERROR */}

          {error && (

            <div className="admin-login-error">

              <i className="bi bi-exclamation-circle"></i>

              {error}

            </div>

          )}


          {/* LOGIN */}

          <button
            type="submit"
            className="admin-login-button"
          >

            <i className="bi bi-box-arrow-in-right"></i>

            LOGIN

          </button>

        </form>


        {/* STORE */}

        <button
          type="button"
          className="admin-login-back"
          onClick={() =>
            navigate("/")
          }
        >

          <i className="bi bi-arrow-left"></i>

          BACK TO STORE

        </button>

      </div>

    </section>

  );
}


export default AdminLogin;