import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    notes: "",
  });


  // =========================
  // HANDLE FORM CHANGE
  // =========================

  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }


  // =========================
  // SUBMIT FORM
  // =========================

  function handleSubmit(event) {

    event.preventDefault();


    if (!formData.name.trim()) {

      alert("Please enter your name.");

      return;
    }


    if (!formData.mobile.trim()) {

      alert("Please enter your mobile number.");

      return;
    }


    if (!/^[0-9]{10}$/.test(
      formData.mobile.trim()
    )) {

      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }


    if (!formData.address.trim()) {

      alert(
        "Please enter your delivery address."
      );

      return;
    }


    // Temporarily save customer information
    // for the next checkout step.

    sessionStorage.setItem(
      "sriLaxmiCheckoutCustomer",
      JSON.stringify(formData)
    );


    navigate("/checkout/review");
  }


  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {

    return (

      <section className="checkout-empty">

        <div className="checkout-empty-icon">
          <i className="bi bi-bag-x"></i>
        </div>

        <h1>
          Your Cart Is Empty
        </h1>

        <p>
          Add products to your cart before
          proceeding to checkout.
        </p>

        <Link to="/mobiles">
          CONTINUE SHOPPING
        </Link>

      </section>

    );
  }


  return (

    <div className="checkout-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="checkout-header">

        <div className="checkout-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Customer Information
          </h1>

          <span>
            Complete your details to continue
          </span>

        </div>

      </section>


      {/* =========================
          CHECKOUT CONTENT
      ========================= */}

      <section className="checkout-content">

        <div className="checkout-layout">


          {/* =========================
              CUSTOMER FORM
          ========================= */}

          <div className="checkout-form-section">

            <div className="checkout-section-title">

              <i className="bi bi-person-fill"></i>

              <h2>
                CUSTOMER DETAILS
              </h2>

            </div>


            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >


              {/* NAME */}

              <div className="checkout-field">

                <label htmlFor="name">
                  Full Name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

              </div>


              {/* MOBILE */}

              <div className="checkout-field">

                <label htmlFor="mobile">
                  Mobile Number *
                </label>

                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  maxLength="10"
                />

              </div>


              {/* ADDRESS */}

              <div className="checkout-field">

                <label htmlFor="address">
                  Delivery Address *
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                ></textarea>

              </div>


              {/* NOTES */}

              <div className="checkout-field">

                <label htmlFor="notes">
                  Additional Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional instructions (optional)"
                  rows="3"
                ></textarea>

              </div>


              {/* ACTIONS */}

              <div className="checkout-form-actions">

                <Link
                  to="/cart"
                  className="checkout-back-button"
                >
                  <i className="bi bi-arrow-left"></i>
                  BACK TO CART
                </Link>


                <button
                  type="submit"
                  className="checkout-continue-button"
                >
                  CONTINUE TO REVIEW

                  <i className="bi bi-arrow-right"></i>
                </button>

              </div>

            </form>

          </div>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <aside className="checkout-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            <div className="checkout-summary-row">

              <span>
                Products
              </span>

              <strong>
                {cartCount}
              </strong>

            </div>


            <div className="checkout-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="checkout-summary-row">

              <span>
                Delivery
              </span>

              <strong className="checkout-free">
                FREE
              </strong>

            </div>


            <div className="checkout-summary-divider"></div>


            <div className="checkout-total-row">

              <span>
                TOTAL
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="checkout-local-delivery">

              <i className="bi bi-geo-alt-fill"></i>

              <span>
                Delivery available within
                Chincholli local area /
                up to 5 km from the shop.
              </span>

            </div>

          </aside>

        </div>

      </section>

    </div>

  );
}

export default Checkout;