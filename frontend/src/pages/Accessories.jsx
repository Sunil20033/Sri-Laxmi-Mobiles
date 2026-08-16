import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

import "./Accessories.css";


const API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com/api/products";


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


function Accessories() {


  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] =
    useState([]);


  // =========================
  // URL CATEGORY
  // =========================

  const [
    searchParams,
    setSearchParams
  ] = useSearchParams();


  const urlCategory =
    searchParams.get("category");


  // =========================
  // FILTERS
  // =========================

  const [
    selectedCategories,
    setSelectedCategories
  ] = useState([]);


  const [
    selectedPrices,
    setSelectedPrices
  ] = useState([]);


  const [
    inStockOnly,
    setInStockOnly
  ] = useState(false);


  // =========================
  // SORT
  // =========================

  const [sortOption, setSortOption] =
    useState("recommended");


  // =========================
  // SEARCH / MOBILE FILTERS
  // =========================

  const [searchTerm, setSearchTerm] =
    useState("");


  const [
    showMobileFilters,
    setShowMobileFilters
  ] = useState(false);


  // =========================
  // LOADING / ERROR
  // =========================

  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  // =========================
  // LOAD PRODUCTS
  // =========================

  async function loadProducts() {

    try {

      setLoading(true);

      setError("");


      const response =
        await fetch(API_URL);


      if (!response.ok) {

        throw new Error(
          "Unable to load products."
        );

      }


      const data =
        await response.json();


      /*
      =====================================
      KEEP ONLY ACCESSORY PRODUCTS
      =====================================
      */

      const accessoryProducts =
        Array.isArray(data)
          ? data.filter(
              (product) =>
                ACCESSORY_CATEGORIES.some(
                  (category) =>
                    category.toLowerCase() ===
                    String(
                      product.category || ""
                    )
                      .trim()
                      .toLowerCase()
                )
            )
          : [];


      setProducts(
        accessoryProducts
      );


    } catch (error) {

      console.error(
        "Error loading accessories:",
        error
      );


      setError(
        "Unable to load accessories. Please make sure the backend is running."
      );


      setProducts([]);


    } finally {

      setLoading(false);

    }

  }


  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

    loadProducts();

  }, []);


  // =========================
  // APPLY HOME PAGE CATEGORY
  // =========================

  useEffect(() => {

    if (!urlCategory) {

      return;

    }


    const matchingCategory =
      ACCESSORY_CATEGORIES.find(
        (category) =>
          category.toLowerCase() ===
          String(urlCategory)
            .trim()
            .toLowerCase()
      );


    if (matchingCategory) {

      setSelectedCategories(
        [matchingCategory]
      );

    }

  }, [urlCategory]);


  // =========================
  // CATEGORY FILTER
  // =========================

  function handleCategoryChange(
    category
  ) {

    setSelectedCategories(
      (current) => {

        if (
          current.includes(category)
        ) {

          /*
          If the category came from
          Home page, remove it from
          the URL as well.
          */

          if (
            urlCategory &&
            urlCategory.toLowerCase() ===
            category.toLowerCase()
          ) {

            setSearchParams({});

          }


          return current.filter(
            (item) =>
              item !== category
          );

        }


        /*
        Add selected category.
        */

        const updatedCategories = [
          ...current,
          category,
        ];


        /*
        If this is the category
        selected from Home page,
        keep URL synchronized.
        */

        if (
          updatedCategories.length === 1
        ) {

          setSearchParams({
            category,
          });

        }


        return updatedCategories;

      }
    );

  }


  // =========================
  // PRICE FILTER
  // =========================

  function handlePriceChange(
    priceRange
  ) {

    setSelectedPrices(
      (current) => {

        if (
          current.includes(priceRange)
        ) {

          return current.filter(
            (item) =>
              item !== priceRange
          );

        }


        return [
          ...current,
          priceRange,
        ];

      }
    );

  }


  // =========================
  // CLEAR ALL FILTERS
  // =========================

  function clearFilters() {

    setSelectedCategories([]);

    setSelectedPrices([]);

    setInStockOnly(false);

    setSortOption("recommended");

    setSearchTerm("");


    /*
    Remove ?category=...
    from URL.
    */

    setSearchParams({});

  }


  // =========================
  // FILTER + SORT
  // =========================

  const filteredProducts =
    useMemo(() => {

      let result = [
        ...products
      ];


      // =========================
      // SEARCH
      // =========================

      if (searchTerm.trim()) {

        const search =
          searchTerm.trim().toLowerCase();


        result =
          result.filter(
            (product) =>
              String(product.name || "")
                .toLowerCase()
                .includes(search) ||

              String(product.category || "")
                .toLowerCase()
                .includes(search)
          );

      }


      // =========================
      // CATEGORY
      // =========================

      if (
        selectedCategories.length > 0
      ) {

        result =
          result.filter(
            (product) =>
              selectedCategories.some(
                (category) =>
                  category.toLowerCase() ===
                  String(
                    product.category || ""
                  )
                    .trim()
                    .toLowerCase()
              )
          );

      }


      // =========================
      // PRICE
      // =========================

      if (
        selectedPrices.length > 0
      ) {

        result =
          result.filter(
            (product) => {

              const price =
                Number(
                  product.price || 0
                );


              return selectedPrices.some(
                (range) => {

                  if (
                    range === "under500"
                  ) {

                    return price < 500;

                  }


                  if (
                    range === "500to1000"
                  ) {

                    return (
                      price >= 500 &&
                      price <= 1000
                    );

                  }


                  if (
                    range === "1000to2000"
                  ) {

                    return (
                      price > 1000 &&
                      price <= 2000
                    );

                  }


                  if (
                    range === "above2000"
                  ) {

                    return price > 2000;

                  }


                  return true;

                }
              );

            }
          );

      }


      // =========================
      // STOCK
      // =========================

      if (inStockOnly) {

        result =
          result.filter(
            (product) =>
              product.stock === true
          );

      }


      // =========================
      // SORT
      // =========================

      if (
        sortOption === "lowToHigh"
      ) {

        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );

      }


      if (
        sortOption === "highToLow"
      ) {

        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );

      }


      if (
        sortOption === "newest"
      ) {

        result.sort(
          (a, b) =>
            Number(b.id || 0) -
            Number(a.id || 0)
        );

      }


      return result;


    }, [
      products,
      searchTerm,
      selectedCategories,
      selectedPrices,
      inStockOnly,
      sortOption,
    ]);


  // =========================
  // PAGE
  // =========================

  return (

    <div className="accessories-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="accessories-header">

        <div className="accessories-header-content">

          <p>
            SRI LAXMI MOBILES
          </p>


          <h1>

            {selectedCategories.length === 1

              ? selectedCategories[0]

              : "Mobile Accessories"}

          </h1>


          <span>

            {selectedCategories.length === 1

              ? `Showing ${selectedCategories[0]} products.`

              : "Quality accessories for your smartphone and everyday needs."
            }

          </span>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className="accessories-content">

        <div className="accessories-layout">


          {/* =========================
              FILTER SIDEBAR
          ========================= */}

          <aside className="accessory-filters">


            <div className="accessory-filter-title">

              <h2>
                FILTERS
              </h2>


              <button
                type="button"
                onClick={clearFilters}
              >
                Clear All
              </button>

            </div>


            {/* =========================
                CATEGORY
            ========================= */}

            <div className="accessory-filter-group">

              <h3>
                CATEGORIES
              </h3>


              {ACCESSORY_CATEGORIES.map(
                (category) => (

                  <label
                    key={category}
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedCategories.includes(
                          category
                        )
                      }
                      onChange={() =>
                        handleCategoryChange(
                          category
                        )
                      }
                    />


                    {category}

                  </label>

                )
              )}

            </div>


            {/* =========================
                PRICE
            ========================= */}

            <div className="accessory-filter-group">

              <h3>
                PRICE RANGE
              </h3>


              <label>

                <input
                  type="checkbox"
                  checked={
                    selectedPrices.includes(
                      "under500"
                    )
                  }
                  onChange={() =>
                    handlePriceChange(
                      "under500"
                    )
                  }
                />

                Under ₹500

              </label>


              <label>

                <input
                  type="checkbox"
                  checked={
                    selectedPrices.includes(
                      "500to1000"
                    )
                  }
                  onChange={() =>
                    handlePriceChange(
                      "500to1000"
                    )
                  }
                />

                ₹500 – ₹1,000

              </label>


              <label>

                <input
                  type="checkbox"
                  checked={
                    selectedPrices.includes(
                      "1000to2000"
                    )
                  }
                  onChange={() =>
                    handlePriceChange(
                      "1000to2000"
                    )
                  }
                />

                ₹1,000 – ₹2,000

              </label>


              <label>

                <input
                  type="checkbox"
                  checked={
                    selectedPrices.includes(
                      "above2000"
                    )
                  }
                  onChange={() =>
                    handlePriceChange(
                      "above2000"
                    )
                  }
                />

                Above ₹2,000

              </label>

            </div>


            {/* =========================
                AVAILABILITY
            ========================= */}

            <div className="accessory-filter-group">

              <h3>
                AVAILABILITY
              </h3>


              <label>

                <input
                  type="checkbox"
                  checked={
                    inStockOnly
                  }
                  onChange={(event) =>
                    setInStockOnly(
                      event.target.checked
                    )
                  }
                />

                In Stock

              </label>

            </div>

          </aside>


          {/* =========================
              PRODUCTS AREA
          ========================= */}

          <main className="accessory-products-area">


            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="accessory-toolbar">

              <div className="accessory-toolbar-info">

                <strong>

                  {selectedCategories.length === 1
                    ? selectedCategories[0]
                    : "Accessories"}

                </strong>


                <span>

                  {filteredProducts.length}
                  {" "}
                  Products

                </span>

              </div>


              {/* SEARCH */}

              <div className="accessory-product-search">

                <i className="bi bi-search"></i>


                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search accessories..."
                  aria-label="Search accessories"
                />


                {searchTerm && (

                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    aria-label="Clear search"
                  >

                    <i className="bi bi-x-circle-fill"></i>

                  </button>

                )}

              </div>


              {/* SORT */}

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target.value
                  )
                }
              >

                <option value="recommended">
                  Sort: Recommended
                </option>

                <option value="lowToHigh">
                  Price: Low to High
                </option>

                <option value="highToLow">
                  Price: High to Low
                </option>

                <option value="newest">
                  Newest First
                </option>

              </select>


              {/* MOBILE FILTER BUTTON */}

              <button
                type="button"
                className="accessory-filter-button"
                onClick={() =>
                  setShowMobileFilters(true)
                }
              >

                <i className="bi bi-funnel"></i>

                <span>
                  FILTERS
                </span>

              </button>

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (

              <div className="accessory-state">

                <div className="accessory-loading-icon">

                  <i className="bi bi-arrow-repeat"></i>

                </div>


                <h3>
                  Loading Accessories...
                </h3>


                <p>
                  Please wait while we load
                  the latest products.
                </p>

              </div>

            )}


            {/* =========================
                ERROR
            ========================= */}

            {!loading && error && (

              <div className="accessory-state accessory-error">

                <div className="accessory-error-icon">

                  <i className="bi bi-exclamation-circle"></i>

                </div>


                <h3>
                  Unable To Load Accessories
                </h3>


                <p>
                  {error}
                </p>


                <button
                  type="button"
                  onClick={loadProducts}
                >
                  TRY AGAIN
                </button>

              </div>

            )}


            {/* =========================
                NO PRODUCTS
            ========================= */}

            {!loading &&
              !error &&
              filteredProducts.length === 0 && (

                <div className="accessory-state">

                  <div className="accessory-empty-icon">

                    <i className="bi bi-box-seam"></i>

                  </div>


                  <h3>
                    No Accessories Found
                  </h3>


                  <p>

                    {selectedCategories.length === 1

                      ? `No ${selectedCategories[0]} products match your selected filters.`

                      : "No accessories match your selected filters."
                    }

                  </p>


                  <button
                    type="button"
                    onClick={clearFilters}
                  >
                    CLEAR FILTERS
                  </button>

                </div>

              )}


            {/* =========================
                PRODUCT GRID
            ========================= */}

            {!loading &&
              !error &&
              filteredProducts.length > 0 && (

                <div className="accessory-product-grid">

                  {filteredProducts.map(
                    (product) => (

                      <AccessoryCard
                        key={product.id}
                        product={product}
                      />

                    )
                  )}

                </div>

              )}

          </main>

        </div>

      </section>


      {/* =========================
          MOBILE FILTER DRAWER
      ========================= */}

      {showMobileFilters && (

        <div
          className="accessory-filter-overlay"
          onClick={() =>
            setShowMobileFilters(false)
          }
        >

          <div
            className="accessory-filter-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="accessory-filter-header">

              <div>

                <span>
                  PRODUCT FILTERS
                </span>

                <h2>
                  FILTERS
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowMobileFilters(false)
                }
                aria-label="Close filters"
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            <div className="accessory-filter-content">


              {/* CATEGORIES */}

              <div className="accessory-filter-section">

                <h3>
                  CATEGORIES
                </h3>


                <div className="accessory-filter-options">

                  {ACCESSORY_CATEGORIES.map(
                    (category) => (

                      <label
                        key={category}
                      >

                        <input
                          type="checkbox"
                          checked={
                            selectedCategories.includes(
                              category
                            )
                          }
                          onChange={() =>
                            handleCategoryChange(
                              category
                            )
                          }
                        />

                        <span>
                          {category}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>


              {/* PRICE RANGE */}

              <div className="accessory-filter-section">

                <h3>
                  PRICE RANGE
                </h3>


                <div className="accessory-filter-options">

                  <label>

                    <input
                      type="checkbox"
                      checked={
                        selectedPrices.includes(
                          "under500"
                        )
                      }
                      onChange={() =>
                        handlePriceChange(
                          "under500"
                        )
                      }
                    />

                    <span>
                      Under ₹500
                    </span>

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      checked={
                        selectedPrices.includes(
                          "500to1000"
                        )
                      }
                      onChange={() =>
                        handlePriceChange(
                          "500to1000"
                        )
                      }
                    />

                    <span>
                      ₹500 – ₹1,000
                    </span>

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      checked={
                        selectedPrices.includes(
                          "1000to2000"
                        )
                      }
                      onChange={() =>
                        handlePriceChange(
                          "1000to2000"
                        )
                      }
                    />

                    <span>
                      ₹1,000 – ₹2,000
                    </span>

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      checked={
                        selectedPrices.includes(
                          "above2000"
                        )
                      }
                      onChange={() =>
                        handlePriceChange(
                          "above2000"
                        )
                      }
                    />

                    <span>
                      Above ₹2,000
                    </span>

                  </label>

                </div>

              </div>


              {/* AVAILABILITY */}

              <div className="accessory-filter-section">

                <h3>
                  AVAILABILITY
                </h3>


                <div className="accessory-filter-options">

                  <label>

                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(event) =>
                        setInStockOnly(
                          event.target.checked
                        )
                      }
                    />

                    <span>
                      In Stock
                    </span>

                  </label>

                </div>

              </div>

            </div>


            {/* FILTER ACTIONS */}

            <div className="accessory-filter-actions">

              <button
                type="button"
                className="accessory-filter-clear"
                onClick={clearFilters}
              >
                CLEAR ALL
              </button>


              <button
                type="button"
                className="accessory-filter-apply"
                onClick={() =>
                  setShowMobileFilters(false)
                }
              >
                APPLY FILTERS
              </button>

            </div>

          </div>

        </div>

      )}


    </div>

  );

}


