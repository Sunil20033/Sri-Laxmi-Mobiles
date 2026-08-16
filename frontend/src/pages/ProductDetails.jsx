import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./ProductDetails.css";

import { useCart } from "../context/CartContext";

import { toast } from "react-toastify";

import { useWishlist } from "../context/WishlistContext";


const API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com/api/products";


/* =========================================================
   ACCESSORY CATEGORIES

   These categories are treated as Accessories.
   Everything else is treated as a Mobile product.
========================================================= */

const ACCESSORY_CATEGORIES = [
  "Earbuds",
  "Earphones",
  "Chargers",
  "Cables",
  "Power Banks",
  "Smart Watches",
  "Covers",
  "Screen Protectors",
  "Speakers",
  "Gaming",
  "Car Accessories",
  "Mobile Accessories",
];


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  /* =========================================================
     CART
  ========================================================= */

  const {
    addToCart,
  } = useCart();


  /* =========================================================
     WISHLIST
  ========================================================= */

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();


  /* =========================================================
     STATE
  ========================================================= */

  const [
    product,
    setProduct,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState(false);


  const [
    buyingNow,
    setBuyingNow,
  ] = useState(false);


  /* =========================================================
     LOAD PRODUCT
  ========================================================= */

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);

        setError(false);


        const response =
          await axios.get(
            `${API_URL}/${id}`
          );


        setProduct(
          response.data
        );


      } catch (error) {

        console.error(
          "Error loading product:",
          error
        );


        setProduct(null);

        setError(true);


      } finally {

        setLoading(false);

      }

    };


    loadProduct();

  }, [id]);


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="product-not-found">

        <div className="product-not-found-icon">

          <i className="bi bi-hourglass-split"></i>

        </div>


        <h1>
          Loading Product...
        </h1>


        <p>
          Please wait while we load the product details.
        </p>

      </div>

    );

  }


  /* =========================================================
     PRODUCT NOT FOUND
  ========================================================= */

  if (error || !product) {

    return (

      <div className="product-not-found">

        <div className="product-not-found-icon">

          <i className="bi bi-phone"></i>

        </div>


        <h1>
          Product Not Found
        </h1>


        <p>
          The product you are looking for
          is not available.
        </p>


        <Link to="/mobiles">
          BACK TO PRODUCTS
        </Link>

      </div>

    );

  }


  /* =========================================================
     PRODUCT VALUES
  ========================================================= */

  const price =
    Number(product.price || 0);


  const oldPrice =
    Number(product.oldPrice || 0);


  const discount =
    product.discount || "";


  const stock =
    product.stock !== false;


  /* =========================================================
     DETERMINE PRODUCT TYPE
  ========================================================= */

  const productCategory =
    product.category
      ? product.category.trim()
      : "";


  const isAccessory =
    ACCESSORY_CATEGORIES.some(
      (category) =>
        category.toLowerCase() ===
        productCategory.toLowerCase()
    );


  const listingPath =
    isAccessory
      ? "/accessories"
      : "/mobiles";


  const listingName =
    isAccessory
      ? "Accessories"
      : "Mobiles";


  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {

    if (!stock) {
      return;
    }


    addToCart(product);


    toast.success(
      `${product.name} added to cart`
    );

  };


  /* =========================================================
     BUY NOW
     
     Buy Now uses the existing cart/checkout flow.
     
     1. Add the selected product to cart.
     2. Open Checkout.
     
     This keeps Mobile and Accessories using
     the same checkout system.
  ========================================================= */

  const handleBuyNow = () => {

    if (!stock || buyingNow) {
      return;
    }


    try {

      setBuyingNow(true);


      addToCart(product);


      toast.success(
        `${product.name} added to cart`
      );


      navigate("/checkout");


    } catch (error) {

      console.error(
        "Buy Now failed:",
        error
      );


      toast.error(
        "Unable to continue to checkout."
      );


      setBuyingNow(false);

    }

  };


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div>


      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="product-breadcrumb">

        <Link to="/">
          Home
        </Link>


        <i className="bi bi-chevron-right"></i>


        <Link to={listingPath}>
          {listingName}
        </Link>


        <i className="bi bi-chevron-right"></i>


        <span>
          {product.name}
        </span>

      </div>



      {/* =====================================================
          PRODUCT MAIN
      ===================================================== */}

      <section className="product-details-container">


        <div className="product-details-card">


          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="product-details-image">


            {product.badge && (

              <span className="product-details-badge">
                {product.badge}
              </span>

            )}


            {product.image ? (

              <img
                src={product.image}
                alt={product.name}
              />

            ) : (

              <div className="product-details-placeholder">

                <i
                  className={
                    isAccessory
                      ? "bi bi-headphones"
                      : "bi bi-phone"
                  }
                ></i>

              </div>

            )}

          </div>



          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="product-details-info">


            {/* BRAND */}

            <span className="product-details-brand">

              {product.brand}

            </span>



            {/* PRODUCT NAME */}

            <h1>
              {product.name}
            </h1>



            {/* =================================================
                RATING
            ================================================= */}

            <div className="product-details-rating">

              <span className="rating-stars">
                ★★★★★
              </span>


              <strong>
                -
              </strong>


              <span>
                Customer Rating
              </span>

            </div>



            <div className="product-details-divider"></div>



            {/* =================================================
                PRICE
            ================================================= */}

            <div className="product-details-price">

              <strong>

                ₹
                {price.toLocaleString("en-IN")}

              </strong>


              {oldPrice > 0 && (

                <del>

                  ₹
                  {oldPrice.toLocaleString("en-IN")}

                </del>

              )}


              {discount && (

                <span>
                  {discount}
                </span>

              )}

            </div>



            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div className="product-availability">

              <i
                className={
                  stock
                    ? "bi bi-check-circle-fill"
                    : "bi bi-x-circle-fill"
                }
              ></i>


              <span>

                {stock
                  ? "In Stock"
                  : "Currently Unavailable"}

              </span>

            </div>



            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="product-description">

              {product.description ||
                `${product.brand} ${product.name} is available at Sri Laxmi Mobiles.`}

            </p>



            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="product-details-actions">


              {/* =================================================
                  WISHLIST
              ================================================= */}

              <button
                type="button"
                className={`product-wishlist-button ${
                  isInWishlist(product.id)
                    ? "wishlist-button-active"
                    : ""
                }`}
                onClick={() =>
                  toggleWishlist(product)
                }
                aria-label={
                  isInWishlist(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
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



              {/* =================================================
                  ADD TO CART
              ================================================= */}

              <button
                type="button"
                className="product-cart-button"
                disabled={!stock}
                onClick={handleAddToCart}
              >

                <i className="bi bi-bag"></i>


                {stock
                  ? "ADD TO CART"
                  : "OUT OF STOCK"}

              </button>



              {/* =================================================
                  BUY NOW
              ================================================= */}

              <button
                type="button"
                className="product-buy-button"
                disabled={!stock || buyingNow}
                onClick={handleBuyNow}
              >

                {buyingNow
                  ? "PROCESSING..."
                  : "BUY NOW"}

              </button>


            </div>


          </div>


        </div>



        {/* =====================================================
            PRODUCT INFORMATION
        ===================================================== */}

        <div className="product-information-card">


          <div className="product-information-header">

            <h2>
              PRODUCT INFORMATION
            </h2>

          </div>



          <div className="product-specifications">


            {/* BRAND */}

            <div className="product-spec-row">

              <span>
                Brand
              </span>


              <strong>
                {product.brand}
              </strong>

            </div>



            {/* PRODUCT */}

            <div className="product-spec-row">

              <span>
                Product
              </span>


              <strong>
                {product.name}
              </strong>

            </div>



            {/* CATEGORY */}

            <div className="product-spec-row">

              <span>
                Category
              </span>


              <strong>
                {product.category || "-"}
              </strong>

            </div>



            {/* SELLING PRICE */}

            <div className="product-spec-row">

              <span>
                Selling Price
              </span>


              <strong>

                ₹
                {price.toLocaleString("en-IN")}

              </strong>

            </div>



            {/* ORIGINAL PRICE */}

            <div className="product-spec-row">

              <span>
                Original Price
              </span>


              <strong>

                ₹
                {oldPrice.toLocaleString("en-IN")}

              </strong>

            </div>



            {/* DISCOUNT */}

            <div className="product-spec-row">

              <span>
                Discount
              </span>


              <strong>
                {discount || "-"}
              </strong>

            </div>



            {/* AVAILABILITY */}

            <div className="product-spec-row">

              <span>
                Availability
              </span>


              <strong>

                {stock
                  ? "In Stock"
                  : "Currently Unavailable"}

              </strong>

            </div>


          </div>


        </div>



        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <Link
          to={listingPath}
          className="product-back-button"
        >

          <i className="bi bi-arrow-left"></i>


          BACK TO {listingName.toUpperCase()}

        </Link>


      </section>


    </div>

  );

}


export default ProductDetails;