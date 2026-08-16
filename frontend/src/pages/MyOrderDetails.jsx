import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCustomerAuth } from "../context/CustomerAuthContext";

import "./MyOrderDetails.css";


function MyOrderDetails() {

  const { id } = useParams();


  const {
    customer,
    isLoggedIn,
  } = useCustomerAuth();


  const [order, setOrder] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  // =========================
  // LOAD ORDER
  // =========================

  async function loadOrder() {

    try {

      setLoading(true);
      setError("");


      // =========================
      // LOGIN CHECK
      // =========================

      if (!isLoggedIn || !customer?.id) {

        throw new Error(
          "Please login to view this order."
        );
      }


      // =========================
      // CUSTOMER-SPECIFIC ORDER
      // =========================

      const response = await fetch(
        `http://localhost:8081/api/orders/customer/${customer.id}/${id}`
      );


      if (!response.ok) {

        if (response.status === 404) {

          throw new Error(
            "Order not found."
          );
        }


        throw new Error(
          "Unable to load order."
        );
      }


      const data =
        await response.json();


      setOrder(data);


    } catch (error) {

      console.error(
        "Unable to load order:",
        error
      );


      setError(
        error.message ||
        "Unable to load order."
      );


    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    loadOrder();

  }, [id, customer, isLoggedIn]);


  // =========================
  // DATE
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
  // STATUS
  // =========================

  const status =
    order?.status || "PENDING";


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="my-order-details-page">

        <div className="my-order-details-loading">

          <i className="bi bi-arrow-repeat"></i>

          <p>
            Loading order details...
          </p>

        </div>

      </section>

    );
  }


  // =========================
  // ERROR
  // =========================

  if (error || !order) {

    return (

      <section className="my-order-details-page">

        <div className="my-order-details-error">

          <div className="my-order-details-error-icon">

            <i className="bi bi-receipt"></i>

          </div>


          <h1>
            Order Not Found
          </h1>


          <p>
            {error ||
              "The order you are looking for is not available."}
          </p>


          <Link to="/my-orders">
            BACK TO MY ORDERS
          </Link>

        </div>

      </section>

    );
  }


  return (

    <section className="my-order-details-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="my-order-details-header">

        <div>

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            Order #{order.id}
          </h1>

          <span>
            Placed on {formatDate(
              order.orderDate
            )}
          </span>

        </div>


        <div
          className={
            `my-order-details-status ` +
            `my-details-status-${status.toLowerCase()}`
          }
        >

          {status.replaceAll(
            "_",
            " "
          )}

        </div>

      </div>


      {/* =========================
          ORDER STATUS TRACKER
      ========================= */}

      <div className="my-order-status-card">

        <div className="my-order-status-card-header">

          <div>

            <p>
              ORDER STATUS
            </p>

            <h2>
              Track Your Order
            </h2>

          </div>

          <i className="bi bi-truck"></i>

        </div>


        {status === "CANCELLED" ? (

          <div className="my-order-cancelled-status">

            <div className="my-order-status-step-icon">

              <i className="bi bi-x-lg"></i>

            </div>

            <div>

              <strong>
                Order Cancelled
              </strong>

              <span>
                This order has been cancelled.
              </span>

            </div>

          </div>

        ) : (

          <div className="my-order-status-tracker">

            {[
              "PENDING",
              "CONFIRMED",
              "PROCESSING",
              "OUT_FOR_DELIVERY",
              "DELIVERED",
            ].map((step, index) => {

              const statusOrder = [
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
              ];


              const currentIndex =
                statusOrder.indexOf(status);


              const stepIndex =
                statusOrder.indexOf(step);


              const isCompleted =
                stepIndex <= currentIndex;


              const isCurrent =
                step === status;


              return (

                <div
                  className={
                    `my-order-status-step ` +
                    `${isCompleted ? "completed" : ""} ` +
                    `${isCurrent ? "current" : ""}`
                  }
                  key={step}
                >

                  <div className="my-order-status-line">

                    {index > 0 && (

                      <span
                        className={
                          stepIndex <= currentIndex
                            ? "status-line-active"
                            : ""
                        }
                      ></span>

                    )}

                  </div>


                  <div className="my-order-status-step-icon">

                    {isCompleted ? (

                      <i className="bi bi-check-lg"></i>

                    ) : (

                      <i className="bi bi-circle"></i>

                    )}

                  </div>


                  <div className="my-order-status-step-text">

                    <strong>
                      {step.replaceAll(
                        "_",
                        " "
                      )}
                    </strong>


                    {isCurrent && (

                      <span>
                        Current Status
                      </span>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>


      {/* =========================
          ORDER CONTENT
      ========================= */}

      <div className="my-order-details-layout">


        {/* LEFT */}

        <div className="my-order-details-main">


          {/* CUSTOMER */}

          <div className="my-order-details-card">

            <div className="my-order-details-card-title">

              <i className="bi bi-person-fill"></i>

              <h2>
                CUSTOMER DETAILS
              </h2>

            </div>


            <div className="my-order-customer-grid">

              <div>

                <span>
                  NAME
                </span>

                <strong>
                  {order.customerName || "-"}
                </strong>

              </div>


              <div>

                <span>
                  MOBILE
                </span>

                <strong>
                  {order.mobile || "-"}
                </strong>

              </div>


              <div className="my-order-address">

                <span>
                  ADDRESS
                </span>

                <strong>
                  {order.address || "-"}
                </strong>

              </div>


              {order.notes && (

                <div className="my-order-address">

                  <span>
                    NOTES
                  </span>

                  <strong>
                    {order.notes}
                  </strong>

                </div>

              )}

            </div>

          </div>


          {/* PRODUCTS */}

          <div className="my-order-details-card">

            <div className="my-order-details-card-title">

              <i className="bi bi-bag-fill"></i>

              <h2>
                ORDER ITEMS
              </h2>

            </div>


            <div className="my-order-items">

              {order.items?.map(
                (item) => (

                  <div
                    className="my-order-item"
                    key={item.id}
                  >

                    <div className="my-order-item-info">

                      <div className="my-order-item-icon">

                        <i className="bi bi-phone"></i>

                      </div>


                      <div>

                        <strong>
                          {item.productName}
                        </strong>

                        <span>
                          {item.brand || ""}
                        </span>

                        <small>
                          ₹{Number(
                            item.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )} ×{" "}
                          {item.quantity}
                        </small>

                      </div>

                    </div>


                    <strong className="my-order-item-total">

                      ₹{Number(
                        item.total || 0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </strong>

                  </div>

                )
              )}

            </div>

          </div>


          {/* DELIVERY */}

          <div className="my-order-details-card">

            <div className="my-order-details-card-title">

              <i className="bi bi-truck"></i>

              <h2>
                DELIVERY INFORMATION
              </h2>

            </div>


            <div className="my-order-delivery">

              <i className="bi bi-geo-alt-fill"></i>

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

            </div>

          </div>


        </div>


        {/* RIGHT */}

        <aside className="my-order-details-summary">

          <h2>
            ORDER SUMMARY
          </h2>


          <div className="my-order-summary-row">

            <span>
              Products
            </span>

            <strong>
              {order.items?.reduce(
                (total, item) =>
                  total +
                  Number(item.quantity || 0),
                0
              )}
            </strong>

          </div>


          <div className="my-order-summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{Number(
                order.subtotal || 0
              ).toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="my-order-summary-row">

            <span>
              Delivery
            </span>

            <strong>
              ₹{Number(
                order.deliveryCharge || 0
              ).toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="my-order-summary-divider"></div>


          <div className="my-order-summary-total">

            <span>
              TOTAL
            </span>

            <strong>
              ₹{Number(
                order.total || 0
              ).toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <Link
            to="/my-orders"
            className="my-order-summary-back"
          >

            <i className="bi bi-arrow-left"></i>

            BACK TO MY ORDERS

          </Link>

        </aside>


      </div>

    </section>

  );
}


export default MyOrderDetails;