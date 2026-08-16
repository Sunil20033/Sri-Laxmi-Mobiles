import { useEffect, useState } from "react";
import axios from "axios";

import "./AdminProducts.css";

const API_URL =
  "http://localhost:8081/api/products";


/* =========================================================
   PRODUCT CATEGORIES
========================================================= */

const PRODUCT_CATEGORIES = [
  "Smartphones",
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


/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm = {
  brand: "",
  name: "",
  category: "Smartphones",
  price: "",
  oldPrice: "",
  discount: "",
  badge: "",
  stock: true,
  image: "",
};


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function AdminProducts() {

  const [products, setProducts] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      ...emptyForm,
    });

  const [loading, setLoading] =
    useState(true);


  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  const loadProducts = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(API_URL);

      setProducts(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );

      alert(
        "Unable to load products from the server. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    loadProducts();

  }, []);


  /* =========================================================
     FORM INPUT
  ========================================================= */

  const handleInputChange =
    (event) => {

      const {
        name,
        value,
        type,
        checked,
      } = event.target;

      setFormData(
        (previous) => ({
          ...previous,

          [name]:
            type === "checkbox"
              ? checked
              : value,
        })
      );
    };


  /* =========================================================
     OPEN ADD FORM
  ========================================================= */

  const openAddForm = () => {

    setEditingId(null);

    setFormData({
      ...emptyForm,
    });

    setShowForm(true);
  };


  /* =========================================================
     OPEN EDIT FORM
  ========================================================= */

  const openEditForm =
    (product) => {

      setEditingId(product.id);

      setFormData({

        brand:
          product.brand || "",

        name:
          product.name || "",

        category:
          product.category ||
          "Smartphones",

        price:
          product.price ?? "",

        oldPrice:
          product.oldPrice ?? "",

        discount:
          product.discount || "",

        badge:
          product.badge || "",

        stock:
          product.stock ?? true,

        image:
          product.image || "",
      });

      setShowForm(true);
    };


  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {

    setShowForm(false);

    setEditingId(null);

    setFormData({
      ...emptyForm,
    });
  };


  /* =========================================================
     ADD / UPDATE PRODUCT
  ========================================================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      /* BRAND */

      if (!formData.brand.trim()) {

        alert(
          "Please enter the product brand."
        );

        return;
      }


      /* PRODUCT NAME */

      if (!formData.name.trim()) {

        alert(
          "Please enter the product name."
        );

        return;
      }


      /* CATEGORY */

      if (!formData.category.trim()) {

        alert(
          "Please select a product category."
        );

        return;
      }


      /* SELLING PRICE */

      if (formData.price === "") {

        alert(
          "Please enter the selling price."
        );

        return;
      }


      if (
        Number(formData.price) < 0
      ) {

        alert(
          "Selling price cannot be negative."
        );

        return;
      }


      /* ORIGINAL PRICE */

      if (
        formData.oldPrice === ""
      ) {

        alert(
          "Please enter the original price."
        );

        return;
      }


      if (
        Number(formData.oldPrice) < 0
      ) {

        alert(
          "Original price cannot be negative."
        );

        return;
      }


      /* PRICE COMPARISON */

      if (
        Number(formData.price) >
        Number(formData.oldPrice)
      ) {

        alert(
          "Selling price cannot be greater than the original price."
        );

        return;
      }


      /* PRODUCT DATA */

      const productData = {

        brand:
          formData.brand.trim(),

        name:
          formData.name.trim(),

        category:
          formData.category.trim(),

        price:
          Number(formData.price),

        oldPrice:
          Number(formData.oldPrice),

        discount:
          formData.discount.trim(),

        badge:
          formData.badge.trim(),

        stock:
          formData.stock,

        image:
          formData.image.trim(),
      };


      try {

        /* UPDATE */

        if (
          editingId !== null
        ) {

          const response =
            await axios.put(
              `${API_URL}/${editingId}`,
              productData
            );

          setProducts(
            (previous) =>
              previous.map(
                (product) =>
                  product.id === editingId
                    ? response.data
                    : product
              )
          );

          alert(
            "Product updated successfully."
          );

        }

        /* ADD */

        else {

          const response =
            await axios.post(
              API_URL,
              productData
            );

          setProducts(
            (previous) => [
              response.data,
              ...previous,
            ]
          );

          alert(
            "Product added successfully."
          );
        }


        closeForm();

      } catch (error) {

        console.error(
          "Error saving product:",
          error
        );

        const backendMessage =
          error.response?.data;

        if (
          typeof backendMessage ===
          "string"
        ) {

          alert(
            backendMessage
          );

        } else {

          alert(
            "Unable to save the product. Please make sure the backend is running."
          );
        }
      }
    };


  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const handleDelete =
    async (id) => {

      const product =
        products.find(
          (item) =>
            item.id === id
        );

      if (!product) {
        return;
      }


      const confirmed =
        window.confirm(
          `Delete "${product.name}"?`
        );


      if (!confirmed) {
        return;
      }


      try {

        await axios.delete(
          `${API_URL}/${id}`
        );

        setProducts(
          (previous) =>
            previous.filter(
              (item) =>
                item.id !== id
            )
        );

        alert(
          "Product deleted successfully."
        );

      } catch (error) {

        console.error(
          "Error deleting product:",
          error
        );

        alert(
          "Unable to delete the product. Please make sure the backend is running."
        );
      }
    };


  /* =========================================================
     SEARCH PRODUCTS
  ========================================================= */

  const filteredProducts =
    products.filter(
      (product) => {

        const search =
          searchTerm
            .toLowerCase()
            .trim();


        const brand =
          (
            product.brand || ""
          ).toLowerCase();


        const name =
          (
            product.name || ""
          ).toLowerCase();


        const category =
          (
            product.category ||
            "Smartphones"
          ).toLowerCase();


        return (
          brand.includes(search) ||
          name.includes(search) ||
          category.includes(search)
        );
      }
    );


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="admin-products-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="admin-products-hero">

        <div className="admin-products-hero-decoration"></div>

        <div className="admin-products-hero-content">

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            Product Management
          </h1>

          <span>
            Manage your products and inventory.
          </span>

        </div>


        <div className="admin-products-hero-count">

          <strong>
            {products.length}
          </strong>

          <span>
            PRODUCTS
          </span>

        </div>

      </section>



      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="admin-products-content">


        {/* ===================================================
            PRODUCT TOOLBAR
        =================================================== */}

        <div className="admin-products-toolbar">


          {/* SUMMARY */}

          <div className="admin-products-summary">

            <h2>
              Products
            </h2>

            <span>
              {products.length} Total Products
            </span>

          </div>


          {/* ACTIONS */}

          <div className="admin-products-toolbar-actions">


            {/* SEARCH */}

            <div className="admin-products-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              {searchTerm && (

                <button
                  type="button"
                  className="admin-products-search-clear"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                >

                  <i className="bi bi-x"></i>

                </button>

              )}

            </div>


            {/* ADD */}

            <button
              type="button"
              className="admin-products-add-button"
              onClick={openAddForm}
            >

              <i className="bi bi-plus-lg"></i>

              ADD PRODUCT

            </button>

          </div>

        </div>



        {/* ===================================================
            ADD / EDIT FORM
        =================================================== */}

        {showForm && (

          <div className="admin-product-form-card">


            {/* FORM HEADER */}

            <div className="admin-product-form-header">

              <div>

                <span>
                  {editingId !== null
                    ? "EDIT PRODUCT"
                    : "NEW PRODUCT"}
                </span>

                <h2>
                  {editingId !== null
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>

                <p>
                  Enter the product information below.
                </p>

              </div>


              <button
                type="button"
                className="admin-product-close-button"
                onClick={closeForm}
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>



            {/* FORM */}

            <form
              className="admin-product-form"
              onSubmit={handleSubmit}
            >

              <div className="admin-product-form-grid">


                {/* BRAND */}

                <div className="admin-product-field">

                  <label>
                    Brand *
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={
                      handleInputChange
                    }
                    placeholder="e.g. Samsung"
                  />

                </div>


                {/* PRODUCT NAME */}

                <div className="admin-product-field">

                  <label>
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={
                      handleInputChange
                    }
                    placeholder={
                      formData.category ===
                      "Smartphones"
                        ? "e.g. Samsung Galaxy A55"
                        : "e.g. Wireless Earbuds"
                    }
                  />

                </div>


                {/* CATEGORY */}

                <div className="admin-product-field">

                  <label>
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    {PRODUCT_CATEGORIES.map(
                      (category) => (

                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* SELLING PRICE */}

                <div className="admin-product-field">

                  <label>
                    Selling Price *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={
                      formData.price
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="24999"
                    min="0"
                    step="1"
                  />

                </div>


                {/* ORIGINAL PRICE */}

                <div className="admin-product-field">

                  <label>
                    Original Price *
                  </label>

                  <input
                    type="number"
                    name="oldPrice"
                    value={
                      formData.oldPrice
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="27999"
                    min="0"
                    step="1"
                  />

                </div>


                {/* DISCOUNT */}

                <div className="admin-product-field">

                  <label>
                    Discount
                  </label>

                  <input
                    type="text"
                    name="discount"
                    value={
                      formData.discount
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="11% OFF"
                  />

                </div>


                {/* BADGE */}

                <div className="admin-product-field">

                  <label>
                    Badge
                  </label>

                  <select
                    name="badge"
                    value={
                      formData.badge
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="">
                      No Badge
                    </option>

                    <option value="NEW">
                      NEW
                    </option>

                    <option value="BEST SELLER">
                      BEST SELLER
                    </option>

                    <option value="BEST VALUE">
                      BEST VALUE
                    </option>

                    <option value="HOT">
                      HOT
                    </option>

                    <option value="PREMIUM">
                      PREMIUM
                    </option>

                    <option value="POPULAR">
                      POPULAR
                    </option>

                  </select>

                </div>


                {/* IMAGE */}

                <div className="admin-product-field admin-product-field-full">

                  <label>
                    Product Image URL
                  </label>

                  <input
                    type="url"
                    name="image"
                    value={
                      formData.image
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="https://example.com/product.jpg"
                  />

                </div>

              </div>



              {/* IMAGE PREVIEW */}

              {formData.image.trim() && (

                <div className="admin-product-image-preview">

                  <span>
                    IMAGE PREVIEW
                  </span>

                  <img
                    src={
                      formData.image
                    }
                    alt="Product preview"
                    onError={(event) => {

                      event.currentTarget.style.display =
                        "none";

                    }}
                  />

                </div>

              )}



              {/* STOCK */}

              <label className="admin-product-stock">

                <input
                  type="checkbox"
                  name="stock"
                  checked={
                    formData.stock
                  }
                  onChange={
                    handleInputChange
                  }
                />

                <span>
                  Product is currently in stock
                </span>

              </label>



              {/* FORM ACTIONS */}

              <div className="admin-product-form-actions">

                <button
                  type="button"
                  className="admin-product-cancel-button"
                  onClick={closeForm}
                >
                  CANCEL
                </button>


                <button
                  type="submit"
                  className="admin-product-save-button"
                >

                  <i className="bi bi-check-lg"></i>

                  {editingId !== null
                    ? "UPDATE PRODUCT"
                    : "SAVE PRODUCT"}

                </button>

              </div>

            </form>

          </div>

        )}



        {/* ===================================================
            PRODUCT TABLE
        =================================================== */}

        <div className="admin-products-table-card">

          <div className="admin-products-table-wrapper">

            <table className="admin-products-table">

              <thead>

                <tr>

                  <th>
                    PRODUCT
                  </th>

                  <th>
                    CATEGORY
                  </th>

                  <th>
                    BRAND
                  </th>

                  <th>
                    PRICE
                  </th>

                  <th>
                    DISCOUNT
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    ACTIONS
                  </th>

                </tr>

              </thead>


              <tbody>


                {/* LOADING */}

                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="admin-products-empty"
                    >

                      <i className="bi bi-arrow-repeat"></i>

                      <strong>
                        Loading products...
                      </strong>

                    </td>

                  </tr>

                )


                /* PRODUCTS */

                : filteredProducts.length > 0 ? (

                  filteredProducts.map(
                    (product) => (

                      <tr
                        key={
                          product.id
                        }
                      >


                        {/* PRODUCT */}

                        <td>

                          <div className="admin-product-name">

                            <div className="admin-product-icon">

                              <i
                                className={
                                  product.category ===
                                  "Smartphones"
                                    ? "bi bi-phone"
                                    : "bi bi-headphones"
                                }
                              ></i>

                            </div>


                            <div>

                              <strong>
                                {product.name}
                              </strong>

                              {product.badge && (

                                <small>
                                  {product.badge}
                                </small>

                              )}

                            </div>

                          </div>

                        </td>


                        {/* CATEGORY */}

                        <td>

                          <span className="admin-product-category">

                            {product.category ||
                              "Smartphones"}

                          </span>

                        </td>


                        {/* BRAND */}

                        <td>
                          {product.brand}
                        </td>


                        {/* PRICE */}

                        <td>

                          <div className="admin-product-price">

                            <strong>
                              ₹
                              {Number(
                                product.price
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                            <del>
                              ₹
                              {Number(
                                product.oldPrice
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </del>

                          </div>

                        </td>


                        {/* DISCOUNT */}

                        <td>

                          <span className="admin-product-discount">

                            {product.discount ||
                              "-"}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              product.stock
                                ? "admin-product-status in-stock"
                                : "admin-product-status out-stock"
                            }
                          >

                            {product.stock
                              ? "IN STOCK"
                              : "OUT OF STOCK"}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="admin-product-actions">


                            {/* EDIT */}

                            <button
                              type="button"
                              className="admin-product-edit"
                              onClick={() =>
                                openEditForm(
                                  product
                                )
                              }
                              title="Edit product"
                            >

                              <i className="bi bi-pencil"></i>

                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              className="admin-product-delete"
                              onClick={() =>
                                handleDelete(
                                  product.id
                                )
                              }
                              title="Delete product"
                            >

                              <i className="bi bi-trash3"></i>

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )


                /* NO PRODUCTS */

                : (

                  <tr>

                    <td
                      colSpan="7"
                      className="admin-products-empty"
                    >

                      <i className="bi bi-search"></i>

                      <strong>
                        No products found
                      </strong>

                      <span>
                        Try another search term.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </div>
  );
}


export default AdminProducts;