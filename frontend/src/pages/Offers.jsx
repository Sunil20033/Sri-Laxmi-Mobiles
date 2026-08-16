import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import "./Offers.css";


const API_URL =
  "http://localhost:8081/api/offers";


const DEFAULT_OFFER = {

  mainVisualText: "SCREEN PROTECTOR",

  mainVisualIcon: "bi bi-shield-check",
  
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

  active: true,
};


function Offers() {


  const [
    offer,
    setOffer
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  const [
    timeLeft,
    setTimeLeft
  ] = useState(null);


  // =========================
  // LOAD ACTIVE OFFER
  // =========================

  useEffect(() => {

    async function loadOffer() {

      try {

        setLoading(true);

        setError("");


        const response =
          await fetch(API_URL);


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


        setError(
          "Unable to load the latest offer. Showing the current offer."
        );


        setOffer(
          DEFAULT_OFFER
        );

      } finally {

        setLoading(false);

      }

    }


    loadOffer();

  }, []);


  // =========================
  // COUNTDOWN
  // =========================

  useEffect(() => {

    if (!offer) {
      return;
    }


    function calculateTimeLeft() {

      const endDate =
        new Date(
          offer.endDate
        );


      const difference =
        endDate.getTime() -
        new Date().getTime();


      if (
        Number.isNaN(
          endDate.getTime()
        ) ||
        difference <= 0
      ) {

        return {

          days: 0,

          hours: 0,

          minutes: 0,

          seconds: 0,

          expired: true,

        };

      }


      return {

        days:
          Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
          ),

        hours:
          Math.floor(
            (difference /
              (1000 * 60 * 60)) %
              24
          ),

        minutes:
          Math.floor(
            (difference /
              (1000 * 60)) %
              60
          ),

        seconds:
          Math.floor(
            (difference /
              1000) %
              60
          ),

        expired: false,

      };

    }


    setTimeLeft(
      calculateTimeLeft()
    );


    const timer =
      setInterval(() => {

        setTimeLeft(
          calculateTimeLeft()
        );

      }, 1000);


    return () =>
      clearInterval(timer);

  }, [offer]);


  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(value) {

    if (!value) {
      return "-";
    }


    const date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "-";

    }


    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  }


  // =========================
  // IMAGE ERROR
  // =========================

  function hideBrokenImage(event) {

    event.currentTarget.style.display =
      "none";


    const fallback =
      event.currentTarget
        .nextElementSibling;


    if (fallback) {

      fallback.style.display =
        "flex";

    }

  }


  if (loading) {

    return (

      <main className="offers-page">

        <section className="offers-loading">

          <i className="bi bi-arrow-repeat"></i>

          <h2>
            Loading Offers...
          </h2>

          <p>
            Please wait while we load
            our latest special offer.
          </p>

        </section>

      </main>

    );

  }


  return (

    <main className="offers-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="offers-hero">

        <div className="offers-hero-content">

          <span className="offers-label">
            SRI LAXMI MOBILES
          </span>


          <h1>
            Special Offers
          </h1>


          <p>
            Exclusive offers and special deals
            available at Sri Laxmi Mobiles.
          </p>

        </div>

      </section>


      {error && (

        <div className="offers-api-message">

          <i className="bi bi-info-circle"></i>

          {error}

        </div>

      )}


      {/* =================================================
          MAIN OFFER
      ================================================= */}

      <section className="main-offer-section">

        <div className="main-offer-card">


          {/* BADGE */}

          <div className="offer-badge">

            {offer.badge ||
              "SPECIAL OFFER"}

          </div>


          {/* MAIN OFFER VISUAL */}

          <div className="offer-main-visual">

            <div className="offer-main-icon">

              <i
                className={
                  offer.mainVisualIcon ||
                  "bi bi-shield-check"
                }
              ></i>

            </div>

            <span>
              {offer.mainVisualText ||
                "SCREEN PROTECTOR"}
            </span>

          </div>


          {/* TITLE */}

          <h2>

            {offer.title ||
              DEFAULT_OFFER.title}

          </h2>


          {/* FREE */}

          <div className="free-text">

            {offer.freeText ||
              "FREE"}

          </div>


          {/* FREE ITEMS */}

          <div className="free-items">


            {/* ITEM 1 */}

            <div className="free-item">

              <div className="free-icon-wrapper">


                {offer.freeItem1Image ? (

                  <img
                    src={
                      offer.freeItem1Image
                    }
                    alt={
                      offer.freeItem1Name
                    }
                    onError={
                      hideBrokenImage
                    }
                  />

                ) : null}


                <div
                  className="free-icon"
                  style={{
                    display:
                      offer.freeItem1Image
                        ? "none"
                        : "flex",
                  }}
                >

                  <i className="bi bi-headphones"></i>

                </div>


              </div>


              <h3>

                {offer.freeItem1Name ||
                  "OnePlus Wired Earphone"}

              </h3>


              <p>

                {offer.freeItem1Text ||
                  "FREE"}

              </p>

            </div>


            {/* PLUS */}

            <div className="plus-symbol">
              +
            </div>


            {/* ITEM 2 */}

            <div className="free-item">

              <div className="free-icon-wrapper">


                {offer.freeItem2Image ? (

                  <img
                    src={
                      offer.freeItem2Image
                    }
                    alt={
                      offer.freeItem2Name
                    }
                    onError={
                      hideBrokenImage
                    }
                  />

                ) : null}


                <div
                  className="free-icon"
                  style={{
                    display:
                      offer.freeItem2Image
                        ? "none"
                        : "flex",
                  }}
                >

                  <i className="bi bi-controller"></i>

                </div>


              </div>


              <h3>

                {offer.freeItem2Name ||
                  "Gaming Finger Gloves"}

              </h3>


              <p>

                {offer.freeItem2Text ||
                  "One Pair FREE"}

              </p>

            </div>


          </div>


          {/* DATES */}

          <div className="offer-date">


            <div>

              <strong>
                OFFER STARTS
              </strong>

              <span>
                {formatDate(
                  offer.startDate
                )}
              </span>

            </div>


            <div>

              <strong>
                OFFER ENDS
              </strong>

              <span>
                {formatDate(
                  offer.endDate
                )}
              </span>

            </div>


          </div>


          {/* COUNTDOWN */}

          <div className="countdown-title">

            OFFER ENDS IN

          </div>


          {timeLeft &&
          !timeLeft.expired ? (

            <div className="countdown">


              <div className="countdown-box">

                <strong>
                  {String(
                    timeLeft.days
                  ).padStart(2, "0")}
                </strong>

                <span>
                  DAYS
                </span>

              </div>


              <div className="countdown-box">

                <strong>
                  {String(
                    timeLeft.hours
                  ).padStart(2, "0")}
                </strong>

                <span>
                  HOURS
                </span>

              </div>


              <div className="countdown-box">

                <strong>
                  {String(
                    timeLeft.minutes
                  ).padStart(2, "0")}
                </strong>

                <span>
                  MINS
                </span>

              </div>


              <div className="countdown-box">

                <strong>
                  {String(
                    timeLeft.seconds
                  ).padStart(2, "0")}
                </strong>

                <span>
                  SECS
                </span>

              </div>


            </div>

          ) : (

            <div className="offer-expired">

              OFFER ENDED

            </div>

          )}


          {/* NOTE */}

          <div className="offer-note">

            <i className="bi bi-info-circle-fill"></i>


            <p>

              {offer.note ||
                "Offer available for a limited time only."}

              {" "}

              {offer.shopMessage ||
                "Visit Sri Laxmi Mobiles in Chincholli to avail this offer."}

            </p>

          </div>


          {/* ACTION */}

          <Link
            to="/contact"
            className="offer-action"
          >

            <i className="bi bi-geo-alt-fill"></i>

            Visit Shop

          </Link>


        </div>

      </section>


      {/* =================================================
          TERMS
      ================================================= */}

      <section className="offer-terms">

        <div className="terms-container">


          <span className="section-label">
            OFFER INFORMATION
          </span>


          <h2>
            Offer Terms & Conditions
          </h2>


          <div className="terms-grid">


            <div className="term-card">

              <i className="bi bi-calendar-check"></i>

              <h3>
                Validity
              </h3>

              <p>

                Valid from{" "}

                {formatDate(
                  offer.startDate
                )}

                {" "}to{" "}

                {formatDate(
                  offer.endDate
                )}

              </p>

            </div>


            <div className="term-card">

              <i className="bi bi-gift"></i>

              <h3>
                Free Gifts
              </h3>

              <p>

                Get{" "}

                {offer.freeItem1Name ||
                  "the first free item"}

                {" "}and{" "}

                {offer.freeItem2Name ||
                  "the second free item"}.

              </p>

            </div>


            <div className="term-card">

              <i className="bi bi-shop"></i>

              <h3>
                Shop Visit
              </h3>

              <p>

                {offer.shopMessage ||
                  "Customers are requested to visit our shop to avail the offer."}

              </p>

            </div>


            <div className="term-card">

              <i className="bi bi-clock-history"></i>

              <h3>
                Limited Time
              </h3>

              <p>
                This offer is available only
                during the specified offer period.
              </p>

            </div>


          </div>

        </div>

      </section>


    </main>

  );
}


export default Offers;