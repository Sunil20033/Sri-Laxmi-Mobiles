import { Link } from "react-router-dom";
import "./AboutUs.css";
import lmLogo from "../assets/lm-mobile-logo.png";

function AboutUs() {
  return (
    <main className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">

          <span className="about-eyebrow">
            SRI LAXMI MOBILES
          </span>

          <h1>
            About <span>Us</span>
          </h1>

          <p>
            Smart Choices. Trusted Service.
          </p>

          <div className="about-hero-actions">

            <Link
              to="/mobiles"
              className="about-primary-button"
            >
              EXPLORE MOBILES
              <i className="bi bi-arrow-right"></i>
            </Link>

            <a
              href="tel:9035300355"
              className="about-secondary-button"
            >
              CALL US
              <i className="bi bi-telephone-fill"></i>
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          SHOP INTRODUCTION
      ===================================================== */}

      <section className="about-intro-section">

        <div className="about-container">

          <div className="about-intro-grid">

            <div className="about-intro-content">

              <span className="about-section-label">
                WELCOME TO SRI LAXMI MOBILES
              </span>

              <h2>
                Your Mobile Needs,
                <span> Our Priority</span>
              </h2>

              <p>
                All types of mobiles and accessories,
                all in one place.
              </p>

              <p>
                Find the right mobile and accessories for
                your everyday needs at Sri Laxmi Mobiles.
              </p>


              {/* OWNER */}

              <div className="about-owner-box">

                <div className="about-owner-icon">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div>

                  <span>
                    SHOP OWNER
                  </span>

                  <strong>
                    Kashinath Pitlor
                  </strong>

                </div>

              </div>


              {/* SHOP HOURS */}

              <div className="about-hours-box">

                <div className="about-hours-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>

                <div>

                  <span>
                    SHOP TIMINGS
                  </span>

                  <strong>
                    9:00 AM — 9:00 PM
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                SHOP CARD
            ================================================= */}

            <div className="about-intro-card">

              <div className="about-card-glow"></div>


              {/* LM MOBILE LOGO */}

              <div
                className="about-shop-icon"
                style={{
                  width: "118px",
                  height: "118px",
                  padding: 0,
                  overflow: "hidden",
                  background: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >

                <img
                  src={lmLogo}
                  alt="Sri Laxmi Mobiles LM Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />

              </div>


              <span className="about-card-small">
                SRI LAXMI
              </span>

              <h3>
                MOBILES
              </h3>

              <p>
                Smart Choices. Trusted Service.
              </p>


              <div className="about-card-divider"></div>


              <div className="about-card-services">

                <span>
                  <i className="bi bi-phone"></i>
                  Mobiles
                </span>

                <span>
                  <i className="bi bi-headphones"></i>
                  Accessories
                </span>

              </div>


              <div className="about-card-divider"></div>


              <span className="about-card-trusted">
                YOUR TRUSTED MOBILE STORE
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT WE OFFER
      ===================================================== */}

      <section className="about-products-section">

        <div className="about-container">

          <div className="about-heading">

            <span className="about-section-label">
              WHAT WE OFFER
            </span>

            <h2>
              Everything You Need
              <span> For Your Mobile</span>
            </h2>

            <p>
              Explore our range of mobiles and accessories
              available at Sri Laxmi Mobiles.
            </p>

          </div>


          <div className="about-product-grid">

            <div className="about-product-card">

              <div className="about-product-icon">
                <i className="bi bi-phone-fill"></i>
              </div>

              <div>

                <span>
                  01
                </span>

                <h3>
                  All Types Of Mobiles
                </h3>

                <p>
                  Explore different types of mobile phones
                  available at our store.
                </p>

              </div>

            </div>


            <div className="about-product-card">

              <div className="about-product-icon">
                <i className="bi bi-headphones"></i>
              </div>

              <div>

                <span>
                  02
                </span>

                <h3>
                  All Types Of Accessories
                </h3>

                <p>
                  Find useful mobile accessories for your
                  everyday needs.
                </p>

              </div>

            </div>


            <div className="about-product-card">

              <div className="about-product-icon">
                <i className="bi bi-shop"></i>
              </div>

              <div>

                <span>
                  03
                </span>

                <h3>
                  Visit Our Store
                </h3>

                <p>
                  Visit us in Chincholli and explore our
                  available mobiles and accessories.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="about-why-section">

        <div className="about-container">

          <div className="about-heading">

            <span className="about-section-label">
              WHY CHOOSE US
            </span>

            <h2>
              Simple. Reliable.
              <span> Customer Focused.</span>
            </h2>

            <p>
              We aim to make your mobile shopping experience
              simple and convenient.
            </p>

          </div>


          <div className="about-feature-grid">

            <article className="about-feature-card">

              <div className="about-feature-icon">
                <i className="bi bi-phone"></i>
              </div>

              <h3>
                Mobile Phones
              </h3>

              <p>
                All types of mobile phones available at our
                store.
              </p>

            </article>


            <article className="about-feature-card">

              <div className="about-feature-icon">
                <i className="bi bi-headphones"></i>
              </div>

              <h3>
                Accessories
              </h3>

              <p>
                A wide range of mobile accessories for your
                everyday requirements.
              </p>

            </article>


            <article className="about-feature-card">

              <div className="about-feature-icon">
                <i className="bi bi-clock"></i>
              </div>

              <h3>
                Convenient Timing
              </h3>

              <p>
                Open from 9:00 AM to 9:00 PM.
              </p>

            </article>


            <article className="about-feature-card">

              <div className="about-feature-icon">
                <i className="bi bi-person-check"></i>
              </div>

              <h3>
                Customer Focused
              </h3>

              <p>
                We are committed to helping customers with
                their mobile needs.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          SOCIAL MEDIA
      ===================================================== */}

      <section className="about-social-section">

        <div className="about-container">

          <div className="about-social-card">

            <div className="about-social-heading">

              <span className="about-section-label">
                FOLLOW US
              </span>

              <h2>
                Stay Connected
                <span> With Us</span>
              </h2>

            </div>


            <div className="about-social-grid">

              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/laxmi_mobiles_01"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-item"
              >

                <i className="bi bi-instagram"></i>

                <div>

                  <strong>
                    Instagram
                  </strong>

                  <span>
                    @laxmi_mobiles_01
                  </span>

                </div>

                <i className="bi bi-arrow-up-right"></i>

              </a>


              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/share/19LqaDdQ9d/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-item"
              >

                <i className="bi bi-facebook"></i>

                <div>

                  <strong>
                    Facebook
                  </strong>

                  <span>
                    Laxmi Mobile's
                  </span>

                </div>

                <i className="bi bi-arrow-up-right"></i>

              </a>


              {/* YOUTUBE */}

              <a
                href="https://youtube.com/@laxmimobiles01?si=GIzVc8FiuCPdACLa"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-item"
              >

                <i className="bi bi-youtube"></i>

                <div>

                  <strong>
                    YouTube
                  </strong>

                  <span>
                    Laxmi Mobiles
                  </span>

                </div>

                <i className="bi bi-arrow-up-right"></i>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="about-contact-section">

        <div className="about-contact-card">

          <span className="about-section-label">
            GET IN TOUCH
          </span>

          <h2>
            Need A Mobile Or Accessory?
          </h2>

          <p>
            Call Sri Laxmi Mobiles or visit our store in
            Chincholli.
          </p>


          <div className="about-contact-details">

            <a
              href="tel:9035300355"
              className="about-contact-item"
            >

              <i className="bi bi-telephone-fill"></i>

              <span>
                9035300355
              </span>

            </a>


            <a
              href="https://wa.me/919035300355"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-item"
            >

              <i className="bi bi-whatsapp"></i>

              <span>
                WhatsApp
              </span>

            </a>

          </div>


          <div className="about-contact-actions">

            <a
              href="tel:9035300355"
              className="about-primary-button"
            >
              CALL NOW
              <i className="bi bi-telephone-fill"></i>
            </a>


            <a
              href="https://wa.me/919035300355"
              target="_blank"
              rel="noopener noreferrer"
              className="about-secondary-button"
            >
              WHATSAPP
              <i className="bi bi-whatsapp"></i>
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL LOCATION
      ===================================================== */}

      <section className="about-location-section">

        <div className="about-container">

          <div className="about-location-card">

            <div className="about-location-content">

              <span className="about-section-label">
                FIND US
              </span>

              <h2>
                Visit Sri Laxmi
                <span> Mobiles</span>
              </h2>

              <p>
                Come visit us at Chincholli Court,
                beside Dr. Siddaraj Hospital, Chincholli.
              </p>


              <div className="about-full-address">

                <i className="bi bi-geo-alt-fill"></i>

                <div>

                  <strong>
                    Sri Laxmi Mobiles
                  </strong>

                  <span>
                    Chincholli Court, Beside Dr. Siddaraj Hospital
                  </span>

                  <span>
                    Chincholli, Kalaburagi, Karnataka
                  </span>

                </div>

              </div>


              <div className="about-location-info">

                <div>

                  <i className="bi bi-clock-fill"></i>

                  <span>

                    <strong>
                      OPENING HOURS
                    </strong>

                    9:00 AM — 9:00 PM

                  </span>

                </div>


                <div>

                  <i className="bi bi-telephone-fill"></i>

                  <span>

                    <strong>
                      PHONE
                    </strong>

                    9035300355

                  </span>

                </div>

              </div>


              <a
                href="https://maps.app.goo.gl/nGzZoD9cwZPydedJA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="about-map-button"
              >

                <i className="bi bi-geo-alt-fill"></i>

                OPEN IN GOOGLE MAPS

                <i className="bi bi-arrow-up-right"></i>

              </a>

            </div>


            <div className="about-map-visual">

              <div className="about-map-pattern">

                <div className="about-map-pin">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>

                <span>
                  CHINCHOLLI
                </span>

                <small>
                  KALABURAGI • KARNATAKA
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AboutUs;