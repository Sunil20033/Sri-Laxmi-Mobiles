import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

import lmLogo from "../assets/lm-mobile-logo.png";

import "./Navbar.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://sri-laxmi-mobiles-backend.onrender.com/api";

/* =========================================================
   SERVICES AVAILABLE FOR SEARCH
========================================================= */

const SERVICES = [
  {
    title: "Mobile Repair",
    description: "Professional mobile repair services.",
    icon: "bi-tools",
  },
  {
    title: "Screen Replacement",
    description: "Quality screen replacement service.",
    icon: "bi-phone",
  },
  {
    title: "Software Services",
    description: "Software and mobile issue solutions.",
    icon: "bi-cpu",
  },
  {
    title: "Phone Unlocking",
    description: "Professional software assistance.",
    icon: "bi-shield-check",
  },
  {
    title: "Battery Replacement",
    description: "Battery replacement and related services.",
    icon: "bi-battery-half",
  },
  {
    title: "Charging Port Repair",
    description: "Charging port repair service.",
    icon: "bi-lightning-charge",
  },
  {
    title: "Camera Repair",
    description: "Camera related repair services.",
    icon: "bi-camera",
  },
];

/* =========================================================
   MAIN NAVIGATION
========================================================= */

const MAIN_MENU = [
  {
    label: "HOME",
    path: "/",
    icon: "bi-house-fill",
  },
  {
    label: "MOBILES",
    path: "/mobiles",
    icon: "bi-phone-fill",
  },
  {
    label: "ACCESSORIES",
    path: "/accessories",
    icon: "bi-headphones",
  },
  {
    label: "SERVICES",
    path: "/services",
    icon: "bi-tools",
  },
  {
    label: "OFFERS",
    path: "/offers",
    icon: "bi-fire",
    hot: true,
  },
  {
    label: "GALLERY",
    path: "/gallery",
    icon: "bi-images",
  },
  {
    label: "REVIEWS",
    path: "/reviews",
    icon: "bi-star-fill",
  },
  {
    label: "ABOUT US",
    path: "/about",
    icon: "bi-info-circle-fill",
  },
];

/* =========================================================
   CUSTOMER MENU
========================================================= */

