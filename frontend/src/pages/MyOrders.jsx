import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";

import "./MyOrders.css";


function MyOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const {
      customer,
      isLoggedIn,
    } = useCustomerAuth();

  // =========================
  // LOAD ORDERS
  // =========================

  async function loadOrders() {

    try {

      setLoading(true);
      setError("");


      // =========================
      // CUSTOMER LOGIN CHECK
      // =========================

      if (!isLoggedIn || !customer?.id) {

        setOrders([]);

        setError(
          "Please login to view your orders."
        );

        return;
      }


      // =========================
      // LOAD CUSTOMER ORDERS
      // =========================

      const response = await fetch(
        `https://sri-laxmi-mobiles-backend.onrender.com/api/orders/customer/${customer.id}`
      );


      if (!response.ok) { 

        throw new Error(
          "Unable to load orders."
        );
      }


      const data =
        await response.json();


      setOrders(
        Array.isArray(data)
          ? data
          : []
      );


    } catch (error) {

      console.error(
        "Unable to load orders:",
        error
      );


      setError(
        "Unable to load your orders."
      );


    } finally {

      setLoading(false);
    }
  }


    useEffect(() => {

      loadOrders();

    }, [customer, isLoggedIn]);


    // =========================
    // FORMAT DATE
    // =========================

    function formatDate(orderDate) {

      if (!orderDate) {
        return "-";
      }


      const date =
        new Date(orderDate);


      if (Number.isNaN(date.getTime())) {
        return "-";
      }


      return date.toLocaleString(
        "en-IN"
      );
    }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="my-orders-page">

        <div className="my-orders-loading">

          <i className="bi bi-arrow-repeat"></i>

          <p>
            Loading your orders...
          </p>

        </div>

      </section>

    );
  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <section className="my-orders-page">

        <div className="my-orders-error">

          <i className="bi bi-exclamation-circle"></i>

          <h2>
            Unable To Load Orders
          </h2>

          <p>
            {error}
          </p>


          <button
            type="button"
            onClick={loadOrders}
          >
            TRY AGAIN
          </button>

        </div>

      </section>

    );
  }


  // =========================
  // EMPTY
  // =========================

  if (orders.length === 0) {

    return (

      <section className="my-orders-page">

        <div className="my-orders-empty">

          <div className="my-orders-empty-icon">

            <i className="bi bi-receipt"></i>

          </div>


          <h1>
            No Orders Yet
          </h1>


          <p>
            Your orders will appear here
            after you place an order.
          </p>


          <Link to="/mobiles">
            START SHOPPING
          </Link>

        </div>

      </section>

    );
  }


  return (

    <section className="my-orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="my-orders-header">

        <div>

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            My Orders
          </h1>

          <span>
            {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </span>

        </div>


        <button
          type="button"
          className="my-orders-refresh"
          onClick={loadOrders}
        >

          <i className="bi bi-arrow-clockwise"></i>

          REFRESH

        </button>

      </div>


      {/* =========================
          ORDER LIST
      ========================= */}

      <div className="my-orders-list">

        {orders.map((order) => (

          <article
            className="my-order-card"
            key={order.id}
          >

            {/* ORDER HEADER */}

            <div className="my-order-card-header">

              <div>

                <span>
                  ORDER
                </span>

                <strong>
                  #{order.id}
                </strong>

              </div>


              <div className="my-order-date">

                <span>
                  DATE
                </span>

                <strong>
                  {formatDate(
                    order.orderDate
                  )}
                </strong>

              </div>

            </div>


            {/* ORDER INFORMATION */}

            <div className="my-order-card-content">

              <div className="my-order-info">

                <span>
                  CUSTOMER
                </span>

                <strong>
                  {order.customerName || "-"}
                </strong>

              </div>


              <div className="my-order-info">

                <span>
                  MOBILE
                </span>

                <strong>
                  {order.mobile || "-"}
                </strong>

              </div>


              <div className="my-order-info">

                <span>
                  ITEMS
                </span>

                <strong>
                  {order.items
                    ? order.items.length
                    : 0}
                </strong>

              </div>


              <div className="my-order-info">

                <span>
                  TOTAL
                </span>

                <strong className="my-order-total">

                  ₹{Number(
                    order.total || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </strong>

              </div>


              <div className="my-order-info">

                <span>
                  STATUS
                </span>

                <strong
                  className={
                    `my-order-status ` +
                    `my-status-${(
                      order.status ||
                      "PENDING"
                    ).toLowerCase()}`
                  }
                >

                  {(
                    order.status ||
                    "PENDING"
                  ).replaceAll(
                    "_",
                    " "
                  )}

                </strong>

              </div>

            </div>


            {/* ACTION */}

            <div className="my-order-card-footer">

              <Link
                to={`/my-orders/${order.id}`}
                className="my-order-view-button"
              >

                VIEW ORDER

                <i className="bi bi-arrow-right"></i>

              </Link>

            </div>

          </article>

        ))}

      </div>


      {/* CONTINUE SHOPPING */}

      <Link
        to="/mobiles"
        className="my-orders-shopping"
      >

        <i className="bi bi-arrow-left"></i>

        CONTINUE SHOPPING

      </Link>

    </section>

  );
}


export default MyOrders;