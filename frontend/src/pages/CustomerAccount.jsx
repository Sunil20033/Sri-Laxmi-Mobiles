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

import "./CustomerAccount.css";


function CustomerAccount() {

  const navigate =
    useNavigate();


  const {
    customer,
    isLoggedIn,
    logout,
  } = useCustomerAuth();


  if (!isLoggedIn || !customer) {

    return (
      <section className="customer-account-page">

        <div className="customer-account-card">

          <i className="bi bi-person-circle"></i>

          <h1>
            Please Login
          </h1>

          <p>
            Login to view your account.
          </p>

          <Link to="/login">
            LOGIN
          </Link>

        </div>

      </section>
    );
  }


  function handleLogout() {

    logout();

    toast.success(
      "You have been logged out."
    );

    navigate("/");
  }


  return (

    <section className="customer-account-page">

      <div className="customer-account-card">

        <div className="customer-account-icon">

          <i className="bi bi-person"></i>

        </div>


        <p className="customer-account-brand">
          SRI LAXMI MOBILES
        </p>


        <h1>
          My Account
        </h1>


        <p className="customer-account-welcome">
          Welcome, {customer.name}
        </p>


        <div className="customer-account-details">

          <div className="customer-account-row">

            <span>
              NAME
            </span>

            <strong>
              {customer.name}
            </strong>

          </div>


          <div className="customer-account-row">

            <span>
              MOBILE
            </span>

            <strong>
              {customer.mobile}
            </strong>

          </div>


          <div className="customer-account-row">

            <span>
              EMAIL
            </span>

            <strong>
              {customer.email}
            </strong>

          </div>

        </div>


        <div className="customer-account-actions">

          <Link
            to="/my-orders"
            className="customer-account-orders"
          >
            <i className="bi bi-receipt"></i>

            MY ORDERS
          </Link>


          <button
            type="button"
            className="customer-account-logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>

            LOGOUT
          </button>

        </div>

      </div>

    </section>

  );
}


export default CustomerAccount;