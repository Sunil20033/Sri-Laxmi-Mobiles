import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const API_URL = "https://sri-laxmi-mobiles-backend.onrender.com/api/cart";

const CART_STORAGE_KEY = "sriLaxmiCart";

const CART_KEY_STORAGE = "sriLaxmiCartKey";


// =========================================================
// GET OLD LOCAL CART
// =========================================================

function getStoredCart() {
  try {
    const storedCart =
      localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart =
      JSON.parse(storedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];

  } catch (error) {

    console.error(
      "Unable to load cart:",
      error
    );

    return [];
  }
}


// =========================================================
// GET / CREATE CART KEY
// =========================================================

function getCartKey() {

  let cartKey =
    localStorage.getItem(
      CART_KEY_STORAGE
    );


  if (!cartKey) {

    cartKey =
      `cart-${crypto.randomUUID()}`;

    localStorage.setItem(
      CART_KEY_STORAGE,
      cartKey
    );
  }


  return cartKey;
}


// =========================================================
// CONVERT BACKEND CART ITEM
// TO FRONTEND CART ITEM
// =========================================================

function convertBackendCartItem(
  cartItem
) {

  return {
    ...cartItem.product,

    quantity:
      cartItem.quantity,
  };
}


// =========================================================
// CART PROVIDER
// =========================================================

