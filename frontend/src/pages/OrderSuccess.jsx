import { Link } from "react-router-dom";

import "./OrderSuccess.css";


function OrderSuccess() {

  const storedOrder =
    sessionStorage.getItem(
      "sriLaxmiLastOrder"
    );


  let order = null;


  try {

    if (storedOrder) {

      order = JSON.parse(
        storedOrder
      );

    }

  } catch (error) {

    console.error(
      "Unable to load order:",
      error
    );

  }


  return (

    <div className="order-success-page">

      <section className="order-success-card">

        <div className="order-success-icon">

          <i className="bi bi-check-lg"></i>

        </div>


        <p className="order-success-brand">
          Sri Laxmi Mobiles
        </p>


        <h1>
          Order Placed Successfully!
        </h1>


        <p className="order-success-message">

          Thank you for your order.
          We will contact you shortly
          to confirm your order.

        </p>


        {order && (

          <div className="order-success-details">

            <div>

              <span>
                ORDER ID
              </span>

              <strong>
                #{order.id}
              </strong>

            </div>


            <div>

              <span>
                TOTAL
              </span>

              <strong>
                ₹{Number(order.total).toLocaleString("en-IN")}
              </strong>

            </div>


            <div>

              <span>
                STATUS
              </span>

              <strong>
                {order.status}
              </strong>
            </div>

          </div>

        )}


        <div className="order-success-actions">

          <Link
            to="/mobiles"
            className="order-success-shopping"
          >
            CONTINUE SHOPPING
          </Link>


          <Link
            to="/"
            className="order-success-home"
          >
            BACK TO HOME
          </Link>

        </div>

      </section>

    </div>

  );
}


export default OrderSuccess;