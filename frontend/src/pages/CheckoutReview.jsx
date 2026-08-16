import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

import "./CheckoutReview.css";


function CheckoutReview() {

  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
  } = useCart();


  const [customer, setCustomer] = useState(null);
  
  const {
    customer: loggedInCustomer,
    isLoggedIn,
  } = useCustomerAuth();


  // =========================================================
  // LOAD CUSTOMER INFORMATION
  // =========================================================

  useEffect(() => {

    const storedCustomer =
      sessionStorage.getItem(
        "sriLaxmiCheckoutCustomer"
      );


    if (!storedCustomer) {

      navigate("/checkout");

      return;
    }


    try {

      const parsedCustomer =
        JSON.parse(storedCustomer);

      setCustomer(parsedCustomer);

    } catch (error) {

      console.error(
        "Unable to load customer information:",
        error
      );

      navigate("/checkout");
    }

  }, [navigate]);


  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartItems.length === 0) {

    return (

      <section className="checkout-review-empty">

        <div className="checkout-review-empty-icon">
          <i className="bi bi-bag-x"></i>
        </div>

        <h1>
          Your Cart Is Empty
        </h1>

        <p>
          Add products before reviewing your order.
        </p>

        <Link to="/mobiles">
          CONTINUE SHOPPING
        </Link>

      </section>

    );
  }


  // =========================================================
  // WAIT FOR CUSTOMER DATA
  // =========================================================

  if (!customer) {
    return null;
  }


  // =========================================================
  // PLACE ORDER - TEMPORARY
  // =========================================================

  async function handlePlaceOrder() {
    if (!isLoggedIn || !loggedInCustomer) {

      alert(
        "Please login before placing an order."
      );

      navigate("/login");

      return;
    }


    if (!loggedInCustomer.id) {

      alert(
        "Customer information is unavailable. Please login again."
      );

      navigate("/login");

      return;
    }

    try {

      const orderData = {
        customerId: loggedInCustomer.id,
        customerName: customer.name,
        mobile: customer.mobile,
        address: customer.address,
        notes: customer.notes || "",
        deliveryCharge: 0,

        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        })),
      };


      const response = await fetch(
        "http://localhost:8081/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to place order."
        );
      }


      const savedOrder =
        await response.json();


      console.log(
        "Order created successfully:",
        savedOrder
      );


      sessionStorage.setItem(
        "sriLaxmiLastOrder",
        JSON.stringify(savedOrder)
      );


      navigate(
        `/order-success/${savedOrder.id}`
      );

    } catch (error) {

      console.error(
        "Order placement failed:",
        error
      );


      alert(
        "Unable to place your order. Please try again."
      );
    }
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="checkout-review-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="checkout-review-header">

        <div className="checkout-review-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Review Your Order
          </h1>

          <span>
            Check your details before placing the order
          </span>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="checkout-review-content">

        <div className="checkout-review-layout">


          {/* =================================================
              LEFT SECTION
          ================================================= */}

          <div className="checkout-review-main">


            {/* CUSTOMER INFORMATION */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-person-fill"></i>

                  <h2>
                    CUSTOMER INFORMATION
                  </h2>

                </div>


                <Link
                  to="/checkout"
                  className="review-edit-button"
                >
                  EDIT
                </Link>

              </div>


              <div className="review-customer-details">

                <div className="review-detail">

                  <span>
                    NAME
                  </span>

                  <strong>
                    {customer.name}
                  </strong>

                </div>


                <div className="review-detail">

                  <span>
                    MOBILE
                  </span>

                  <strong>
                    {customer.mobile}
                  </strong>

                </div>


                <div className="review-detail review-detail-full">

                  <span>
                    DELIVERY ADDRESS
                  </span>

                  <strong>
                    {customer.address}
                  </strong>

                </div>


                {customer.notes && (

                  <div className="review-detail review-detail-full">

                    <span>
                      ADDITIONAL NOTES
                    </span>

                    <strong>
                      {customer.notes}
                    </strong>

                  </div>

                )}

              </div>

            </section>


            {/* ORDER ITEMS */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-bag-fill"></i>

                  <h2>
                    ORDER ITEMS
                  </h2>

                </div>

                <span className="review-item-count">
                  {cartCount} item
                  {cartCount !== 1 ? "s" : ""}
                </span>

              </div>


              <div className="review-products">

                {cartItems.map((item) => (

                  <article
                    className="review-product"
                    key={item.id}
                  >


                    {/* IMAGE */}

                    <div className="review-product-image">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      ) : (

                        <i className="bi bi-phone"></i>

                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="review-product-details">

                      <span>
                        {item.brand}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹{item.price.toLocaleString("en-IN")}
                        {" "}×{" "}
                        {item.quantity}
                      </p>

                    </div>


                    {/* TOTAL */}

                    <strong className="review-product-total">

                      ₹{(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}

                    </strong>

                  </article>

                ))}

              </div>

            </section>


            {/* DELIVERY */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-geo-alt-fill"></i>

                  <h2>
                    DELIVERY
                  </h2>

                </div>

              </div>


              <div className="review-delivery">

                <div className="review-delivery-icon">

                  <i className="bi bi-truck"></i>

                </div>


                <div>

                  <strong>
                    Local Delivery
                  </strong>

                  <p>
                    Delivery available within
                    Chincholli local area /
                    up to 5 km from the shop.
                  </p>

                </div>


                <strong className="review-delivery-free">
                  FREE
                </strong>

              </div>

            </section>


            {/* ACTIONS */}

            <div className="review-actions">

              <Link
                to="/cart"
                className="review-back-button"
              >
                <i className="bi bi-arrow-left"></i>

                BACK TO CART
              </Link>


              <button
                type="button"
                className="review-place-order-button"
                onClick={handlePlaceOrder}
              >
                PLACE ORDER

                <i className="bi bi-check-lg"></i>

              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="review-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            <div className="review-summary-row">

              <span>
                Products
              </span>

              <strong>
                {cartCount}
              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Delivery
              </span>

              <strong className="review-summary-free">
                FREE
              </strong>

            </div>


            <div className="review-summary-divider"></div>


            <div className="review-total-row">

              <span>
                TOTAL
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="review-summary-note">

              <i className="bi bi-shield-check"></i>

              <span>
                Please verify your customer
                information and order items
                before placing the order.
              </span>

            </div>

          </aside>

        </div>

      </section>

    </div>

  );
}


export default CheckoutReview;