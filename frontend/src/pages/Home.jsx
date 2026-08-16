import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useWishlist } from "../context/WishlistContext";

import "./Home.css";


const PRODUCT_API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com/api/products";

const OFFER_API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com/api/offers";


const DEFAULT_OFFER = {

  title:
    "PUT A SCREEN PROTECTOR ON YOUR PHONE & GET",

  badge:
    "SPECIAL OFFER",

  freeText:
    "FREE",

  startDate:
    "2026-08-15T00:00:00",

  endDate:
    "2026-09-01T23:59:59",

  freeItem1Name:
    "OnePlus Wired Earphone",

  freeItem1Image:
    "",

  freeItem1Text:
    "FREE",

  freeItem2Name:
    "Gaming Finger Gloves",

  freeItem2Image:
    "",

  freeItem2Text:
    "One Pair FREE",

  note:
    "Offer available for a limited time only.",

  shopMessage:
    "Visit Sri Laxmi Mobiles in Chincholli to avail this offer.",

  active:
    true,
};


function Home() {

  const navigate =
    useNavigate();


  // =========================================================
  // FEATURED PRODUCTS
  // =========================================================

  const [
    featuredProducts,
    setFeaturedProducts
  ] = useState([]);


  const [
    featuredLoading,
    setFeaturedLoading
  ] = useState(true);


  const [
    featuredError,
    setFeaturedError
  ] = useState("");


  // =========================================================
  // OFFER
  // =========================================================

  const [
    offer,
    setOffer
  ] = useState(null);


  const [
    offerLoading,
    setOfferLoading
  ] = useState(true);


  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  useEffect(() => {

    async function loadFeaturedProducts() {

      try {

        setFeaturedLoading(true);

        setFeaturedError("");


        const response =
          await axios.get(
            PRODUCT_API_URL
          );


        const products =
          response.data.map(
            (product) => ({

              ...product,

              price:
                Number(product.price),

              oldPrice:
                Number(product.oldPrice),

              inStock:
                Boolean(product.stock),

            })
          );


        // HOME PAGE SHOWS ONLY 2 PRODUCTS

        setFeaturedProducts(
          products.slice(0, 2)
        );


      } catch (error) {

        console.error(
          "Error loading featured products:",
          error
        );


        setFeaturedError(
          "Unable to load featured products."
        );


      } finally {

        setFeaturedLoading(false);

      }

    }


    loadFeaturedProducts();

  }, []);


  // =========================================================
  // LOAD ACTIVE OFFER
  // =========================================================

  useEffect(() => {

    async function loadOffer() {

      try {

        setOfferLoading(true);


        const response =
          await fetch(
            OFFER_API_URL
          );


        if (!response.ok) {

          throw new Error(
            "Unable to load offers."
          );

        }


        const data =
          await response.json();


        const offers =
          Array.isArray(data)
            ? data
            : [];


        const activeOffer =
          offers.find(
            (item) =>
              Boolean(item.active)
          );


        setOffer(
          activeOffer ||
          DEFAULT_OFFER
        );


      } catch (error) {

        console.error(
          "Unable to load offer:",
          error
        );


        setOffer(
          DEFAULT_OFFER
        );


      } finally {

        setOfferLoading(false);

      }

    }


    loadOffer();

  }, []);


  return (

    <main className="home-page">


      {/* =====================================================
          SPECIAL OFFER
      ===================================================== */}

      <section className="home-special-offer-section">

        <div className="home-special-orbit home-special-orbit-left"></div>

        <div className="home-special-orbit home-special-orbit-right"></div>


        <div className="home-special-offer-container">


          {/* HEADING */}

          <div className="home-special-offer-heading">

            <span>
              SRI LAXMI MOBILES
            </span>

            <h2>
              SPECIAL OFFER
            </h2>

            <div className="home-heading-line"></div>

          </div>


          {/* OFFER CARD */}

          <div
            className="home-special-offer-card"

            onClick={() =>
              navigate("/offers")
            }

            role="button"

            tabIndex={0}

            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {

                navigate("/offers");

              }

            }}
          >


            {/* BADGE */}

            <div className="home-offer-badge">

              {offer?.badge ||
                "SPECIAL OFFER"}

            </div>


            {/* MAIN VISUAL */}

            <div className="home-offer-main-visual">

              <div className="home-offer-shield">

                <i className="bi bi-phone-fill"></i>

              </div>


              <span>
                DISPLAY REPLACEMENT
              </span>

            </div>


            {/* TITLE */}

            <h3>

              {offer?.title ||
                "CHANGE YOUR DISPLAY & GET 2 FREE GIFTS"}

            </h3>


            {/* FREE */}

            <div className="home-offer-free">

              {offer?.freeText ||
                "FREE"}

            </div>


            {/* FREE ITEMS */}

            <div className="home-offer-items">


              {/* ITEM 1 */}

              <div className="home-offer-item">

                <div className="home-offer-item-image">

                  {offer?.freeItem1Image ? (

                    <img
                      src={offer.freeItem1Image}
                      alt={
                        offer.freeItem1Name
                      }

                      onError={(event) => {

                        event.currentTarget.style.display =
                          "none";

                        const fallback =
                          event.currentTarget
                            .nextElementSibling;

                        if (fallback) {

                          fallback.style.display =
                            "flex";

                        }

                      }}
                    />

                  ) : null}


                  <div
                    className="home-offer-item-icon"

                    style={{
                      display:
                        offer?.freeItem1Image
                          ? "none"
                          : "flex",
                    }}
                  >

                    <i className="bi bi-headphones"></i>

                  </div>

                </div>


                <strong>

                  {offer?.freeItem1Name ||
                    "OnePlus Wired Earphone"}

                </strong>


                <span>

                  {offer?.freeItem1Text ||
                    "FREE"}

                </span>

              </div>


              {/* PLUS */}

              <div className="home-offer-plus">
                +
              </div>


              {/* ITEM 2 */}

              <div className="home-offer-item">

                <div className="home-offer-item-image">

                  {offer?.freeItem2Image ? (

                    <img
                      src={offer.freeItem2Image}
                      alt={
                        offer.freeItem2Name
                      }

                      onError={(event) => {

                        event.currentTarget.style.display =
                          "none";

                        const fallback =
                          event.currentTarget
                            .nextElementSibling;

                        if (fallback) {

                          fallback.style.display =
                            "flex";

                        }

                      }}
                    />

                  ) : null}


                  <div
                    className="home-offer-item-icon"

                    style={{
                      display:
                        offer?.freeItem2Image
                          ? "none"
                          : "flex",
                    }}
                  >

                    <i className="bi bi-controller"></i>

                  </div>

                </div>


                <strong>

                  {offer?.freeItem2Name ||
                    "Gaming Finger Gloves"}

                </strong>


                <span>

                  {offer?.freeItem2Text ||
                    "One Pair FREE"}

                </span>

              </div>

            </div>


            {/* BUTTON */}

            <div className="home-offer-action">

              VIEW SPECIAL OFFER

              <i className="bi bi-arrow-right"></i>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BEST DEALS
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-orbit hero-orbit-left"></div>

        <div className="hero-orbit hero-orbit-right"></div>


        <div className="hero-container">


          <div className="hero-content">

            <p className="hero-small-title">
              BIG OFFERS
            </p>


            <h1>
              BEST <span>DEALS</span>
            </h1>


            <div className="hero-heading-line"></div>


            <h2>

              EXCLUSIVE DISCOUNTS

              <br />

              ON MOBILES & ACCESSORIES

            </h2>


            {/* HIGHLIGHTS */}

            <div className="hero-highlights">


              <div>

                <i className="bi bi-shield-check"></i>

                <span>

                  <strong>
                    100%
                  </strong>

                  Original Products

                </span>

              </div>


              <div>

                <i className="bi bi-award"></i>

                <span>

                  <strong>
                    Best Price
                  </strong>

                  Guarantee

                </span>

              </div>


              <div>

                <i className="bi bi-person-check"></i>

                <span>

                  <strong>
                    Trusted by
                  </strong>

                  Customers

                </span>

              </div>


            </div>


            {/* BUTTONS */}

            <div className="hero-buttons">

              <button
                type="button"
                className="primary-button"

                onClick={() =>
                  navigate("/mobiles")
                }
              >

                SHOP NOW

              </button>


              <button
                type="button"
                className="secondary-button"

                onClick={() =>
                  navigate("/offers")
                }
              >

                VIEW OFFERS

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUST FEATURES
      ===================================================== */}

      <section className="trust-section">

        <div className="trust-container">


          <div className="trust-item">

            <i className="bi bi-shield-check"></i>

            <div>

              <strong>
                Genuine Products
              </strong>

              <span>
                100% Original
              </span>

            </div>

          </div>


          <div className="trust-item">

            <i className="bi bi-currency-rupee"></i>

            <div>

              <strong>
                Best Price
              </strong>

              <span>
                Always Affordable
              </span>

            </div>

          </div>


          <div className="trust-item">

            <i className="bi bi-bag-check"></i>

            <div>

              <strong>
                Secure Shopping
              </strong>

              <span>
                Safe & Secure Payments
              </span>

            </div>

          </div>


          <div className="trust-item">

            <i className="bi bi-headset"></i>

            <div>

              <strong>
                Quality Support
              </strong>

              <span>
                Fast & Reliable
              </span>

            </div>

          </div>


        </div>

      </section>


      {/* =====================================================
          SHOP BY CATEGORY
      ===================================================== */}

      <section className="category-section">

        <div className="section-container">


          <div className="section-heading">

            <div>

              <span className="section-label">
                EXPLORE
              </span>

              <h2>
                SHOP BY CATEGORY
              </h2>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/accessories")
              }
            >
              VIEW ALL
            </button>

          </div>


          <div className="category-grid">


            <Category
              icon="bi-phone"
              title="Smartphones"
              onClick={() =>
                navigate("/mobiles")
              }
            />


            <Category
              icon="bi-earbuds"
              title="Earbuds"
              onClick={() =>
                navigate(
                  "/accessories?category=Earbuds"
                )
              }
            />


            <Category
              icon="bi-smartwatch"
              title="Smart Watches"
              onClick={() =>
                navigate(
                  "/accessories?category=Smart%20Watches"
                )
              }
            />


            <Category
              icon="bi-lightning-charge"
              title="Chargers"
              onClick={() =>
                navigate(
                  "/accessories?category=Chargers"
                )
              }
            />


            <Category
              icon="bi-battery-half"
              title="Power Banks"
              onClick={() =>
                navigate(
                  "/accessories?category=Power%20Banks"
                )
              }
            />


            <Category
              icon="bi-phone"
              title="Covers"
              onClick={() =>
                navigate(
                  "/accessories?category=Covers"
                )
              }
            />


            <Category
              icon="bi-shield-check"
              title="Screen Protectors"
              onClick={() =>
                navigate(
                  "/accessories?category=Screen%20Protectors"
                )
              }
            />


            <Category
              icon="bi-usb-symbol"
              title="Cables"
              onClick={() =>
                navigate(
                  "/accessories?category=Cables"
                )
              }
            />


            <Category
              icon="bi-speaker"
              title="Speakers"
              onClick={() =>
                navigate(
                  "/accessories?category=Speakers"
                )
              }
            />


            <Category
              icon="bi-grid"
              title="More"
              onClick={() =>
                navigate("/accessories")
              }
            />


          </div>

        </div>

      </section>


      {/* =====================================================
          PROMOTIONAL CARDS
      ===================================================== */}

      <section className="promo-section">

        <div className="section-container">

          <div className="promo-grid">


            <div className="promo-card new-arrivals">

              <div>

                <span>
                  NEW ARRIVALS
                </span>

                <h3>
                  Latest Mobiles
                </h3>

                <p>
                  Just Landed!
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/mobiles?badge=NEW"
                    )
                  }
                >
                  SHOP NOW
                </button>

              </div>

              <i className="bi bi-phone"></i>

            </div>


            <div className="promo-card best-sellers">

              <div>

                <span>
                  BEST SELLERS
                </span>

                <h3>
                  Top Rated Products
                </h3>

                <p>
                  Best Prices
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/mobiles?badge=BEST%20SELLER"
                    )
                  }
                >
                  SHOP NOW
                </button>

              </div>

              <i className="bi bi-trophy"></i>

            </div>


            <div className="promo-card popular-picks">

              <div>

                <span>
                  POPULAR PICKS
                </span>

                <h3>
                  Trending Products
                </h3>

                <p>
                  Best Value • Hot • Premium
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/mobiles?badges=BEST%20VALUE,HOT,PREMIUM,POPULAR"
                    )
                  }
                >
                  SHOP NOW
                </button>

              </div>

              <i className="bi bi-stars"></i>

            </div>


            <div className="promo-card repair-card">

              <div>

                <span>
                  MOBILE REPAIR
                </span>

                <h3>
                  Fast • Reliable • Affordable
                </h3>

                <p>
                  Expert Technicians
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/services")
                  }
                >
                  BOOK NOW
                </button>

              </div>

              <i className="bi bi-tools"></i>

            </div>


          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="featured-section">

        <div className="section-container">


          <div className="section-heading">

            <div>

              <span className="section-label">
                OUR PICKS
              </span>

              <h2>
                FEATURED PRODUCTS
              </h2>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/mobiles")
              }
            >
              VIEW ALL
            </button>

          </div>


          <div className="product-grid">


            {featuredLoading && (

              <div className="featured-message">

                <i className="bi bi-arrow-repeat"></i>

                <h3>
                  Loading Featured Products...
                </h3>

                <p>
                  Please wait while we load
                  our products.
                </p>

              </div>

            )}


            {!featuredLoading &&
              featuredError && (

                <div className="featured-message">

                  <i className="bi bi-exclamation-circle"></i>

                  <h3>
                    Unable To Load Featured Products
                  </h3>

                  <p>
                    {featuredError}
                  </p>

                </div>

              )}


            {!featuredLoading &&
              !featuredError &&
              featuredProducts.length === 0 && (

                <div className="featured-message">

                  <i className="bi bi-box-seam"></i>

                  <h3>
                    No Featured Products
                  </h3>

                  <p>
                    Products will appear here soon.
                  </p>

                </div>

              )}


            {!featuredLoading &&
              !featuredError &&
              featuredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}


          </div>

        </div>

      </section>


      {/* =====================================================
          OUR SERVICES
      ===================================================== */}

      <section className="services-section">

        <div className="services-orbit services-orbit-left"></div>

        <div className="services-orbit services-orbit-right"></div>


        <div className="section-container">


          <div className="section-heading services-heading">

            <div>

              <span className="section-label">
                DISCOVER
              </span>

              <h2>
                OUR SERVICES
              </h2>

              <p>
                Reliable mobile services from
                experienced technicians.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/services")
              }
            >
              VIEW ALL
            </button>

          </div>


          <div className="services-grid">


            <ServiceCard
              icon="bi-tools"
              number="01"
              title="Mobile Repair"
              text="Professional mobile repair services."
              onClick={() =>
                navigate(
                  "/services#repair-request"
                )
              }
            />


            <ServiceCard
              icon="bi-phone"
              number="02"
              title="Screen Replacement"
              text="Quality screen replacement service."
              onClick={() =>
                navigate(
                  "/services#repair-request"
                )
              }
            />


            <ServiceCard
              icon="bi-cpu"
              number="03"
              title="Software Services"
              text="Software and mobile issue solutions."
              onClick={() =>
                navigate(
                  "/services#repair-request"
                )
              }
            />


            <ServiceCard
              icon="bi-shield-check"
              number="04"
              title="Phone Unlocking"
              text="Professional software assistance."
              onClick={() =>
                navigate(
                  "/services#repair-request"
                )
              }
            />


          </div>

        </div>

      </section>


    </main>

  );
}