const CUSTOMER_MENU = [
  {
    label: "CONTACT US",
    path: "/contact",
    icon: "bi-telephone-fill",
  },
  {
    label: "MY ORDERS",
    path: "/my-orders",
    icon: "bi-receipt",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const {
    customer,
    isLoggedIn,
    logout,
  } = useCustomerAuth();

  /* =======================================================
     MENU
  ======================================================= */

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef(null);

  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setSearchLoading(true);

        const response = await axios.get(
          `${API_URL}/products`
        );

        if (mounted) {
          setProducts(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        }
      } catch (error) {
        console.error(
          "Navbar product search error:",
          error
        );
      } finally {
        if (mounted) {
          setSearchLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     SEARCH LOGIC
  ======================================================= */

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    if (term.length < 2) {
      setSearchResults([]);
      setSearchOpen(true);
      return;
    }

    const matchedProducts = products
      .filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const brand = String(
          product.brand || ""
        ).toLowerCase();

        const category = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(term) ||
          brand.includes(term) ||
          category.includes(term)
        );
      })
      .slice(0, 6)
      .map((product) => ({
        type: "product",
        data: product,
      }));

    const matchedServices = SERVICES
      .filter((service) => {
        const title =
          service.title.toLowerCase();

        const description =
          service.description.toLowerCase();

        return (
          title.includes(term) ||
          description.includes(term)
        );
      })
      .slice(0, 4)
      .map((service) => ({
        type: "service",
        data: service,
      }));

    setSearchResults([
      ...matchedProducts,
      ...matchedServices,
    ]);

    setSearchOpen(true);
  }, [searchTerm, products]);

  /* =======================================================
     CLOSE SEARCH OUTSIDE
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     SEARCH SUBMIT
  ======================================================= */

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const term = searchTerm.trim();

    if (!term) return;

    if (searchResults.length > 0) {
      handleSearchResultClick(
        searchResults[0]
      );
      return;
    }

    setSearchOpen(true);
  };

  /* =======================================================
     SEARCH RESULT CLICK
  ======================================================= */

  const handleSearchResultClick = (result) => {
    setSearchOpen(false);
    setSearchTerm("");

    if (result.type === "product") {
      const product = result.data;

      navigate(`/mobiles/${product.id}`);
      return;
    }

    if (result.type === "service") {
      navigate("/services#repair-request");
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header className="site-header">

      {/* =====================================================
          TOP INFORMATION BAR
      ===================================================== */}

      <div className="top-bar">
        <div className="top-bar-inner">

          <a
            href="https://maps.app.goo.gl/nGzZoD9cwZPydedJA?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="top-location"
            aria-label="Open Sri Laxmi Mobiles location in Google Maps"
          >
            <i className="bi bi-geo-alt-fill"></i>
            <span>Chincholi</span>
          </a>

          <div className="top-contact">

            <a
              href="tel:9035300355"
              className="top-phone"
              aria-label="Call Sri Laxmi Mobiles"
            >
              <i className="bi bi-telephone-fill"></i>
              <span>9035300355</span>
            </a>

            <a
              href="https://wa.me/919035300355"
              target="_blank"
              rel="noreferrer"
              className="top-whatsapp"
              aria-label="WhatsApp Sri Laxmi Mobiles"
            >
              <i className="bi bi-whatsapp"></i>
              <span>WhatsApp Us</span>
            </a>

            <a
              href="https://www.instagram.com/laxmi_mobiles_01/"
              target="_blank"
              rel="noreferrer"
              className="top-instagram"
              aria-label="Instagram Sri Laxmi Mobiles"
            >
              <i className="bi bi-instagram"></i>
              <span>laxmi_mobiles_01</span>
            </a>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="main-header">
        <div className="main-header-inner">

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className={`mobile-menu-btn ${
              menuOpen ? "menu-open" : ""
            }`}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (previous) => !previous
              )
            }
          >
            <i
              className={
                menuOpen
                  ? "bi bi-x-lg"
                  : "bi bi-list"
              }
            ></i>
          </button>

          {/* BRAND */}

          <Link
            to="/"
            className="brand-logo"
            onClick={closeMenu}
          >
            <div className="brand-icon">
              <img
                src={lmLogo}
                alt="Sri Laxmi Mobiles"
              />
            </div>

            <div className="brand-text">
              <span className="brand-name">
                SRI LAXMI
              </span>

              <span className="brand-subtitle">
                MOBILES
              </span>

              <small>
                Your Trusted Mobile Store
              </small>
            </div>
          </Link>

          {/* SEARCH */}

          <div
            className="header-search-wrapper"
            ref={searchRef}
          >
            <form
              className="header-search"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                onFocus={() => {
                  if (searchTerm.trim()) {
                    setSearchOpen(true);
                  }
                }}
                placeholder="Search mobiles, accessories, services..."
                aria-label="Search mobiles and services"
                autoComplete="off"
              />

              <button
                type="submit"
                aria-label="Search"
              >
                <i className="bi bi-search"></i>
              </button>
            </form>

            {/* SEARCH RESULTS */}

            {searchOpen &&
              searchTerm.trim() && (
                <div className="search-results-dropdown">

                  {searchLoading ? (
                    <div className="search-status">
                      <i className="bi bi-arrow-repeat"></i>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="search-results-heading">
                        SEARCH RESULTS
                      </div>

                      {searchResults.map(
                        (result, index) => {

                          if (
                            result.type ===
                            "product"
                          ) {
                            const product =
                              result.data;

                            return (
                              <button
                                type="button"
                                className="search-result-item"
                                key={`product-${product.id}-${index}`}
                                onClick={() =>
                                  handleSearchResultClick(
                                    result
                                  )
                                }
                              >
                                <div className="search-result-icon">
                                  {product.image ? (
                                    <img
                                      src={
                                        product.image
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <i className="bi bi-phone"></i>
                                  )}
                                </div>

                                <div className="search-result-content">
                                  <span className="search-result-type">
                                    MOBILE
                                  </span>

                                  <strong>
                                    {product.brand
                                      ? `${product.brand} `
                                      : ""}
                                    {product.name}
                                  </strong>

                                  {product.price !==
                                    undefined && (
                                    <small>
                                      ₹
                                      {Number(
                                        product.price
                                      ).toLocaleString(
                                        "en-IN"
                                      )}
                                    </small>
                                  )}
                                </div>

                                <i className="bi bi-arrow-up-right search-result-arrow"></i>
                              </button>
                            );
                          }

                          const service =
                            result.data;

                          return (
                            <button
                              type="button"
                              className="search-result-item"
                              key={`service-${service.title}-${index}`}
                              onClick={() =>
                                handleSearchResultClick(
                                  result
                                )
                              }
                            >
                              <div className="search-result-icon service-search-icon">
                                <i
                                  className={`bi ${service.icon}`}
                                ></i>
                              </div>

                              <div className="search-result-content">
                                <span className="search-result-type">
                                  SERVICE
                                </span>

                                <strong>
                                  {service.title}
                                </strong>

                                <small>
                                  {service.description}
                                </small>
                              </div>

                              <i className="bi bi-arrow-up-right search-result-arrow"></i>
                            </button>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <div className="search-no-result">

                      <div className="search-no-result-icon">
                        <i className="bi bi-search"></i>
                      </div>

                      <strong>
                        Not Available
                      </strong>

                      <span>
                        No mobile or service found
                        for "{searchTerm.trim()}".
                      </span>

                    </div>
                  )}

                </div>
              )}
          </div>

          {/* DESKTOP WISHLIST + CART */}

          <div className="header-actions">

            <Link
              to="/wishlist"
              className="header-action wishlist-action"
            >
              <i className="bi bi-heart"></i>

              <span>
                Wishlist
              </span>

              <b className="wishlist-count">
                {wishlistCount}
              </b>
            </Link>

            <Link
              to="/cart"
              className="header-action cart-action"
            >
              <i className="bi bi-bag"></i>

              <span>
                Cart
              </span>

              <b className="cart-count">
                {cartCount}
              </b>
            </Link>

          </div>

          {/* DESKTOP ACCOUNT */}

          {isLoggedIn ? (
            <div className="navbar-customer">

              <Link
                to="/account"
                className="navbar-customer-link"
              >
                <i className="bi bi-person-circle"></i>

                <span>
                  {customer?.name || "Account"}
                </span>
              </Link>

              <button
                type="button"
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                LOGOUT
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="navbar-login-link"
            >
              <i className="bi bi-person-circle"></i>
              <span>LOGIN</span>
            </Link>
          )}

          {/* MOBILE WISHLIST */}

          <Link
            to="/wishlist"
            className="mobile-wishlist-btn"
            aria-label="Wishlist"
          >
            <i className="bi bi-heart"></i>

            {wishlistCount > 0 && (
              <b className="wishlist-count">
                {wishlistCount}
              </b>
            )}
          </Link>

          {/* MOBILE CART */}

          <Link
            to="/cart"
            className="mobile-cart-btn"
            aria-label="Cart"
          >
            <i className="bi bi-bag"></i>

            {cartCount > 0 && (
              <b className="cart-count">
                {cartCount}
              </b>
            )}
          </Link>

        </div>
      </div>

      {/* =====================================================
          DESKTOP NAVIGATION
      ===================================================== */}

      <nav className="desktop-navigation">
        <div className="navigation-inner">

          {MAIN_MENU.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-link ${
                index === 0
                  ? "active"
                  : ""
              }`}
            >
              {item.label}

              {item.hot && (
                <span className="offer-nav-hot">
                  HOT
                </span>
              )}
            </Link>
          ))}

          {CUSTOMER_MENU.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/admin/products"
            className="nav-link admin-nav-link"
          >
            ADMIN
          </Link>

        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {menuOpen && (
        <div className="mobile-navigation">

          {/* MAIN */}

          <div className="mobile-menu-section">

            <div className="mobile-menu-section-title">
              <span>MAIN MENU</span>
            </div>

            {MAIN_MENU.map((item, index) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMenu}
                className={
                  index === 0
                    ? "mobile-menu-item active"
                    : "mobile-menu-item"
                }
              >
                <span className="mobile-menu-icon">
                  <i
                    className={`bi ${item.icon}`}
                  ></i>
                </span>

                <span className="mobile-menu-label">
                  {item.label}
                </span>

                {item.hot && (
                  <span className="mobile-hot">
                    HOT
                  </span>
                )}

                <i className="bi bi-chevron-right mobile-menu-arrow"></i>
              </Link>
            ))}

          </div>

          {/* CUSTOMER */}

          <div className="mobile-menu-section">

            <div className="mobile-menu-section-title">
              <span>CUSTOMER</span>
            </div>

            {CUSTOMER_MENU.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMenu}
                className="mobile-menu-item"
              >
                <span className="mobile-menu-icon">
                  <i
                    className={`bi ${item.icon}`}
                  ></i>
                </span>

                <span className="mobile-menu-label">
                  {item.label}
                </span>

                <i className="bi bi-chevron-right mobile-menu-arrow"></i>
              </Link>
            ))}

            {/* ACCOUNT */}

            {isLoggedIn ? (
              <>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="mobile-menu-item mobile-account-link"
                >
                  <span className="mobile-menu-icon">
                    <i className="bi bi-person-circle"></i>
                  </span>

                  <span className="mobile-account-content">
                    <strong>MY ACCOUNT</strong>
                    <small>
                      {customer?.name || "Account"}
                    </small>
                  </span>

                  <i className="bi bi-chevron-right mobile-menu-arrow"></i>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mobile-menu-item mobile-logout-link"
                >
                  <span className="mobile-menu-icon">
                    <i className="bi bi-box-arrow-right"></i>
                  </span>

                  <span className="mobile-menu-label">
                    LOGOUT
                  </span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="mobile-menu-item mobile-account-link"
              >
                <span className="mobile-menu-icon">
                  <i className="bi bi-person-circle"></i>
                </span>

                <span className="mobile-menu-label">
                  LOGIN / CREATE ACCOUNT
                </span>

                <i className="bi bi-chevron-right mobile-menu-arrow"></i>
              </Link>
            )}

          </div>

          {/* MANAGEMENT */}

          <div className="mobile-menu-section mobile-management-section">

            <div className="mobile-menu-section-title">
              <span>MANAGEMENT</span>
            </div>

            <Link
              to="/admin/products"
              onClick={closeMenu}
              className="mobile-menu-item mobile-admin-link"
            >
              <span className="mobile-menu-icon admin-icon">
                <i className="bi bi-shield-lock-fill"></i>
              </span>

              <span className="mobile-menu-label">
                ADMIN
              </span>

              <i className="bi bi-chevron-right mobile-menu-arrow"></i>
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;