import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useCustomerAuth,
} from "../context/CustomerAuthContext";

import {
  toast,
} from "react-toastify";

import "./CustomerAuth.css";


function CustomerLogin() {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  const {
    login,
    loading,
  } = useCustomerAuth();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  async function handleSubmit(
    event
  ) {

    event.preventDefault();


    try {

      await login(
        email,
        password
      );


      toast.success(
        "Login successful."
      );


      const destination =
        location.state?.from ||
        "/";


      navigate(destination);

    } catch (error) {

      toast.error(
        error.message ||
        "Login failed."
      );
    }
  }


  return (

    <section className="customer-auth-page">

      <div className="customer-auth-card">

        <div className="customer-auth-icon">

          <i className="bi bi-person"></i>

        </div>


        <p className="customer-auth-brand">
          SRI LAXMI MOBILES
        </p>


        <h1>
          Customer Login
        </h1>


        <p className="customer-auth-subtitle">
          Login to manage your orders
          and account.
        </p>


        <form
          onSubmit={handleSubmit}
          className="customer-auth-form"
        >

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Enter your email"
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Enter your password"
            required
          />


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "LOGGING IN..."
              : "LOGIN"}

          </button>

        </form>


        <p className="customer-auth-switch">

          Don't have an account?

          {" "}

          <Link to="/register">
            CREATE ACCOUNT
          </Link>

        </p>


        <Link
          to="/"
          className="customer-auth-back"
        >

          <i className="bi bi-arrow-left"></i>

          BACK TO STORE

        </Link>

      </div>

    </section>

  );
}


export default CustomerLogin;