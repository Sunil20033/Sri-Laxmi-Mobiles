import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

const API_URL = "https://sri-laxmi-mobiles-backend.onrender.com/api/wishlist";

const WISHLIST_STORAGE_KEY = "sriLaxmiWishlist";

const WISHLIST_KEY_STORAGE = "sriLaxmiWishlistKey";

const BACKEND_LOAD_DELAY = 2500;
const REQUEST_TIMEOUT = 15000;

function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}

// =========================================================
// GET OLD LOCAL WISHLIST
// =========================================================

function getStoredWishlist() {

  try {

    const storedWishlist =
      localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );


    if (!storedWishlist) {
      return [];
    }


    const parsedWishlist =
      JSON.parse(storedWishlist);


    return Array.isArray(parsedWishlist)
      ? parsedWishlist
      : [];

  } catch (error) {

    console.error(
      "Unable to load wishlist:",
      error
    );

    return [];
  }
}


// =========================================================
// GET / CREATE WISHLIST KEY
// =========================================================

function getWishlistKey() {

  let wishlistKey =
    localStorage.getItem(
      WISHLIST_KEY_STORAGE
    );


  if (!wishlistKey) {

    wishlistKey =
      `wishlist-${crypto.randomUUID()}`;

    localStorage.setItem(
      WISHLIST_KEY_STORAGE,
      wishlistKey
    );
  }


  return wishlistKey;
}


// =========================================================
// CONVERT BACKEND WISHLIST ITEM
// TO FRONTEND PRODUCT
// =========================================================

function convertBackendWishlistItem(
  wishlistItem
) {

  return wishlistItem.product;
}


// =========================================================
// WISHLIST PROVIDER
// =========================================================