/* =========================================================
   ACCESSORY CARD
========================================================= */

function AccessoryCard({
  product
}) {

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();


  const productInWishlist =
    isInWishlist(product.id);


  const numericPrice =
    Number(product.price || 0);


  const numericOldPrice =
    Number(
      product.oldPrice || 0
    );


  return (

    <article className="accessory-card">


      {/* =========================
          IMAGE AREA
      ========================= */}

      <div className="accessory-image-area">


        {/* BADGE */}

        {product.badge && (

          <span className="accessory-badge">

            {product.badge}

          </span>

        )}


        {/* WISHLIST */}

        <button
          type="button"
          className={
            `accessory-wishlist ` +
            (
              productInWishlist
                ? "wishlist-active"
                : ""
            )
          }
          onClick={(event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleWishlist(product);

          }}
          aria-label={
            productInWishlist
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >

          <i
            className={
              productInWishlist
                ? "bi bi-heart-fill"
                : "bi bi-heart"
            }
          ></i>

        </button>


        {/* PRODUCT IMAGE */}

        {product.image ? (

          <img
            src={product.image}
            alt={product.name}
            className="accessory-product-image"
          />

        ) : (

          <div
            className="accessory-placeholder"
            aria-label="Product image placeholder"
          >

            <i className="bi bi-headphones"></i>

          </div>

        )}

      </div>


      {/* =========================
          PRODUCT CONTENT
      ========================= */}

      <div className="accessory-card-content">


        {/* CATEGORY */}

        <span className="accessory-category">

          {product.category ||
            "Mobile Accessories"}

        </span>


        {/* NAME */}

        <h3>
          {product.name}
        </h3>


        {/* RATING */}

        <div
          className="accessory-rating"
          aria-label="Rated 4.5 out of 5"
        >

          ★★★★★

          <span>
            4.5
          </span>

        </div>


        {/* PRICE */}

        <div className="accessory-price">

          <strong>

            ₹
            {numericPrice.toLocaleString(
              "en-IN"
            )}

          </strong>


          {numericOldPrice > 0 && (

            <del>

              ₹
              {numericOldPrice.toLocaleString(
                "en-IN"
              )}

            </del>

          )}


          {product.discount && (

            <span>
              {product.discount}
            </span>

          )}

        </div>


        {/* STOCK */}

        {product.stock === false && (

          <div className="accessory-out-of-stock">

            OUT OF STOCK

          </div>

        )}


        {/* DETAILS */}

        <Link
          to={`/mobiles/${product.id}`}
          className="accessory-view-button"
        >

          VIEW DETAILS

        </Link>

      </div>

    </article>

  );

}


export default Accessories;