/* =========================================================
   CATEGORY COMPONENT
========================================================= */

function Category({
  icon,
  title,
  onClick
}) {

  return (

    <div
      className="category-card"

      onClick={onClick}

      role="button"

      tabIndex={0}

      onKeyDown={(event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          onClick();

        }

      }}
    >

      <div className="category-icon">

        <i
          className={`bi ${icon}`}
        ></i>

      </div>


      <span>
        {title}
      </span>

    </div>

  );
}


/* =========================================================
   PRODUCT COMPONENT
========================================================= */

function ProductCard({
  product
}) {

  const {
    isInWishlist,
    toggleWishlist
  } = useWishlist();


  function formatPrice(price) {

    return `₹${Number(
      price
    ).toLocaleString("en-IN")}`;

  }


  return (

    <article className="product-card">


      {product.badge && (

        <span className="product-badge">
          {product.badge}
        </span>

      )}


      <button
        type="button"

        className={`wishlist-button ${
          isInWishlist(product.id)
            ? "wishlist-active"
            : ""
        }`}

        onClick={() =>
          toggleWishlist(product)
        }

        aria-label={
          isInWishlist(product.id)
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
      >

        <i
          className={
            isInWishlist(product.id)
              ? "bi bi-heart-fill"
              : "bi bi-heart"
          }
        ></i>

      </button>


      <div className="product-image">

        {product.image ? (

          <img
            src={product.image}
            alt={product.name}

            className="home-product-image"

            onError={(event) => {

              event.currentTarget.style.display =
                "none";

              const placeholder =
                event.currentTarget
                  .parentElement
                  .querySelector(
                    ".home-product-placeholder"
                  );

              if (placeholder) {

                placeholder.style.display =
                  "flex";

              }

            }}
          />

        ) : null}


        <div
          className="home-product-placeholder"

          style={{
            display:
              product.image
                ? "none"
                : "flex",
          }}
        >

          <i className="bi bi-phone"></i>

        </div>

      </div>


      <div className="product-info">

        <span className="product-brand">
          {product.brand}
        </span>


        <h3>
          {product.name}
        </h3>


        <div
          className="product-stars"
          aria-label="Rated 4.5 out of 5"
        >

          ★★★★★

          <span>
            4.5
          </span>

        </div>


        <div className="product-price">

          <strong>
            {formatPrice(product.price)}
          </strong>


          {product.oldPrice && (

            <del>
              {formatPrice(
                product.oldPrice
              )}
            </del>

          )}


          {product.discount && (

            <span>
              {product.discount}
            </span>

          )}

        </div>


        <Link
          to={`/mobiles/${product.id}`}
          className="product-view-button"
        >

          VIEW DETAILS

          <i className="bi bi-arrow-right"></i>

        </Link>

      </div>

    </article>

  );
}


/* =========================================================
   SERVICE COMPONENT
========================================================= */

function ServiceCard({
  icon,
  number,
  title,
  text,
  onClick
}) {

  return (

    <article className="service-card">


      <div className="service-card-top">

        <span className="service-number">
          {number}
        </span>

        <div className="service-icon">

          <i
            className={`bi ${icon}`}
          ></i>

        </div>

      </div>


      <div className="service-card-content">

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>


      <button
        type="button"
        onClick={onClick}
        className="service-discover-button"
      >

        DISCOVER

        <i className="bi bi-arrow-up-right"></i>

      </button>


    </article>

  );
}


export default Home;