export function CartProvider({
  children,
}) {

  const [
    cartItems,
    setCartItems,
  ] = useState(
    getStoredCart
  );


  const [
    cartKey,
    setCartKey,
  ] = useState(null);


  const [
    backendReady,
    setBackendReady,
  ] = useState(false);


  // =======================================================
  // CREATE / LOAD CART KEY
  // =======================================================

  useEffect(() => {

    const key = getCartKey();

    setCartKey(key);

  }, []);


  // =======================================================
  // SAVE LOCAL CACHE
  // =======================================================

  useEffect(() => {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );

  }, [cartItems]);


  // =======================================================
  // LOAD CART FROM BACKEND
  // =======================================================

  useEffect(() => {

    if (!cartKey) {
      return;
    }


    async function loadBackendCart() {

      try {

        const response =
          await fetch(
            `${API_URL}?cartKey=${encodeURIComponent(
              cartKey
            )}`
          );


        if (!response.ok) {
          throw new Error(
            "Unable to load backend cart."
          );
        }


        const backendData =
          await response.json();


        // ===============================================
        // OLD LOCAL CART MIGRATION
        // ===============================================

        if (
          backendData.length === 0 &&
          cartItems.length > 0
        ) {

          console.log(
            "Migrating existing local cart to backend..."
          );


          for (
            const item of cartItems
          ) {

            try {

              const addResponse =
                await fetch(
                  `${API_URL}?cartKey=${encodeURIComponent(
                    cartKey
                  )}&productId=${item.id}`,
                  {
                    method: "POST",
                  }
                );


              if (!addResponse.ok) {
                continue;
              }


              // Add remaining quantity

              for (
                let i = 1;
                i < item.quantity;
                i++
              ) {

                await fetch(
                  `${API_URL}?cartKey=${encodeURIComponent(
                    cartKey
                  )}&productId=${item.id}`,
                  {
                    method: "POST",
                  }
                );

              }

            } catch (migrationError) {

              console.error(
                "Unable to migrate cart item:",
                migrationError
              );
            }
          }


          // Reload backend cart

          const reloadResponse =
            await fetch(
              `${API_URL}?cartKey=${encodeURIComponent(
                cartKey
              )}`
            );


          const migratedCart =
            await reloadResponse.json();


          setCartItems(
            migratedCart.map(
              convertBackendCartItem
            )
          );

        } else {

          // =============================================
          // BACKEND IS SOURCE OF TRUTH
          // =============================================

          setCartItems(
            backendData.map(
              convertBackendCartItem
            )
          );
        }


        setBackendReady(true);

      } catch (error) {

        console.error(
          "Unable to connect to cart backend:",
          error
        );

        // Keep existing local cart
        // if backend is unavailable.

        setBackendReady(false);
      }
    }


    loadBackendCart();

  }, [cartKey]);


  // =======================================================
  // REFRESH BACKEND CART
  // =======================================================

  async function refreshBackendCart() {

    if (!cartKey) {
      return;
    }


    const response =
      await fetch(
        `${API_URL}?cartKey=${encodeURIComponent(
          cartKey
        )}`
      );


    if (!response.ok) {
      throw new Error(
        "Unable to refresh cart."
      );
    }


    const data =
      await response.json();


    setCartItems(
      data.map(
        convertBackendCartItem
      )
    );
  }


  // =======================================================
  // ADD TO CART
  // =======================================================

  async function addToCart(product) {

    if (!cartKey) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_URL}?cartKey=${encodeURIComponent(
            cartKey
          )}&productId=${product.id}`,
          {
            method: "POST",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to add product to cart."
        );
      }


      await refreshBackendCart();

    } catch (error) {

      console.error(
        "Add to cart failed:",
        error
      );
    }
  }


  // =======================================================
  // INCREASE QUANTITY
  // =======================================================

  async function increaseQuantity(
    productId
  ) {

    const currentItem =
      cartItems.find(
        (item) =>
          item.id === productId
      );


    if (!currentItem) {
      return;
    }


    const newQuantity =
      currentItem.quantity + 1;


    try {

      const response =
        await fetch(
          `${API_URL}/${productId}?cartKey=${encodeURIComponent(
            cartKey
          )}&quantity=${newQuantity}`,
          {
            method: "PUT",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to increase quantity."
        );
      }


      await refreshBackendCart();

    } catch (error) {

      console.error(
        "Increase quantity failed:",
        error
      );
    }
  }


  // =======================================================
  // DECREASE QUANTITY
  // =======================================================

  async function decreaseQuantity(
    productId
  ) {

    const currentItem =
      cartItems.find(
        (item) =>
          item.id === productId
      );


    if (!currentItem) {
      return;
    }


    const newQuantity =
      currentItem.quantity - 1;


    try {

      // ===============================================
      // QUANTITY BECOMES ZERO
      // → REMOVE ITEM
      // ===============================================

      if (newQuantity <= 0) {

        const response =
          await fetch(
            `${API_URL}/${productId}?cartKey=${encodeURIComponent(
              cartKey
            )}`,
            {
              method: "DELETE",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Unable to remove cart item."
          );
        }

      } else {

        // =============================================
        // UPDATE QUANTITY
        // =============================================

        const response =
          await fetch(
            `${API_URL}/${productId}?cartKey=${encodeURIComponent(
              cartKey
            )}&quantity=${newQuantity}`,
            {
              method: "PUT",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Unable to decrease quantity."
          );
        }
      }


      await refreshBackendCart();

    } catch (error) {

      console.error(
        "Decrease quantity failed:",
        error
      );
    }
  }


  // =======================================================
  // REMOVE FROM CART
  // =======================================================

  async function removeFromCart(
    productId
  ) {

    try {

      const response =
        await fetch(
          `${API_URL}/${productId}?cartKey=${encodeURIComponent(
            cartKey
          )}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to remove product."
        );
      }


      await refreshBackendCart();

    } catch (error) {

      console.error(
        "Remove from cart failed:",
        error
      );
    }
  }


  // =======================================================
  // CLEAR CART
  // =======================================================

  async function clearCart() {

    // Keep a copy of the current items.
    // We may need these IDs if the backend
    // bulk DELETE endpoint does not work.
    const itemsToClear = [...cartItems];


    // =====================================================
    // CLEAR FRONTEND IMMEDIATELY
    // =====================================================

    setCartItems([]);

    localStorage.removeItem(
      CART_STORAGE_KEY
    );


    // If there is no backend cart or there
    // are no products, we are already done.
    if (
      !cartKey ||
      itemsToClear.length === 0
    ) {
      return;
    }


    try {

      // ===================================================
      // FIRST TRY BULK DELETE
      // ===================================================

      const response =
        await fetch(
          `${API_URL}?cartKey=${encodeURIComponent(
            cartKey
          )}`,
          {
            method: "DELETE",
          }
        );


      // Backend successfully cleared the cart.
      if (response.ok) {

        console.log(
          "Cart cleared successfully."
        );

        return;
      }


      // ===================================================
      // FALLBACK
      // DELETE ITEMS ONE BY ONE
      // ===================================================

      console.warn(
        "Bulk clear cart failed. Trying individual item deletion."
      );


      await Promise.all(

        itemsToClear.map(
          async (item) => {

            try {

              const itemResponse =
                await fetch(
                  `${API_URL}/${item.id}?cartKey=${encodeURIComponent(
                    cartKey
                  )}`,
                  {
                    method: "DELETE",
                  }
                );


              if (!itemResponse.ok) {

                console.error(
                  `Unable to remove cart item ${item.id}.`
                );

              }

            } catch (itemError) {

              console.error(
                `Unable to remove cart item ${item.id}:`,
                itemError
              );

            }
          }
        )

      );

    } catch (error) {

      // The frontend cart is already empty.
      // Do not restore the old products if
      // the backend is unavailable.

      console.error(
        "Clear cart backend request failed. Cart was cleared locally:",
        error
      );
    }
  }


  // =======================================================
  // CART COUNT
  // =======================================================

  const cartCount =
    useMemo(
      () =>
        cartItems.reduce(
          (
            total,
            item
          ) =>
            total +
            item.quantity,
          0
        ),
      [cartItems]
    );


  // =======================================================
  // CART SUBTOTAL
  // =======================================================

  const cartSubtotal =
    useMemo(
      () =>
        cartItems.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(item.price || 0) *
              item.quantity,
          0
        ),
      [cartItems]
    );


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    cartItems,

    cartCount,

    cartSubtotal,

    addToCart,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    clearCart,

    backendReady,
  };


  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}


// =========================================================
// USE CART
// =========================================================

export function useCart() {

  const context =
    useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }


  return context;
}