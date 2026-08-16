import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useCustomerAuth,
} from "../context/CustomerAuthContext";

import {
  toast,
} from "react-toastify";

import "./CustomerAuth.css";


function CustomerRegister() {

  const navigate =
    useNavigate();


  const {
    register,
    loading,
  } = useCustomerAuth();


  const [formData, setFormData] =
    useState({
      name: "",
      mobile: "",
      email: "",
      password: "",
    });


  function handleChange(
    event
  ) {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  }


  async function handleSubmit(
    event
  ) {

    event.preventDefault();


    try {

      await register(
        formData.name,
        formData.mobile,
        formData.email,
        formData.password
      );


      toast.success(
        "Account created successfully. Please login."
      );


      navigate("/login");

    } catch (error) {

      toast.error(
        error.message ||
        "Registration failed."
      );
    }
  }


  return (

    <section className="customer-auth-page">

      <div className="customer-auth-card">

        <div className="customer-auth-icon">

          <i className="bi bi-person-plus"></i>

        </div>


        <p className="customer-auth-brand">
          SRI LAXMI MOBILES
        </p>


        <h1>
          Create Account
        </h1>


        <p className="customer-auth-subtitle">
          Create your customer account.
        </p>


        <form
          onSubmit={handleSubmit}
          className="customer-auth-form"
        >

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />


          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />


          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            minLength={6}
            required
          />


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "CREATING ACCOUNT..."
              : "CREATE ACCOUNT"}

          </button>

        </form>


        <p className="customer-auth-switch">

          Already have an account?

          {" "}

          <Link to="/login">
            LOGIN
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


export default CustomerRegister;