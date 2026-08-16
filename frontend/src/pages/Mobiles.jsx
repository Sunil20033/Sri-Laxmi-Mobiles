import { useEffect, useMemo, useState } from "react";
import {Link,useSearchParams,} from "react-router-dom";
import axios from "axios";
import { useWishlist } from "../context/WishlistContext";
import "./Mobiles.css";

const API_URL =
  "http://localhost:8081/api/products/category/Smartphones";

const priceRanges = [
  {
    value: "under15",
    label: "Under ₹15,000",
  },
  {
    value: "15to25",
    label: "₹15,000 – ₹25,000",
  },
  {
    value: "25to40",
    label: "₹25,000 – ₹40,000",
  },
  {
    value: "above40",
    label: "Above ₹40,000",
  },
];

function formatPrice(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}


function Mobiles() {

  const [searchParams] = useSearchParams();

  const badgeFilter = searchParams.get("badge");

  const badgeFilters =
  searchParams.get("badges")
    ?.split(",")
    .map((badge) =>
      badge.trim().toUpperCase()
    )
    .filter(Boolean) || [];

  const [products, setProducts] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [selectedPrices, setSelectedPrices] = useState([]);

  const [inStockOnly, setInStockOnly] = useState(false);

  const [sortOption, setSortOption] = useState(() =>
    searchParams.get("sort") === "newest"
      ? "newest"
      : "recommended"
  );

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================
  // LOAD PRODUCTS FROM BACKEND
  // =========================

  const loadProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.get(API_URL);

      const backendProducts = response.data.map(
        (product) => ({
          ...product,

          // Backend uses "stock"
          // Frontend filters use "inStock"
          inStock: Boolean(product.stock),

          // These are kept as numbers
          // so filtering and sorting work correctly.
          price: Number(product.price),
          oldPrice: Number(product.oldPrice),
        })
      );

      setProducts(backendProducts);

    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );

      setError(
        "Unable to load products. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // LOAD ON PAGE OPEN
  // =========================

  useEffect(() => {

    loadProducts();

  }, []);


  // =========================
  // DYNAMIC BRANDS
  // =========================

  const brands = useMemo(() => {

    return [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ].sort();

  }, [products]);


  // =========================
  // BRAND FILTER
  // =========================

  function handleBrandChange(brand) {

    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter(
            (item) => item !== brand
          )
        : [...current, brand]
    );

  }


  // =========================
  // PRICE FILTER
  // =========================

  function handlePriceChange(priceRange) {

    setSelectedPrices((current) =>
      current.includes(priceRange)
        ? current.filter(
            (item) => item !== priceRange
          )
        : [...current, priceRange]
    );

  }


  // =========================
  // CLEAR FILTERS
  // =========================

  function clearFilters() {

    setSearchTerm("");

    setSelectedBrands([]);

    setSelectedPrices([]);

    setInStockOnly(false);

    setSortOption("recommended");

  }


  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredProducts = useMemo(() => {

    let filtered = [...products];

    const search =
      searchTerm.trim().toLowerCase();


    // SEARCH

    if (search) {

      filtered = filtered.filter(
        (product) =>
          `${product.brand} ${product.name}`
            .toLowerCase()
            .includes(search)
      );

    }


    // BRAND FILTER

    if (selectedBrands.length > 0) {

      filtered = filtered.filter(
        (product) =>
          selectedBrands.includes(
            product.brand
          )
      );

    }


    // PRICE FILTER

    if (selectedPrices.length > 0) {

      filtered = filtered.filter(
        (product) =>

          selectedPrices.some(
            (range) => {

              const price =
                Number(product.price);


              if (range === "under15") {

                return price < 15000;

              }


              if (range === "15to25") {

                return (
                  price >= 15000 &&
                  price <= 25000
                );

              }


              if (range === "25to40") {

                return (
                  price > 25000 &&
                  price <= 40000
                );

              }


              if (range === "above40") {

                return price > 40000;

              }


              return true;

            }
          )

      );

    }

    if (badgeFilter) {
      filtered = filtered.filter(
        (product) =>
          product.badge?.trim().toUpperCase() ===
          badgeFilter.trim().toUpperCase()
      );
    }

    if (badgeFilters.length > 0) {
      filtered = filtered.filter((product) =>
        badgeFilters.includes(
          product.badge?.trim().toUpperCase()
        )
      );
    }
    // STOCK FILTER

    if (inStockOnly) {

      filtered = filtered.filter(
        (product) => product.inStock
      );

    }

    // if (
    //   badgeFilter &&
    //   badgeFilter !== "No Badge" &&
    //   product.badge?.trim().toUpperCase() !==
    //     badgeFilter.trim().toUpperCase()
    // ) {
    //   return false;
    // }

    // SORTING

    if (sortOption === "lowToHigh") {

      filtered.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

    }


    if (sortOption === "highToLow") {

      filtered.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

    }


    if (sortOption === "newest") {

      filtered.sort(
        (a, b) =>
          Number(b.id) -
          Number(a.id)
      );

    }


    return filtered;

  }, [
    products,
    searchTerm,
    selectedBrands,
    selectedPrices,
    inStockOnly,
    sortOption,
    badgeFilter,
    badgeFilters,
  ]);


  return (

    <div className="mobiles-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="mobiles-header">

        <div className="mobiles-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Smartphones
          </h1>

          <span>
            Explore the latest smartphones
            available at our store.
          </span>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className="mobiles-content">

        <div className="mobiles-layout">


          {/* =========================
              DESKTOP FILTER SIDEBAR
          ========================= */}

          <aside className="mobile-filters">

            <div className="filter-title">

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


            {/* BRANDS */}

            <div className="filter-group">

              <h3>
                BRANDS
              </h3>

              {brands.map((brand) => (

                <label key={brand}>

                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(
                      brand
                    )}
                    onChange={() =>
                      handleBrandChange(brand)
                    }
                  />

                  <span>
                    {brand}
                  </span>

                </label>

              ))}

            </div>


            {/* PRICE RANGE */}

            <div className="filter-group">

              <h3>
                PRICE RANGE
              </h3>

              {priceRanges.map(
                (range) => (

                  <label key={range.value}>

                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(
                        range.value
                      )}
                      onChange={() =>
                        handlePriceChange(
                          range.value
                        )
                      }
                    />

                    <span>
                      {range.label}
                    </span>

                  </label>

                )
              )}

            </div>


            {/* AVAILABILITY */}

            <div className="filter-group">

              <h3>
                AVAILABILITY
              </h3>

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

          </aside>


          {/* =========================
              PRODUCTS AREA
          ========================= */}

          <main className="mobile-products-area">


            {/* TOOLBAR */}

            <div className="mobile-toolbar">

              <div className="toolbar-info">

                <strong>
                  Smartphones
                </strong>

                <span>
                  {filteredProducts.length} Products
                </span>

              </div>


              {/* SEARCH */}

              <div className="mobile-product-search">

                <i className="bi bi-search"></i>

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search mobiles..."
                  aria-label="Search mobiles"
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


              {/* MOBILE FILTER BUTTON */}

              <button
                type="button"
                className="mobile-filter-button"
                onClick={() =>
                  setShowMobileFilters(true)
                }
              >

                <i className="bi bi-funnel"></i>

                <span>
                  FILTERS
                </span>

              </button>


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

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (

              <div className="no-products">

                <h3>
                  Loading Products...
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

              <div className="no-products">

                <h3>
                  Unable To Load Products
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
                PRODUCT GRID
            ========================= */}

            {!loading &&
              !error &&
              (

                <div className="mobile-product-grid">

                  {filteredProducts.length > 0 ? (

                    filteredProducts.map(
                      (product) => (

                        <MobileCard
                          key={product.id}
                          product={product}
                        />

                      )
                    )

                  ) : (

                    <div className="no-products">

                      <h3>
                        No Products Found
                      </h3>

                      <p>
                        Try changing your
                        search or filters.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                      >
                        CLEAR FILTERS
                      </button>

                    </div>

                  )}

                </div>

              )
            }

          </main>

        </div>

      </section>


      {/* =========================
          MOBILE FILTER DRAWER
      ========================= */}

      {showMobileFilters && (

        <div
          className="mobile-filter-overlay"
          onClick={() =>
            setShowMobileFilters(false)
          }
        >

          <div
            className="mobile-filter-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* FILTER HEADER */}

            <div className="mobile-filter-header">

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


            {/* FILTER CONTENT */}

            <div className="mobile-filter-content">


              {/* BRANDS */}

              <div className="mobile-filter-section">

                <h3>
                  BRANDS
                </h3>

                <div className="mobile-filter-options">

                  {brands.map((brand) => (

                    <label key={brand}>

                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(
                          brand
                        )}
                        onChange={() =>
                          handleBrandChange(
                            brand
                          )
                        }
                      />

                      <span>
                        {brand}
                      </span>

                    </label>

                  ))}

                </div>

              </div>


              {/* PRICE RANGE */}

              <div className="mobile-filter-section">

                <h3>
                  PRICE RANGE
                </h3>

                <div className="mobile-filter-options">

                  {priceRanges.map(
                    (range) => (

                      <label key={range.value}>

                        <input
                          type="checkbox"
                          checked={selectedPrices.includes(
                            range.value
                          )}
                          onChange={() =>
                            handlePriceChange(
                              range.value
                            )
                          }
                        />

                        <span>
                          {range.label}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>


              {/* AVAILABILITY */}

              <div className="mobile-filter-section">

                <h3>
                  AVAILABILITY
                </h3>

                <div className="mobile-filter-options">

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

            <div className="mobile-filter-actions">

              <button
                type="button"
                className="mobile-filter-clear"
                onClick={clearFilters}
              >
                CLEAR ALL
              </button>

              <button
                type="button"
                className="mobile-filter-apply"
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


/* =========================
   MOBILE PRODUCT CARD
========================= */

function MobileCard({ product }) {

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();


  return (

    <article className="mobile-card">


      {/* PRODUCT IMAGE */}

      <div className="mobile-image-area">

        {product.badge && (

          <span className="mobile-badge">
            {product.badge}
          </span>

        )}


        <button
          type="button"
          className={`mobile-wishlist ${
            isInWishlist(product.id)
              ? "wishlist-active"
              : ""
          }`}
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label={
            isInWishlist(product.id)
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
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


        {product.image ? (

          <img
            src={product.image}
            alt={product.name}
            className="mobile-product-image"
          />

        ) : (

          <div
            className="mobile-placeholder"
            aria-label="Product image placeholder"
          >

            <i className="bi bi-phone"></i>

          </div>

        )}

      </div>


      {/* PRODUCT INFORMATION */}

      <div className="mobile-card-content">

        <span className="mobile-brand">
          {product.brand}
        </span>

        <h3>
          {product.name}
        </h3>


        {/* RATING */}

        <div
          className="mobile-rating"
          aria-label="Rated 4.5 out of 5"
        >

          ★★★★★

          <span>
            4.5
          </span>

        </div>


        {/* PRICE */}

        <div className="mobile-price">

          <strong>
            {formatPrice(product.price)}
          </strong>

          <del>
            {formatPrice(product.oldPrice)}
          </del>

          <span>
            {product.discount}
          </span>

        </div>


        {/* DETAILS BUTTON */}

        <Link
          to={`/mobiles/${product.id}`}
          className="mobile-view-button"
        >
          VIEW DETAILS
        </Link>

      </div>

    </article>

  );
}


export default Mobiles;