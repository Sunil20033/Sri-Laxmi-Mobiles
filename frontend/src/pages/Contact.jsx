import "./Contact.css";


function Contact() {

  const phoneNumber = "9035300355";

  const whatsappLink =
    "https://wa.me/919035300355";

  const mapsLink =
    "https://maps.app.goo.gl/nGzZoD9cwZPydedJA?g_st=ac";

  const facebookLink =
    "https://www.facebook.com/share/19LqaDdQ9d/";

  const youtubeLink =
    "https://youtube.com/@laxmimobiles01?si=GIzVc8FiuCPdACLa";


  return (

    <main className="contact-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-decoration contact-decoration-one">
        </div>

        <div className="contact-hero-decoration contact-decoration-two">
        </div>


        <div className="contact-hero-content">

          <span className="contact-eyebrow">
            GET IN TOUCH
          </span>

          <h1>
            Contact Us
          </h1>

          <p>
            Your Mobile Needs, Our Priority
          </p>

          <div className="contact-hero-line">
          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK CONTACT CARDS
      ===================================================== */}

      <section className="contact-quick-section">

        <div className="contact-container">

          <div className="contact-quick-grid">


            {/* CALL */}

            <a
              href={`tel:${phoneNumber}`}
              className="contact-quick-card"
            >

              <div className="contact-quick-icon">

                <i className="bi bi-telephone-fill"></i>

              </div>

              <div>

                <span>
                  CALL US
                </span>

                <h3>
                  9035300355
                </h3>

                <p>
                  Tap to call the shop
                </p>

              </div>

            </a>


            {/* WHATSAPP */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-quick-card contact-whatsapp-card"
            >

              <div className="contact-quick-icon">

                <i className="bi bi-whatsapp"></i>

              </div>

              <div>

                <span>
                  WHATSAPP
                </span>

                <h3>
                  Chat With Us
                </h3>

                <p>
                  Message us directly
                </p>

              </div>

            </a>


            {/* LOCATION */}

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-quick-card"
            >

              <div className="contact-quick-icon">

                <i className="bi bi-geo-alt-fill"></i>

              </div>

              <div>

                <span>
                  FIND US
                </span>

                <h3>
                  Chincholli
                </h3>

                <p>
                  Open in Google Maps
                </p>

              </div>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTACT AREA
      ===================================================== */}

      <section className="contact-main-section">

        <div className="contact-container">

          <div className="contact-main-grid">


            {/* =================================================
                SHOP INFORMATION
            ================================================= */}

            <div className="contact-information-card">

              <div className="contact-section-heading">

                <span>
                  SRI LAXMI MOBILES
                </span>

                <h2>
                  Visit Our Store
                </h2>

                <p>
                  We are here to help you with your
                  mobile, accessories and service needs.
                </p>

              </div>


              <div className="contact-information-list">


                {/* ADDRESS */}

                <div className="contact-information-item">

                  <div className="contact-information-icon">

                    <i className="bi bi-geo-alt-fill"></i>

                  </div>

                  <div>

                    <span>
                      SHOP ADDRESS
                    </span>

                    <strong>
                      Chincholli Court Opposite,
                      Beside Dr. Siddaraj Hospital Chincholi - 585 307
                    </strong>

                    <p>
                      Chincholli, Kalaburagi,
                      Karnataka
                    </p>

                  </div>

                </div>


                {/* PHONE */}

                <div className="contact-information-item">

                  <div className="contact-information-icon">

                    <i className="bi bi-telephone-fill"></i>

                  </div>

                  <div>

                    <span>
                      PHONE
                    </span>

                    <a href={`tel:${phoneNumber}`}>
                      9035300355
                    </a>

                    <p>
                      Available during shop hours
                    </p>

                  </div>

                </div>


                {/* WHATSAPP */}

                <div className="contact-information-item">

                  <div className="contact-information-icon">

                    <i className="bi bi-whatsapp"></i>

                  </div>

                  <div>

                    <span>
                      WHATSAPP
                    </span>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat With Sri Laxmi Mobiles
                    </a>

                    <p>
                      Quick enquiries and assistance
                    </p>

                  </div>

                </div>


                {/* TIMING */}

                <div className="contact-information-item">

                  <div className="contact-information-icon">

                    <i className="bi bi-clock-fill"></i>

                  </div>

                  <div>

                    <span>
                      SHOP TIMING
                    </span>

                    <strong>
                      9:00 AM – 9:00 PM
                    </strong>

                    <p>
                      Open every day
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                LOCATION CARD
            ================================================= */}

            <div className="contact-location-card">

              <div className="contact-location-top">

                <span>
                  OUR LOCATION
                </span>

                <h2>
                  Find Us Easily
                </h2>

                <p>
                  Visit Sri Laxmi Mobiles at
                  Chincholli and get the right
                  mobile solution for you.
                </p>

              </div>


              <div className="contact-map-placeholder">

                <div className="contact-map-pattern">
                </div>

                <div className="contact-map-content">

                  <div className="contact-map-pin">

                    <i className="bi bi-geo-alt-fill"></i>

                  </div>

                  <h3>
                    Sri Laxmi Mobiles
                  </h3>

                  <p>
                    Chincholli, Kalaburagi
                  </p>

                  <span>
                    Karnataka
                  </span>

                </div>

              </div>


              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-button"
              >

                <i className="bi bi-map-fill"></i>

                OPEN IN GOOGLE MAPS

                <i className="bi bi-arrow-up-right"></i>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SHOP HOURS
      ===================================================== */}

      <section className="contact-hours-section">

        <div className="contact-container">

          <div className="contact-hours-card">

            <div className="contact-hours-icon">

              <i className="bi bi-clock-history"></i>

            </div>

            <div className="contact-hours-content">

              <span>
                STORE HOURS
              </span>

              <h2>
                We're Ready To Serve You
              </h2>

              <p>
                Visit us anytime between
                <strong> 9:00 AM and 9:00 PM</strong>.
              </p>

            </div>

            <div className="contact-hours-time">

              <strong>
                9:00 AM
              </strong>

              <span>
                TO
              </span>

              <strong>
                9:00 PM
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SOCIAL MEDIA
      ===================================================== */}

      <section className="contact-social-section">

        <div className="contact-container">

          <div className="contact-social-heading">

            <span>
              STAY CONNECTED
            </span>

            <h2>
              Follow Sri Laxmi Mobiles
            </h2>

            <p>
              Stay updated with our latest products,
              offers and mobile services.
            </p>

          </div>


          <div className="contact-social-grid">


            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/laxmi_mobiles_01/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >

              <div className="contact-social-icon">

                <i className="bi bi-instagram"></i>

              </div>

              <div>

                <span>
                  INSTAGRAM
                </span>

                <h3>
                  Laxmi Mobiles
                </h3>

                <p>
                  @laxmi_mobiles_01
                </p>

              </div>

              <i className="bi bi-arrow-up-right contact-social-arrow">
              </i>

            </a>


            {/* FACEBOOK */}

            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >

              <div className="contact-social-icon">

                <i className="bi bi-facebook"></i>

              </div>

              <div>

                <span>
                  FACEBOOK
                </span>

                <h3>
                  Laxmi Mobile's
                </h3>

                <p>
                  Visit our Facebook profile
                </p>

              </div>

              <i className="bi bi-arrow-up-right contact-social-arrow">
              </i>

            </a>


            {/* YOUTUBE */}

            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >

              <div className="contact-social-icon">

                <i className="bi bi-youtube"></i>

              </div>

              <div>

                <span>
                  YOUTUBE
                </span>

                <h3>
                  Laxmi Mobiles
                </h3>

                <p>
                  Watch our latest videos
                </p>

              </div>

              <i className="bi bi-arrow-up-right contact-social-arrow">
              </i>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="contact-final-section">

        <div className="contact-container">

          <div className="contact-final-card">

            <div className="contact-final-content">

              <span>
                NEED HELP WITH YOUR MOBILE?
              </span>

              <h2>
                We're Just A Call Away
              </h2>

              <p>
                Whether you are looking for a new
                mobile, accessories or reliable
                mobile services, visit Sri Laxmi Mobiles.
              </p>

            </div>


            <div className="contact-final-actions">

              <a
                href={`tel:${phoneNumber}`}
                className="contact-final-call"
              >

                <i className="bi bi-telephone-fill"></i>

                CALL NOW

              </a>


              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-final-whatsapp"
              >

                <i className="bi bi-whatsapp"></i>

                WHATSAPP

              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


export default Contact;