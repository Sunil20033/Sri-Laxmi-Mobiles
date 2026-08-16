import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [repairRequests, setRepairRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  async function loadDashboardData() {

    try {

      setLoading(true);
      setError("");


      const [
        productsResponse,
        ordersResponse,
        repairRequestsResponse
      ] = await Promise.all([

        fetch(
          "https://sri-laxmi-mobiles-backend.onrender.com/api/products"
        ),

        fetch(
          "https://sri-laxmi-mobiles-backend.onrender.com/api/orders"
        ),

        fetch(
          "https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests"
        ),

      ]);


      if (
        !productsResponse.ok ||
        !ordersResponse.ok ||
        !repairRequestsResponse.ok
      ) {

        throw new Error(
          "Unable to load dashboard data."
        );

      }


      const productsData =
        await productsResponse.json();

      const ordersData =
        await ordersResponse.json();

      const repairRequestsData =
        await repairRequestsResponse.json();


      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      );


      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : []
      );


      setRepairRequests(
        Array.isArray(repairRequestsData)
          ? repairRequestsData
          : []
      );


    } catch (error) {

      console.error(
        "Unable to load dashboard:",
        error
      );

      setError(
        "Unable to load dashboard data."
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadDashboardData();

  }, []);


  // =========================
  // ORDER STATISTICS
  // =========================

  const pendingOrders =
    orders.filter(
      (order) =>
        !order.status ||
        order.status === "PENDING"
    ).length;


  const outOfStockProducts =
    products.filter(
      (product) =>
        product.stock === false
    ).length;


  const inStockProducts =
    products.filter(
      (product) =>
        product.stock !== false
    ).length;


  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "DELIVERED"
    ).length;


  const cancelledOrders =
    orders.filter(
      (order) =>
        order.status === "CANCELLED"
    ).length;


  // =========================
  // REPAIR REQUEST STATISTICS
  // =========================

  const pendingRepairRequests =
    repairRequests.filter(
      (request) =>
        !request.status ||
        request.status === "PENDING"
    ).length;


  const completedRepairRequests =
    repairRequests.filter(
      (request) =>
        request.status === "COMPLETED"
    ).length;


  const cancelledRepairRequests =
    repairRequests.filter(
      (request) =>
        request.status === "CANCELLED"
    ).length;


  // =========================
  // RECENT ORDERS
  // =========================

  const recentOrders =
    [...orders]
      .sort((a, b) => {

        const dateA =
          a.orderDate
            ? new Date(
                a.orderDate
              ).getTime()
            : 0;


        const dateB =
          b.orderDate
            ? new Date(
                b.orderDate
              ).getTime()
            : 0;


        return dateB - dateA;

      })
      .slice(0, 5);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="admin-dashboard-page">

        <div className="admin-dashboard-loading">

          <i className="bi bi-arrow-repeat"></i>

          <p>
            Loading dashboard...
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

      <section className="admin-dashboard-page">

        <div className="admin-dashboard-error">

          <i className="bi bi-exclamation-circle"></i>

          <h2>
            Unable To Load Dashboard
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboardData}
          >
            TRY AGAIN
          </button>

        </div>

      </section>

    );

  }


  return (

    <section className="admin-dashboard-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-dashboard-heading">

        <div>

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <span>
            Store overview and management
          </span>

        </div>


        <button
          type="button"
          className="admin-dashboard-refresh"
          onClick={loadDashboardData}
        >

          <i className="bi bi-arrow-clockwise"></i>

          REFRESH

        </button>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="admin-dashboard-stats">


        {/* PRODUCTS */}

        <Link
          to="/admin/products"
          className="admin-stat-card"
        >

          <div className="admin-stat-icon">

            <i className="bi bi-box-seam-fill"></i>

          </div>


          <div>

            <span>
              PRODUCTS
            </span>

            <strong>
              {products.length}
            </strong>

            <small>
              Manage products
            </small>

          </div>

        </Link>


        {/* TOTAL ORDERS */}

        <Link
          to="/admin/orders"
          className="admin-stat-card"
        >

          <div className="admin-stat-icon">

            <i className="bi bi-receipt-cutoff"></i>

          </div>


          <div>

            <span>
              TOTAL ORDERS
            </span>

            <strong>
              {orders.length}
            </strong>

            <small>
              View all orders
            </small>

          </div>

        </Link>


        {/* PENDING ORDERS */}

        <Link
          to="/admin/orders"
          className="admin-stat-card"
        >

          <div className="admin-stat-icon">

            <i className="bi bi-clock-history"></i>

          </div>


          <div>

            <span>
              PENDING ORDERS
            </span>

            <strong>
              {pendingOrders}
            </strong>

            <small>
              Orders awaiting action
            </small>

          </div>

        </Link>


        {/* REPAIR REQUESTS */}

        <Link
          to="/admin/repair-requests"
          className="admin-stat-card"
        >

          <div className="admin-stat-icon">

            <i className="bi bi-tools"></i>

          </div>


          <div>

            <span>
              REPAIR REQUESTS
            </span>

            <strong>
              {repairRequests.length}
            </strong>

            <small>
              View customer requests
            </small>

          </div>

        </Link>


      </div>


      {/* =========================
          SECONDARY STATISTICS
      ========================= */}

      <div className="admin-dashboard-secondary-stats">


        {/* IN STOCK */}

        <Link
          to="/admin/products"
          className="admin-secondary-stat-card"
        >

          <i className="bi bi-check-circle-fill"></i>

          <div>

            <span>
              IN STOCK
            </span>

            <strong>
              {inStockProducts}
            </strong>

          </div>

        </Link>


        {/* OUT OF STOCK */}

        <Link
          to="/admin/products"
          className="admin-secondary-stat-card"
        >

          <i className="bi bi-x-circle-fill"></i>

          <div>

            <span>
              OUT OF STOCK
            </span>

            <strong>
              {outOfStockProducts}
            </strong>

          </div>

        </Link>


        {/* DELIVERED */}

        <Link
          to="/admin/orders"
          className="admin-secondary-stat-card"
        >

          <i className="bi bi-check2-all"></i>

          <div>

            <span>
              DELIVERED
            </span>

            <strong>
              {deliveredOrders}
            </strong>

          </div>

        </Link>


        {/* CANCELLED */}

        <Link
          to="/admin/orders"
          className="admin-secondary-stat-card"
        >

          <i className="bi bi-x-octagon-fill"></i>

          <div>

            <span>
              CANCELLED
            </span>

            <strong>
              {cancelledOrders}
            </strong>

          </div>

        </Link>


      </div>


      {/* =========================
          REPAIR REQUEST STATISTICS
      ========================= */}

      <div className="admin-repair-dashboard-section">


        <div className="admin-dashboard-section-heading">

          <div>

            <h2>
              Repair Requests
            </h2>

            <p>
              Current customer repair request status.
            </p>

          </div>


          <Link to="/admin/repair-requests">

            VIEW ALL

            <i className="bi bi-arrow-right"></i>

          </Link>

        </div>


        <div className="admin-repair-dashboard-stats">


          {/* TOTAL */}

          <Link
            to="/admin/repair-requests"
            className="admin-repair-dashboard-stat"
          >

            <div className="admin-repair-dashboard-stat-icon">

              <i className="bi bi-tools"></i>

            </div>


            <div>

              <span>
                TOTAL REQUESTS
              </span>

              <strong>
                {repairRequests.length}
              </strong>

            </div>

          </Link>


          {/* PENDING */}

          <Link
            to="/admin/repair-requests"
            className="admin-repair-dashboard-stat"
          >

            <div className="admin-repair-dashboard-stat-icon">

              <i className="bi bi-clock-history"></i>

            </div>


            <div>

              <span>
                PENDING
              </span>

              <strong>
                {pendingRepairRequests}
              </strong>

            </div>

          </Link>


          {/* COMPLETED */}

          <Link
            to="/admin/repair-requests"
            className="admin-repair-dashboard-stat"
          >

            <div className="admin-repair-dashboard-stat-icon">

              <i className="bi bi-check-circle-fill"></i>

            </div>


            <div>

              <span>
                COMPLETED
              </span>

              <strong>
                {completedRepairRequests}
              </strong>

            </div>

          </Link>


          {/* CANCELLED */}

          <Link
            to="/admin/repair-requests"
            className="admin-repair-dashboard-stat"
          >

            <div className="admin-repair-dashboard-stat-icon">

              <i className="bi bi-x-circle-fill"></i>

            </div>


            <div>

              <span>
                CANCELLED
              </span>

              <strong>
                {cancelledRepairRequests}
              </strong>

            </div>

          </Link>


        </div>

      </div>


      {/* =========================
          QUICK MANAGEMENT
      ========================= */}

      <div className="admin-dashboard-section-heading">

        <div>

          <h2>
            Quick Management
          </h2>

          <p>
            Access your main store management areas.
          </p>

        </div>

      </div>


      <div className="admin-dashboard-content">


        {/* PRODUCTS */}

        <Link
          to="/admin/products"
          className="admin-dashboard-card"
        >

          <div className="admin-dashboard-icon">

            <i className="bi bi-box-seam"></i>

          </div>


          <div className="admin-dashboard-card-content">

            <h2>
              Products
            </h2>

            <p>
              Add, edit, view and delete
              mobile products.
            </p>

            <span>

              MANAGE PRODUCTS

              <i className="bi bi-arrow-right"></i>

            </span>

          </div>

        </Link>

        {/* OFFERS */}

          <Link
            to="/admin/offers"
            className="admin-dashboard-card"
          >

            <div className="admin-dashboard-icon">

              <i className="bi bi-tag-fill"></i>

            </div>


            <div className="admin-dashboard-card-content">

              <h2>
                Offers
              </h2>


              <p>
                Create, edit and manage
                special offers.
              </p>


              <span>

                MANAGE OFFERS

                <i className="bi bi-arrow-right"></i>

              </span>

            </div>

          </Link>


        {/* ORDERS */}

        <Link
          to="/admin/orders"
          className="admin-dashboard-card"
        >

          <div className="admin-dashboard-icon">

            <i className="bi bi-receipt"></i>

          </div>


          <div className="admin-dashboard-card-content">

            <h2>
              Orders
            </h2>

            <p>
              View customer orders and
              update their status.
            </p>

            <span>

              MANAGE ORDERS

              <i className="bi bi-arrow-right"></i>

            </span>

          </div>

        </Link>


        {/* REPAIR REQUESTS */}

        <Link
          to="/admin/repair-requests"
          className="admin-dashboard-card"
        >

          <div className="admin-dashboard-icon">

            <i className="bi bi-tools"></i>

          </div>


          <div className="admin-dashboard-card-content">

            <h2>
              Repair Requests
            </h2>

            <p>
              View and manage customer
              mobile repair requests.
            </p>

            <span>

              MANAGE REPAIR REQUESTS

              <i className="bi bi-arrow-right"></i>

            </span>

          </div>

        </Link>


      </div>


      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="admin-dashboard-recent">


        <div className="admin-dashboard-section-heading">

          <div>

            <h2>
              Recent Orders
            </h2>

            <p>
              Latest customer orders.
            </p>

          </div>


          <Link to="/admin/orders">

            VIEW ALL

            <i className="bi bi-arrow-right"></i>

          </Link>

        </div>


        {recentOrders.length === 0 ? (

          <div className="admin-dashboard-no-orders">

            <i className="bi bi-receipt"></i>

            <p>
              No orders yet.
            </p>

          </div>

        ) : (

          <div className="admin-dashboard-orders">

            {recentOrders.map((order) => (

              <div
                className="admin-dashboard-order"
                key={order.id}
              >


                <div className="admin-dashboard-order-id">

                  <strong>
                    #{order.id}
                  </strong>

                  <span>
                    {order.customerName || "Customer"}
                  </span>

                </div>


                <div className="admin-dashboard-order-mobile">

                  {order.mobile || "-"}

                </div>


                <div className="admin-dashboard-order-total">

                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString("en-IN")}

                </div>


                <div
                  className={
                    `admin-dashboard-order-status ` +
                    `dashboard-status-${(
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

                </div>


                <Link
                  to="/admin/orders"
                  className="admin-dashboard-order-view"
                >

                  VIEW

                </Link>


              </div>

            ))}

          </div>

        )}


      </div>


    </section>

  );

}


export default AdminDashboard;