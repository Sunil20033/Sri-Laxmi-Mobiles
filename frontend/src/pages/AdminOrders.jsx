import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const statuses = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ];


  // =========================
  // LOAD ORDERS
  // =========================

  async function loadOrders() {

    try {

      const response = await fetch(
        "https://sri-laxmi-mobiles-backend.onrender.com/api/orders"
      );


      if (!response.ok) {
        throw new Error("Unable to load orders.");
      }


      const data = await response.json();

      setOrders(data);

    } catch (error) {

      console.error(
        "Unable to load orders:",
        error
      );

      alert(
        "Unable to load orders."
      );

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {
    loadOrders();
  }, []);


  // =========================
  // UPDATE STATUS
  // =========================

  async function updateStatus(
    orderId,
    status
  ) {

    try {

      const response = await fetch(
        `https://sri-laxmi-mobiles-backend.onrender.com/api/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );


      if (!response.ok) {
        throw new Error(
          "Unable to update order status."
        );
      }


      const updatedOrder =
        await response.json();


      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === updatedOrder.id
            ? updatedOrder
            : order
        )
      );


      if (
        selectedOrder &&
        selectedOrder.id === updatedOrder.id
      ) {
        setSelectedOrder(
          updatedOrder
        );
      }


    } catch (error) {

      console.error(
        "Unable to update status:",
        error
      );

      alert(
        "Unable to update order status."
      );
    }
  }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <section className="admin-orders-page">

        <div className="admin-orders-loading">

          Loading orders...

        </div>

      </section>
    );
  }


  return (

    <section className="admin-orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-orders-header">

        <div>

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Order Management
          </h1>

          <span>
            {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </span>

        </div>


        <button
          type="button"
          className="admin-orders-refresh"
          onClick={loadOrders}
        >
          <i className="bi bi-arrow-clockwise"></i>

          REFRESH
        </button>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {orders.length === 0 ? (

        <div className="admin-orders-empty">

          <i className="bi bi-receipt"></i>

          <h2>
            No Orders Found
          </h2>

          <p>
            Customer orders will appear here.
          </p>

        </div>

      ) : (

        <div className="admin-orders-table-wrapper">

          <table className="admin-orders-table">

            <thead>

              <tr>

                <th>
                  ORDER
                </th>

                <th>
                  CUSTOMER
                </th>

                <th>
                  MOBILE
                </th>

                <th>
                  TOTAL
                </th>

                <th>
                  DATE
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td>

                    <strong>
                      #{order.id}
                    </strong>

                  </td>


                  <td>

                    <strong>
                      {order.customerName}
                    </strong>

                  </td>


                  <td>
                    {order.mobile}
                  </td>


                  <td>

                    <strong>
                      ₹{Number(
                        order.total || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </td>


                  <td>

                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleString(
                          "en-IN"
                        )
                      : "-"}

                  </td>


                  <td>

                    <select
                      value={
                        order.status || "PENDING"
                      }
                      onChange={(event) =>
                        updateStatus(
                          order.id,
                          event.target.value
                        )
                      }
                      className={
                        `admin-order-status ` +
                        `status-${(
                          order.status ||
                          "PENDING"
                        ).toLowerCase()}`
                      }
                    >

                      {statuses.map(
                        (status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status.replaceAll(
                              "_",
                              " "
                            )}
                          </option>

                        )
                      )}

                    </select>

                  </td>


                  <td>

                    <button
                      type="button"
                      className="admin-order-view"
                      onClick={() =>
                        setSelectedOrder(
                          order
                        )
                      }
                    >
                      VIEW
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* =========================
          ORDER DETAILS MODAL
      ========================= */}

      {selectedOrder && (

        <div
          className="admin-order-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="admin-order-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-order-modal-header">

              <div>

                <p>
                  ORDER DETAILS
                </p>

                <h2>
                  Order #{selectedOrder.id}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>


            {/* CUSTOMER */}

            <div className="admin-order-section">

              <h3>
                CUSTOMER
              </h3>

              <div className="admin-order-customer">

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.customerName}
                </p>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {selectedOrder.mobile}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.address}
                </p>

                {selectedOrder.notes && (

                  <p>
                    <strong>Notes:</strong>{" "}
                    {selectedOrder.notes}
                  </p>

                )}

              </div>

            </div>


            {/* PRODUCTS */}

            <div className="admin-order-section">

              <h3>
                PRODUCTS
              </h3>


              <div className="admin-order-items">

                {selectedOrder.items?.map(
                  (item) => (

                    <div
                      className="admin-order-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.productName}
                        </strong>

                        <span>
                          {item.brand} ×{" "}
                          {item.quantity}
                        </span>

                      </div>


                      <strong>
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


            {/* SUMMARY */}

            <div className="admin-order-summary">

              <div>
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{Number(
                    selectedOrder.subtotal || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>


              <div>
                <span>
                  Delivery
                </span>

                <strong>
                  ₹{Number(
                    selectedOrder.deliveryCharge || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>


              <div className="admin-order-total">

                <span>
                  TOTAL
                </span>

                <strong>
                  ₹{Number(
                    selectedOrder.total || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>


            {/* STATUS */}

            <div className="admin-order-status-section">

              <label>
                ORDER STATUS
              </label>

              <select
                value={
                  selectedOrder.status ||
                  "PENDING"
                }
                onChange={(event) =>
                  updateStatus(
                    selectedOrder.id,
                    event.target.value
                  )
                }
              >

                {statuses.map(
                  (status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status.replaceAll(
                        "_",
                        " "
                      )}
                    </option>

                  )
                )}

              </select>

            </div>


          </div>

        </div>

      )}

    </section>

  );
}

export default AdminOrders;