export function WishlistProvider({
  children,
}) {

  const [
    wishlistItems,
    setWishlistItems,
  ] = useState(
    getStoredWishlist
  );


  const [
    wishlistKey,
    setWishlistKey,
  ] = useState(null);


  const [
    backendReady,
    setBackendReady,
  ] = useState(false);


  // =======================================================
  // CREATE / LOAD WISHLIST KEY
  // =======================================================

  useEffect(() => {

    const key =
      getWishlistKey();

    setWishlistKey(key);

  }, []);


  // =======================================================
  // SAVE LOCAL CACHE
  // =======================================================

  useEffect(() => {

    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);


  // =======================================================
  // LOAD WISHLIST FROM BACKEND
  // =======================================================

  useEffect(() => {

    if (!wishlistKey) {
      return;
    }


    async function loadBackendWishlist() {

      // Give Home and other page data a chance to start first.
      // Wishlist data is already available from localStorage immediately.
      await new Promise((resolve) =>
        setTimeout(resolve, BACKEND_LOAD_DELAY)
      );

      try {

        const response =
      await fetchWithTimeout(
            `${API_URL}?wishlistKey=${encodeURIComponent(
              wishlistKey
            )}`
          );


        if (!response.ok) {

          throw new Error(
            "Unable to load backend wishlist."
          );
        }


        const backendData =
          await response.json();


        // =================================================
        // MIGRATE OLD LOCAL WISHLIST
        // =================================================

        if (
          backendData.length === 0 &&
          wishlistItems.length > 0
        ) {

          console.log(
            "Migrating existing local wishlist to backend..."
          );


          for (
            const product of wishlistItems
          ) {

            try {

              await fetch(
                `${API_URL}?wishlistKey=${encodeURIComponent(
                  wishlistKey
                )}&productId=${product.id}`,
                {
                  method: "POST",
                }
              );

            } catch (migrationError) {

              console.error(
                "Unable to migrate wishlist item:",
                migrationError
              );
            }
          }


          // Reload backend wishlist

          const reloadResponse =
            await fetch(
              `${API_URL}?wishlistKey=${encodeURIComponent(
                wishlistKey
              )}`
            );


          if (!reloadResponse.ok) {

            throw new Error(
              "Unable to reload wishlist."
            );
          }


          const migratedWishlist =
            await reloadResponse.json();


          setWishlistItems(
            migratedWishlist.map(
              convertBackendWishlistItem
            )
          );

        } else {

          // =============================================
          // BACKEND IS SOURCE OF TRUTH
          // =============================================

          setWishlistItems(
            backendData.map(
              convertBackendWishlistItem
            )
          );
        }


        setBackendReady(true);

      } catch (error) {

        console.error(
          "Unable to connect to wishlist backend:",
          error
        );

        // Keep existing local wishlist
        // if backend is unavailable.

        setBackendReady(false);
      }
    }


    loadBackendWishlist();

  }, [wishlistKey]);


  // =======================================================
  // REFRESH BACKEND WISHLIST
  // =======================================================

  async function refreshBackendWishlist() {

    if (!wishlistKey) {
      return;
    }


    const response =
      await fetch(
        `${API_URL}?wishlistKey=${encodeURIComponent(
          wishlistKey
        )}`
      );


    if (!response.ok) {

      throw new Error(
        "Unable to refresh wishlist."
      );
    }


    const data =
      await response.json();


    setWishlistItems(
      data.map(
        convertBackendWishlistItem
      )
    );
  }


  // =======================================================
  // CHECK PRODUCT
  // =======================================================

  function isInWishlist(productId) {

    return wishlistItems.some(
      (item) =>
        item.id === productId
    );
  }


  // =======================================================
  // TOGGLE WISHLIST
  // =======================================================

  async function toggleWishlist(
    product
  ) {

    if (!wishlistKey) {
      return;
    }


    const alreadyExists =
      isInWishlist(product.id);


    try {

      if (alreadyExists) {

        // ===============================================
        // REMOVE
        // ===============================================

        const response =
          await fetch(
            `${API_URL}/${product.id}?wishlistKey=${encodeURIComponent(
              wishlistKey
            )}`,
            {
              method: "DELETE",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Unable to remove wishlist item."
          );
        }

      } else {

        // ===============================================
        // ADD
        // ===============================================

        const response =
          await fetch(
            `${API_URL}?wishlistKey=${encodeURIComponent(
              wishlistKey
            )}&productId=${product.id}`,
            {
              method: "POST",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Unable to add wishlist item."
          );
        }
      }


      await refreshBackendWishlist();

    } catch (error) {

      console.error(
        "Wishlist update failed:",
        error
      );
    }
  }


  // =======================================================
  // REMOVE FROM WISHLIST
  // =======================================================

  async function removeFromWishlist(
    productId
  ) {

    if (!wishlistKey) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_URL}/${productId}?wishlistKey=${encodeURIComponent(
            wishlistKey
          )}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to remove wishlist item."
        );
      }


      await refreshBackendWishlist();

    } catch (error) {

      console.error(
        "Remove from wishlist failed:",
        error
      );
    }
  }


  // =======================================================
  // CLEAR WISHLIST
  // =======================================================

  async function clearWishlist() {

    if (!wishlistKey) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_URL}?wishlistKey=${encodeURIComponent(
            wishlistKey
          )}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to clear wishlist."
        );
      }


      setWishlistItems([]);

    } catch (error) {

      console.error(
        "Clear wishlist failed:",
        error
      );
    }
  }


  // =======================================================
  // WISHLIST COUNT
  // =======================================================

  const wishlistCount =
    useMemo(
      () =>
        wishlistItems.length,
      [wishlistItems]
    );


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    wishlistItems,

    wishlistCount,

    isInWishlist,

    toggleWishlist,

    removeFromWishlist,

    clearWishlist,

    backendReady,
  };


  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}


// =========================================================
// USE WISHLIST
// =========================================================

export function useWishlist() {

  const context =
    useContext(WishlistContext);


  if (!context) {

    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }


  return context;
}