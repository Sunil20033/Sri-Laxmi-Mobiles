import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import "./Wishlist.css";

function Wishlist() {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  function handleAddToCart(product) {
    addToCart(product);

    toast.success(
      `${product.name} added to cart`
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">

        <section className="wishlist-empty">

          <div className="wishlist-empty-icon">
            <i className="bi bi-heart"></i>
          </div>

          <h1>Your Wishlist Is Empty</h1>

          <p>
            Save your favourite mobile products here
            for easy access later.
          </p>

          <Link to="/mobiles">
            EXPLORE MOBILES
          </Link>

        </section>

      </div>
    );
  }

  return (
    <div className="wishlist-page">

      {/* PAGE HEADER */}

      <section className="wishlist-header">

        <div className="wishlist-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            My Wishlist
          </h1>

          <span>
            {wishlistCount} saved product
            {wishlistCount !== 1 ? "s" : ""}
          </span>

        </div>

      </section>


      {/* WISHLIST CONTENT */}

      <section className="wishlist-content">

        <div className="wishlist-topbar">

          <strong>
            SAVED PRODUCTS
          </strong>

          <button
            type="button"
            onClick={clearWishlist}
          >
            CLEAR WISHLIST
          </button>

        </div>


        <div className="wishlist-grid">

          {wishlistItems.map((product) => (

            <article
              className="wishlist-card"
              key={product.id}
            >

              {/* IMAGE */}

              <div className="wishlist-image">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <i className="bi bi-phone"></i>
                )}

              </div>


              {/* DETAILS */}

              <div className="wishlist-card-content">

                <span className="wishlist-brand">
                  {product.brand}
                </span>

                <h2>
                  {product.name}
                </h2>

                <div className="wishlist-rating">
                  ★★★★★

                  <span>
                    {product.rating}
                  </span>
                </div>


                <div className="wishlist-price">

                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                  <del>
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </del>

                  <span>
                    {product.discount}
                  </span>

                </div>


                {/* ACTIONS */}

                <div className="wishlist-actions">

                  <Link
                    to={`/mobiles/${product.id}`}
                    className="wishlist-view-button"
                  >
                    VIEW DETAILS
                  </Link>

                  <button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    <i className="bi bi-bag"></i>

                    ADD TO CART
                  </button>

                  <button
                    type="button"
                    className="wishlist-remove-button"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>


        <Link
          to="/mobiles"
          className="wishlist-continue"
        >
          <i className="bi bi-arrow-left"></i>

          CONTINUE SHOPPING
        </Link>

      </section>

    </div>
  );
}

export default Wishlist;