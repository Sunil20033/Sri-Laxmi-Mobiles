import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./Reviews.css";


const REVIEW_API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com/api/reviews";


function Reviews() {

  // =========================================================
  // REVIEWS
  // =========================================================

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================================
  // FORM
  // =========================================================

  const [customerName, setCustomerName] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [hoverRating, setHoverRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [submitMessage, setSubmitMessage] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");


  // =========================================================
  // LOAD REVIEWS
  // =========================================================

  async function loadReviews() {

    try {

      setLoading(true);
      setError("");

      const response =
        await axios.get(
          REVIEW_API_URL
        );

      setReviews(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (requestError) {

      console.error(
        "Unable to load reviews:",
        requestError
      );

      setError(
        "Unable to load reviews right now."
      );

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    loadReviews();

  }, []);


  // =========================================================
  // CALCULATE AVERAGE
  // =========================================================

  const averageRating = useMemo(() => {

    if (reviews.length === 0) {
      return 0;
    }

    const total =
      reviews.reduce(
        (sum, review) =>
          sum + Number(review.rating || 0),
        0
      );

    return total / reviews.length;

  }, [reviews]);


  // =========================================================
  // RATING STARS
  // =========================================================

  function renderStars(value, interactive = false) {

    return (
      <div
        className={
          interactive
            ? "reviews-rating-selector"
            : "reviews-stars"
        }
      >

        {[1, 2, 3, 4, 5].map(
          (star) => (

            <button
              key={star}
              type={
                interactive
                  ? "button"
                  : undefined
              }
              className={
                interactive
                  ? `rating-star-button ${
                      star <=
                      (hoverRating || rating)
                        ? "active"
                        : ""
                    }`
                  : `review-star ${
                      star <= value
                        ? "filled"
                        : ""
                    }`
              }
              onClick={
                interactive
                  ? () => setRating(star)
                  : undefined
              }
              onMouseEnter={
                interactive
                  ? () => setHoverRating(star)
                  : undefined
              }
              onMouseLeave={
                interactive
                  ? () => setHoverRating(0)
                  : undefined
              }
              aria-label={
                interactive
                  ? `Give ${star} out of 5 stars`
                  : undefined
              }
            >

              ★

            </button>

          )
        )}

      </div>
    );
  }


  // =========================================================
  // SUBMIT REVIEW
  // =========================================================

  async function handleSubmit(event) {

    event.preventDefault();

    setSubmitMessage("");
    setSubmitError("");


    if (!customerName.trim()) {

      setSubmitError(
        "Please enter your name."
      );

      return;
    }


    if (rating === 0) {

      setSubmitError(
        "Please select a rating."
      );

      return;
    }


    if (!comment.trim()) {

      setSubmitError(
        "Please write your review."
      );

      return;
    }


    try {

      setSubmitting(true);


      const response =
        await axios.post(
          REVIEW_API_URL,
          {
            customerName:
              customerName.trim(),

            rating,

            comment:
              comment.trim()
          }
        );


      if (response.data) {

        setReviews(
          (currentReviews) => [
            response.data,
            ...currentReviews
          ]
        );
      }


      setCustomerName("");
      setRating(0);
      setHoverRating(0);
      setComment("");


      setSubmitMessage(
        "Thank you! Your review has been submitted successfully."
      );


    } catch (requestError) {

      console.error(
        "Unable to submit review:",
        requestError
      );


      const serverMessage =
        requestError?.response?.data;


      setSubmitError(
        typeof serverMessage === "string"
          ? serverMessage
          : "Unable to submit your review. Please try again."
      );

    } finally {

      setSubmitting(false);
    }
  }


  // =========================================================
  // FORMAT DATE
  // =========================================================

  function formatDate(dateValue) {

    if (!dateValue) {
      return "";
    }

    const date =
      new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );
  }


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <main className="reviews-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="reviews-hero">

        <div className="reviews-hero-content">

          <span className="reviews-eyebrow">
            CUSTOMER REVIEWS
          </span>

          <h1>
            What Our Customers Say
          </h1>

          <p>
            Your experience matters to us.
            Read what our customers have to say
            and share your own experience with
            Sri Laxmi Mobiles.
          </p>

        </div>

      </section>


      {/* =====================================================
          RATING SUMMARY
      ===================================================== */}

      <section className="reviews-summary-section">

        <div className="reviews-container">

          <div className="reviews-summary-card">

            <div className="reviews-summary-rating">

              <strong>
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "—"}
              </strong>

              <div className="summary-stars">

                {renderStars(
                  Math.round(averageRating)
                )}

              </div>

              <span>
                {reviews.length}{" "}
                {reviews.length === 1
                  ? "review"
                  : "reviews"}
              </span>

            </div>


            <div className="reviews-summary-divider">
            </div>


            <div className="reviews-summary-message">

              <div className="summary-icon">

                <i className="bi bi-chat-heart"></i>

              </div>

              <div>

                <h3>
                  We Value Your Feedback
                </h3>

                <p>
                  Every review helps us improve
                  our products and services.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WRITE REVIEW + REVIEWS
      ===================================================== */}

      <section className="reviews-main-section">

        <div className="reviews-container">

          <div className="reviews-layout">


            {/* =================================================
                WRITE REVIEW
            ================================================= */}

            <aside className="review-form-card">

              <div className="review-form-heading">

                <span>
                  SHARE YOUR EXPERIENCE
                </span>

                <h2>
                  Write a Review
                </h2>

                <p>
                  Tell us about your experience
                  at Sri Laxmi Mobiles.
                </p>

              </div>


              <form
                onSubmit={handleSubmit}
                className="review-form"
              >

                {/* NAME */}

                <div className="review-form-field">

                  <label htmlFor="customerName">
                    Your Name
                  </label>

                  <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                    maxLength={100}
                    disabled={submitting}
                  />

                </div>


                {/* RATING */}

                <div className="review-form-field">

                  <label>
                    Your Rating
                  </label>

                  {renderStars(
                    rating,
                    true
                  )}

                  <span className="rating-help">

                    {rating === 0
                      ? "Select your rating"
                      : `${rating} out of 5 stars`}

                  </span>

                </div>


                {/* COMMENT */}

                <div className="review-form-field">

                  <label htmlFor="reviewComment">
                    Your Review
                  </label>

                  <textarea
                    id="reviewComment"
                    value={comment}
                    onChange={(event) =>
                      setComment(
                        event.target.value
                      )
                    }
                    placeholder="Share your experience..."
                    rows="6"
                    maxLength={1000}
                    disabled={submitting}
                  />

                  <span className="character-count">
                    {comment.length}/1000
                  </span>

                </div>


                {/* SUCCESS */}

                {submitMessage && (

                  <div className="review-success-message">

                    <i className="bi bi-check-circle-fill"></i>

                    <span>
                      {submitMessage}
                    </span>

                  </div>

                )}


                {/* ERROR */}

                {submitError && (

                  <div className="review-error-message">

                    <i className="bi bi-exclamation-circle-fill"></i>

                    <span>
                      {submitError}
                    </span>

                  </div>

                )}


                <button
                  type="submit"
                  className="review-submit-button"
                  disabled={submitting}
                >

                  {submitting
                    ? "SUBMITTING..."
                    : "SUBMIT REVIEW"}

                  {!submitting && (
                    <i className="bi bi-arrow-right"></i>
                  )}

                </button>

              </form>

            </aside>


            {/* =================================================
                REVIEW LIST
            ================================================= */}

            <div className="reviews-list-section">

              <div className="reviews-list-heading">

                <div>

                  <span>
                    CUSTOMER FEEDBACK
                  </span>

                  <h2>
                    Recent Reviews
                  </h2>

                </div>

                <div className="reviews-count-badge">

                  {reviews.length}

                </div>

              </div>


              {/* LOADING */}

              {loading && (

                <div className="reviews-empty-state">

                  <div className="reviews-loading-icon">

                    <i className="bi bi-arrow-repeat"></i>

                  </div>

                  <h3>
                    Loading Reviews...
                  </h3>

                  <p>
                    Please wait while we load
                    customer feedback.
                  </p>

                </div>

              )}


              {/* ERROR */}

              {!loading && error && (

                <div className="reviews-empty-state error-state">

                  <div className="reviews-loading-icon">

                    <i className="bi bi-exclamation-triangle"></i>

                  </div>

                  <h3>
                    Unable To Load Reviews
                  </h3>

                  <p>
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={loadReviews}
                    className="reviews-retry-button"
                  >
                    TRY AGAIN
                  </button>

                </div>

              )}


              {/* NO REVIEWS */}

              {!loading &&
                !error &&
                reviews.length === 0 && (

                  <div className="reviews-empty-state">

                    <div className="reviews-loading-icon">

                      <i className="bi bi-chat-heart"></i>

                    </div>

                    <h3>
                      Be The First To Review
                    </h3>

                    <p>
                      There are no customer reviews
                      yet. Share your experience
                      with Sri Laxmi Mobiles.
                    </p>

                  </div>

                )}


              {/* REVIEWS */}

              {!loading &&
                !error &&
                reviews.length > 0 && (

                  <div className="reviews-list">

                    {reviews.map(
                      (review) => (

                        <article
                          className="review-card"
                          key={review.id}
                        >

                          <div className="review-card-top">

                            <div className="review-customer">

                              <div className="customer-avatar">

                                {review.customerName
                                  ?.charAt(0)
                                  ?.toUpperCase() || "C"}

                              </div>

                              <div>

                                <h3>
                                  {review.customerName}
                                </h3>

                                <span>
                                  {formatDate(
                                    review.createdAt
                                  )}
                                </span>

                              </div>

                            </div>


                            <div className="review-card-rating">

                              {renderStars(
                                Number(
                                  review.rating
                                )
                              )}

                            </div>

                          </div>


                          <div className="review-card-body">

                            <p>
                              “{review.comment}”
                            </p>

                          </div>


                          <div className="review-card-footer">

                            <span>
                              <i className="bi bi-check-circle-fill"></i>
                              Customer Review
                            </span>

                          </div>

                        </article>

                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="reviews-bottom-section">

        <div className="reviews-container">

          <div className="reviews-bottom-card">

            <div>

              <span>
                SRI LAXMI MOBILES
              </span>

              <h2>
                Thank You For Choosing Us
              </h2>

              <p>
                Your trust and feedback help us
                serve you better every day.
              </p>

            </div>

            <div className="reviews-bottom-icon">

              <i className="bi bi-heart-fill"></i>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


export default Reviews;