import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">

        <section className="cart-empty">

          <div className="cart-empty-icon">
            <i className="bi bi-bag-x"></i>
          </div>

          <h1>Your Cart Is Empty</h1>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link to="/mobiles">
            CONTINUE SHOPPING
          </Link>

        </section>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* PAGE HEADER */}

      <section className="cart-header">

        <div className="cart-header-content">

          <p>Sri Laxmi Mobiles</p>

          <h1>Your Shopping Cart</h1>

          <span>
            {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
          </span>

        </div>

      </section>


      {/* CART CONTENT */}

      <section className="cart-content">

        <div className="cart-layout">

          {/* CART ITEMS */}

          <div className="cart-items-section">

            <div className="cart-items-header">

              <strong>
                CART ITEMS
              </strong>

              <button
                type="button"
                onClick={clearCart}
              >
                CLEAR CART
              </button>

            </div>


            {cartItems.map((item) => (

              <article
                className="cart-item"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="cart-item-image">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <i className="bi bi-phone"></i>
                  )}

                </div>


                {/* INFORMATION */}

                <div className="cart-item-info">

                  <span>
                    {item.brand}
                  </span>

                  <h2>
                    {item.name}
                  </h2>

                  <div className="cart-item-price">

                    ₹{item.price.toLocaleString("en-IN")}

                  </div>


                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* ITEM TOTAL / REMOVE */}

                <div className="cart-item-right">

                  <strong>
                    ₹{(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    <i className="bi bi-trash3"></i>

                    REMOVE
                  </button>

                </div>

              </article>

            ))}


            <Link
              to="/mobiles"
              className="cart-continue-shopping"
            >
              <i className="bi bi-arrow-left"></i>

              CONTINUE SHOPPING
            </Link>

          </div>


          {/* ORDER SUMMARY */}

          <aside className="cart-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            <div className="cart-summary-row">

              <span>
                Products
              </span>

              <strong>
                {cartCount}
              </strong>

            </div>


            <div className="cart-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="cart-summary-row">

              <span>
                Delivery
              </span>

              <strong className="cart-free">
                FREE
              </strong>

            </div>


            <div className="cart-summary-divider"></div>


            <div className="cart-total-row">

              <span>
                TOTAL
              </span>

              <strong>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            <Link
              to="/checkout"
              className="cart-checkout-button"
            >
              PROCEED TO ORDER
            </Link>


            <p className="cart-delivery-note">

              <i className="bi bi-geo-alt-fill"></i>

              Delivery available within Chincholli
              local area / up to 5 km from the shop.

            </p>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default Cart;