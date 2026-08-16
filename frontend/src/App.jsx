import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Mobiles from "./pages/Mobiles";
import ProductDetails from "./pages/ProductDetails";
import Accessories from "./pages/Accessories";
import Services from "./pages/Services";
import Offers from "./pages/Offers";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";

import AdminProducts from "./pages/AdminProducts";
import Checkout from "./pages/Checkout";
import CheckoutReview from "./pages/CheckoutReview";
import OrderSuccess from "./pages/OrderSuccess";

import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRepairRequestDetails from "./pages/AdminRepairRequestDetails";
import AdminRepairRequests from "./pages/AdminRepairRequests";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";

import MyOrders from "./pages/MyOrders";
import MyOrderDetails from "./pages/MyOrderDetails";

import {
  CustomerAuthProvider,
} from "./context/CustomerAuthContext";

import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerAccount from "./pages/CustomerAccount";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminOffers from "./pages/AdminOffers";

import ProtectedAdminRoute
  from "./components/ProtectedAdminRoute";

import {
  AdminAuthProvider
} from "./context/AdminAuthContext";


function App() {

  return (

    <AdminAuthProvider>

      <CustomerAuthProvider>

        <CartProvider>

          <WishlistProvider>

            <BrowserRouter>

              <Navbar />

              <Routes>

                {/* =================================================
                    CUSTOMER PAGES
                ================================================= */}

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/mobiles"
                  element={<Mobiles />}
                />

                <Route
                  path="/mobiles/:id"
                  element={<ProductDetails />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />

                <Route
                  path="/checkout"
                  element={<Checkout />}
                />

                <Route
                  path="/checkout/review"
                  element={<CheckoutReview />}
                />

                <Route
                  path="/order-success/:id"
                  element={<OrderSuccess />}
                />

                <Route
                  path="/wishlist"
                  element={<Wishlist />}
                />

                <Route
                  path="/accessories"
                  element={<Accessories />}
                />

                <Route
                  path="/services"
                  element={<Services />}
                />

                <Route
                  path="/offers"
                  element={<Offers />}
                />

                <Route
                  path="/gallery"
                  element={<Gallery />}
                />

                <Route
                  path="/reviews"
                  element={<Reviews />}
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                {/* =================================================
                    ABOUT US
                ================================================= */}

                <Route
                  path="/about"
                  element={<AboutUs />}
                />

                {/* =================================================
                    CUSTOMER AUTHENTICATION
                ================================================= */}

                <Route
                  path="/login"
                  element={<CustomerLogin />}
                />

                <Route
                  path="/register"
                  element={<CustomerRegister />}
                />

                <Route
                  path="/account"
                  element={<CustomerAccount />}
                />

                <Route
                  path="/my-orders"
                  element={<MyOrders />}
                />

                <Route
                  path="/my-orders/:id"
                  element={<MyOrderDetails />}
                />

                {/* =================================================
                    ADMIN LOGIN
                ================================================= */}

                <Route
                  path="/admin/login"
                  element={<AdminLogin />}
                />

                {/* =================================================
                    PROTECTED ADMIN
                ================================================= */}

                <Route
                  element={<ProtectedAdminRoute />}
                >

                  <Route
                    element={<AdminLayout />}
                  >

                    <Route
                      path="/admin"
                      element={<AdminDashboard />}
                    />

                    <Route
                      path="/admin/products"
                      element={<AdminProducts />}
                    />

                    <Route
                      path="/admin/orders"
                      element={<AdminOrders />}
                    />

                    <Route
                      path="/admin/repair-requests"
                      element={
                        <AdminRepairRequests />
                      }
                    />

                    <Route
                      path="/admin/repair-requests/:id"
                      element={
                        <AdminRepairRequestDetails />
                      }
                    />

                    <Route
                      path="/admin/offers"
                      element={<AdminOffers />}
                    />

                  </Route>

                </Route>

              </Routes>


              {/* =================================================
                  DEVELOPER FOOTER
                  Automatically hidden on /admin pages
              ================================================= */}

              <Footer />


              {/* =================================================
                  TOAST NOTIFICATIONS
              ================================================= */}

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
              />

            </BrowserRouter>

          </WishlistProvider>

        </CartProvider>

      </CustomerAuthProvider>

    </AdminAuthProvider>
  );
}


export default App;