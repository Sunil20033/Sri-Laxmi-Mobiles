import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import "./AdminLayout.css";

function AdminLayout() {

  const navigate = useNavigate();

  const { logout } = useAdminAuth();


  function handleLogout() {

    logout();

    navigate("/admin/login");
  }


  function getNavClass({ isActive }) {

    return isActive
      ? "admin-navigation-item active"
      : "admin-navigation-item";
  }


  return (

    <div className="admin-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="admin-sidebar">

        {/* BRAND */}

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            <i className="bi bi-phone-fill"></i>
          </div>

          <div>

            <strong>
              SRI LAXMI
            </strong>

            <span>
              MOBILES
            </span>

          </div>

        </div>


        {/* TITLE */}

        <div className="admin-sidebar-title">
          ADMIN PANEL
        </div>


        {/* =========================
            ADMIN NAVIGATION
        ========================= */}

        <div className="admin-navigation">

          {/* DASHBOARD */}

          <NavLink
            to="/admin"
            end
            className={getNavClass}
          >

            <i className="bi bi-grid-fill"></i>

            <span>
              DASHBOARD
            </span>

          </NavLink>


          {/* PRODUCTS */}

          <NavLink
            to="/admin/products"
            className={getNavClass}
          >

            <i className="bi bi-box-seam-fill"></i>

            <span>
              PRODUCTS
            </span>

          </NavLink>


          {/* OFFERS */}

          <NavLink
            to="/admin/offers"
            className={getNavClass}
          >

            <i className="bi bi-tag-fill"></i>

            <span>
              OFFERS
            </span>

          </NavLink>


          {/* ORDERS */}

          <NavLink
            to="/admin/orders"
            className={getNavClass}
          >

            <i className="bi bi-receipt-cutoff"></i>

            <span>
              ORDERS
            </span>

          </NavLink>


          {/* REPAIR REQUESTS */}

          <NavLink
            to="/admin/repair-requests"
            className={getNavClass}
          >

            <i className="bi bi-tools"></i>

            <span>
              REPAIR REQUESTS
            </span>

          </NavLink>

        </div>


        {/* =========================
            SIDEBAR BOTTOM
        ========================= */}

        <div className="admin-sidebar-bottom">

          <NavLink
            to="/"
            className="admin-store-link"
          >

            <i className="bi bi-shop"></i>

            <span>
              BACK TO STORE
            </span>

          </NavLink>


          <button
            type="button"
            className="admin-sidebar-logout"
            onClick={handleLogout}
          >

            <i className="bi bi-box-arrow-right"></i>

            <span>
              LOGOUT
            </span>

          </button>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="admin-main">

        <header className="admin-topbar">

          <div>

            <span>
              ADMIN PANEL
            </span>

            <strong>
              Sri Laxmi Mobiles
            </strong>

          </div>


          <button
            type="button"
            className="admin-mobile-logout"
            onClick={handleLogout}
          >

            <i className="bi bi-box-arrow-right"></i>

          </button>

        </header>


        {/* PAGE CONTENT */}

        <div className="admin-page-content">

          <Outlet />

        </div>

      </main>

    </div>

  );
}

export default AdminLayout;