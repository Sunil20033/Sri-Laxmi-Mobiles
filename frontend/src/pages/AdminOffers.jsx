import {
  useEffect,
  useState
} from "react";

import "./AdminOffers.css";


const API_URL =
  "http://localhost:8081/api/offers";


const emptyOffer = {

  title: "",

  badge:
    "SPECIAL OFFER",

  freeText:
    "FREE",
  mainVisualText: "SCREEN PROTECTOR",
  mainVisualIcon: "bi-shield-check",
  mainVisualImage: "",

  startDate: "",

  endDate: "",


  freeItem1Name: "",

  freeItem1Image: "",

  freeItem1Text:
    "FREE",


  freeItem2Name: "",

  freeItem2Image: "",

  freeItem2Text:
    "One Pair FREE",


  note: "",

  shopMessage: "",

  active: true,

};


function AdminOffers() {


  const [
    offers,
    setOffers
  ] = useState([]);


  const [
    form,
    setForm
  ] = useState({
    ...emptyOffer
  });


  const [
    editingId,
    setEditingId
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    saving,
    setSaving
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    success,
    setSuccess
  ] = useState("");


  // =================================================
  // LOAD
  // =================================================

  async function loadOffers() {

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


      setOffers(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Unable to load offers:",
        error
      );


      setError(
        error.message ||
        "Unable to load offers."
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadOffers();

  }, []);


  // =================================================
  // INPUT CHANGE
  // =================================================

  function handleChange(event) {

    const {
      name,
      value,
      type,
      checked
    } = event.target;


    setForm(
      (previous) => ({

        ...previous,

        [name]:
          type === "checkbox"
            ? checked
            : value,

      })
    );

  }


  // =================================================
  // RESET
  // =================================================

  function resetForm() {

    setForm({
      ...emptyOffer
    });

    setEditingId(null);

    setSuccess("");

    setError("");

  }


  // =================================================
  // EDIT
  // =================================================

  function handleEdit(offer) {

    setEditingId(
      offer.id
    );


    setForm({

      title:
        offer.title || "",

      badge:
        offer.badge ||
        "SPECIAL OFFER",

      freeText:
        offer.freeText ||
        "FREE",

      mainVisualText:
          offer.mainVisualText || "SCREEN PROTECTOR",

      mainVisualIcon:
          offer.mainVisualIcon || "bi-shield-check",

      mainVisualImage:
          offer.mainVisualImage || "",


      startDate:
        offer.startDate
          ? offer.startDate.slice(
              0,
              16
            )
          : "",


      endDate:
        offer.endDate
          ? offer.endDate.slice(
              0,
              16
            )
          : "",


      freeItem1Name:
        offer.freeItem1Name ||
        "",


      freeItem1Image:
        offer.freeItem1Image ||
        "",


      freeItem1Text:
        offer.freeItem1Text ||
        "FREE",


      freeItem2Name:
        offer.freeItem2Name ||
        "",


      freeItem2Image:
        offer.freeItem2Image ||
        "",


      freeItem2Text:
        offer.freeItem2Text ||
        "One Pair FREE",


      note:
        offer.note ||
        "",


      shopMessage:
        offer.shopMessage ||
        "",


      active:
        Boolean(
          offer.active
        ),

    });


    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }


  // =================================================
  // SAVE
  // =================================================

  async function handleSubmit(
    event
  ) {

    event.preventDefault();


    setSaving(true);

    setError("");

    setSuccess("");


    try {


      if (
        !form.title.trim()
      ) {

        throw new Error(
          "Offer title is required."
        );

      }


      if (
        !form.startDate
      ) {

        throw new Error(
          "Offer start date is required."
        );

      }


      if (
        !form.endDate
      ) {

        throw new Error(
          "Offer end date is required."
        );

      }


      const start =
        new Date(
          form.startDate
        );


      const end =
        new Date(
          form.endDate
        );


      if (
        end <= start
      ) {

        throw new Error(
          "Offer end date must be after the start date."
        );

      }


      const payload = {

        ...form,

        title:
          form.title.trim(),

        badge:
          form.badge.trim(),

        freeText:
          form.freeText.trim(),

        freeItem1Name:
          form.freeItem1Name.trim(),

        freeItem1Image:
          form.freeItem1Image.trim(),

        freeItem1Text:
          form.freeItem1Text.trim(),

        freeItem2Name:
          form.freeItem2Name.trim(),

        freeItem2Image:
          form.freeItem2Image.trim(),

        freeItem2Text:
          form.freeItem2Text.trim(),

        note:
          form.note.trim(),

        shopMessage:
          form.shopMessage.trim(),


        startDate:
          `${form.startDate}:00`,


        endDate:
          `${form.endDate}:00`,

      };


      const url =
        editingId
          ? `${API_URL}/${editingId}`
          : API_URL;


      const method =
        editingId
          ? "PUT"
          : "POST";


      const response =
        await fetch(
          url,
          {

            method,

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify(
                payload
              ),

          }
        );


      const responseText =
        await response.text();


      if (!response.ok) {

        throw new Error(
          responseText ||
          "Unable to save offer."
        );

      }


      setSuccess(

        editingId
          ? "Offer updated successfully."
          : "Offer created successfully."

      );


      resetForm();


      await loadOffers();


    } catch (error) {

      console.error(
        "Unable to save offer:",
        error
      );


      setError(
        error.message ||
        "Unable to save offer."
      );

    } finally {

      setSaving(false);

    }

  }


  // =================================================
  // ACTIVATE
  // =================================================

  async function activateOffer(
    id
  ) {

    try {

      setError("");

      setSuccess("");


      const response =
        await fetch(
          `${API_URL}/${id}/activate`,
          {
            method: "PUT"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to activate offer."
        );

      }


      setSuccess(
        "Offer activated successfully."
      );


      await loadOffers();


    } catch (error) {

      setError(
        error.message ||
        "Unable to activate offer."
      );

    }

  }


  // =================================================
  // DEACTIVATE
  // =================================================

  async function deactivateOffer(
    id
  ) {

    try {

      setError("");

      setSuccess("");


      const response =
        await fetch(
          `${API_URL}/${id}/deactivate`,
          {
            method: "PUT"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to deactivate offer."
        );

      }


      setSuccess(
        "Offer deactivated successfully."
      );


      await loadOffers();


    } catch (error) {

      setError(
        error.message ||
        "Unable to deactivate offer."
      );

    }

  }


  // =================================================
  // DELETE
  // =================================================

  async function deleteOffer(
    id
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this offer?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");

      setSuccess("");


      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to delete offer."
        );

      }


      setSuccess(
        "Offer deleted successfully."
      );


      await loadOffers();


    } catch (error) {

      setError(
        error.message ||
        "Unable to delete offer."
      );

    }

  }


  // =================================================
  // DATE
  // =================================================

  function formatDate(
    value
  ) {

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


    return date.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );

  }


  return (

    <section className="admin-offers-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-offers-heading">

        <p>
          SRI LAXMI MOBILES
        </p>

        <h1>
          Offer Management
        </h1>

        <span>
          Create and manage special offers
          displayed on the website.
        </span>

      </div>


      {/* =================================================
          MESSAGES
      ================================================= */}

      {success && (

        <div className="admin-offer-message success">

          <i className="bi bi-check-circle-fill"></i>

          {success}

        </div>

      )}


      {error && (

        <div className="admin-offer-message error">

          <i className="bi bi-exclamation-circle-fill"></i>

          {error}

        </div>

      )}


      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="admin-offer-form-card">


        <div className="admin-offer-card-heading">

          <div>

            <span>
              {editingId
                ? "EDIT OFFER"
                : "CREATE OFFER"}
            </span>

            <h2>

              {editingId
                ? "Update Offer"
                : "Add New Offer"}

            </h2>

          </div>


          {editingId && (

            <button
              type="button"
              className="admin-offer-cancel"
              onClick={
                resetForm
              }
            >
              CANCEL EDIT
            </button>

          )}

        </div>


        <form
          className="admin-offer-form"
          onSubmit={
            handleSubmit
          }
        >


          {/* TITLE */}

          <div className="admin-offer-field full">

            <label>
              Offer Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={
                handleChange
              }
              placeholder="PUT A SCREEN PROTECTOR ON YOUR PHONE & GET"
              required
            />

          </div>


          {/* BADGE */}

          <div className="admin-offer-field">

            <label>
              Badge
            </label>

            <input
              type="text"
              name="badge"
              value={form.badge}
              onChange={
                handleChange
              }
              placeholder="SPECIAL OFFER"
            />

          </div>


          {/* FREE TEXT */}

          <div className="admin-offer-field">

            <label>
              Main Free Text
            </label>

            <input
              type="text"
              name="freeText"
              value={
                form.freeText
              }
              onChange={
                handleChange
              }
              placeholder="FREE"
            />

          </div>
          {/* MAIN OFFER VISUAL */}

          <div className="admin-offer-subheading full">
              <i className="bi bi-image"></i>
              MAIN OFFER VISUAL
          </div>


          {/* VISUAL TEXT */}

          <div className="admin-offer-field">
              <label>
                  Visual Text
              </label>

              <input
                  type="text"
                  name="mainVisualText"
                  value={form.mainVisualText}
                  onChange={handleChange}
                  placeholder="SCREEN PROTECTOR"
              />

              <small>
                  Text displayed below the main visual icon/image.
              </small>
          </div>


          {/* VISUAL ICON */}

          <div className="admin-offer-field">
              <label>
                  Bootstrap Icon
              </label>

              <input
                  type="text"
                  name="mainVisualIcon"
                  value={form.mainVisualIcon}
                  onChange={handleChange}
                  placeholder="bi-shield-check"
              />

              <small>
                  Example: bi-shield-check, bi-battery-full,
                  bi-phone, bi-gift
              </small>
          </div>


          {/* VISUAL IMAGE */}

          <div className="admin-offer-field full">
              <label>
                  Visual Image URL
              </label>

              <input
                  type="url"
                  name="mainVisualImage"
                  value={form.mainVisualImage}
                  onChange={handleChange}
                  placeholder="https://example.com/product.png"
              />

              <small>
                  Optional. If provided, the image will be displayed
                  instead of the icon.
              </small>

              {form.mainVisualImage && (
                  <div className="admin-image-preview">
                      <img
                          src={form.mainVisualImage}
                          alt="Main visual preview"
                          onError={(event) => {
                              event.currentTarget.style.display = "none";
                          }}
                      />
                  </div>
              )}
          </div>



          {/* DATES */}

          <div className="admin-offer-field">

            <label>
              Offer Starts *
            </label>

            <input
              type="datetime-local"
              name="startDate"
              value={
                form.startDate
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-offer-field">

            <label>
              Offer Ends *
            </label>

            <input
              type="datetime-local"
              name="endDate"
              value={
                form.endDate
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          {/* =================================================
              ITEM 1
          ================================================= */}

          <div className="admin-offer-subheading full">

            <i className="bi bi-gift"></i>

            FREE ITEM 1

          </div>


          <div className="admin-offer-field">

            <label>
              Item Name
            </label>

            <input
              type="text"
              name="freeItem1Name"
              value={
                form.freeItem1Name
              }
              onChange={
                handleChange
              }
              placeholder="OnePlus Wired Earphone"
            />

          </div>


          <div className="admin-offer-field">

            <label>
              Item Text
            </label>

            <input
              type="text"
              name="freeItem1Text"
              value={
                form.freeItem1Text
              }
              onChange={
                handleChange
              }
              placeholder="FREE"
            />

          </div>


          <div className="admin-offer-field full">

            <label>
              Item Image URL
            </label>

            <input
              type="url"
              name="freeItem1Image"
              value={
                form.freeItem1Image
              }
              onChange={
                handleChange
              }
              placeholder="https://example.com/earphone.png"
            />

            <small>
              Add an image URL. Leave empty to use the default headphone icon.
            </small>


            {form.freeItem1Image && (

              <div className="admin-image-preview">

                <img
                  src={
                    form.freeItem1Image
                  }
                  alt="Free item 1 preview"
                  onError={
                    (event) => {
                      event.currentTarget.style.display =
                        "none";
                    }
                  }
                />

              </div>

            )}

          </div>


          {/* =================================================
              ITEM 2
          ================================================= */}

          <div className="admin-offer-subheading full">

            <i className="bi bi-gift"></i>

            FREE ITEM 2

          </div>


          <div className="admin-offer-field">

            <label>
              Item Name
            </label>

            <input
              type="text"
              name="freeItem2Name"
              value={
                form.freeItem2Name
              }
              onChange={
                handleChange
              }
              placeholder="Gaming Finger Gloves"
            />

          </div>


          <div className="admin-offer-field">

            <label>
              Item Text
            </label>

            <input
              type="text"
              name="freeItem2Text"
              value={
                form.freeItem2Text
              }
              onChange={
                handleChange
              }
              placeholder="One Pair FREE"
            />

          </div>


          <div className="admin-offer-field full">

            <label>
              Item Image URL
            </label>

            <input
              type="url"
              name="freeItem2Image"
              value={
                form.freeItem2Image
              }
              onChange={
                handleChange
              }
              placeholder="https://example.com/gloves.png"
            />

            <small>
              Add an image URL. Leave empty to use the default controller icon.
            </small>


            {form.freeItem2Image && (

              <div className="admin-image-preview">

                <img
                  src={
                    form.freeItem2Image
                  }
                  alt="Free item 2 preview"
                  onError={
                    (event) => {
                      event.currentTarget.style.display =
                        "none";
                    }
                  }
                />

              </div>

            )}

          </div>


          {/* NOTE */}

          <div className="admin-offer-field full">

            <label>
              Offer Note
            </label>

            <textarea
              name="note"
              value={
                form.note
              }
              onChange={
                handleChange
              }
              rows="3"
              placeholder="Offer available for a limited time only."
            />

          </div>


          {/* SHOP MESSAGE */}

          <div className="admin-offer-field full">

            <label>
              Shop Message
            </label>

            <textarea
              name="shopMessage"
              value={
                form.shopMessage
              }
              onChange={
                handleChange
              }
              rows="3"
              placeholder="Visit Sri Laxmi Mobiles in Chincholli to avail this offer."
            />

          </div>


          {/* ACTIVE */}

          <label className="admin-offer-checkbox full">

            <input
              type="checkbox"
              name="active"
              checked={
                form.active
              }
              onChange={
                handleChange
              }
            />

            <span>
              Make this offer active immediately
            </span>

          </label>


          {/* ACTIONS */}

          <div className="admin-offer-form-actions full">

            <button
              type="submit"
              disabled={
                saving
              }
            >

              <i className="bi bi-check-lg"></i>

              {saving
                ? "SAVING..."
                : editingId
                  ? "UPDATE OFFER"
                  : "CREATE OFFER"}

            </button>


            {editingId && (

              <button
                type="button"
                className="secondary"
                onClick={
                  resetForm
                }
              >
                CANCEL
              </button>

            )}

          </div>


        </form>

      </div>


      {/* =================================================
          EXISTING OFFERS
      ================================================= */}

      <div className="admin-offers-list">


        <div className="admin-offers-list-heading">

          <div>

            <span>
              OFFER LIST
            </span>

            <h2>
              Existing Offers
            </h2>

          </div>


          <button
            type="button"
            onClick={
              loadOffers
            }
          >

            <i className="bi bi-arrow-clockwise"></i>

            REFRESH

          </button>

        </div>


        {loading ? (

          <div className="admin-offers-empty">

            <i className="bi bi-arrow-repeat"></i>

            <p>
              Loading offers...
            </p>

          </div>

        ) : offers.length === 0 ? (

          <div className="admin-offers-empty">

            <i className="bi bi-tag"></i>

            <p>
              No offers created yet.
            </p>

          </div>

        ) : (

          <div className="admin-offers-table-wrapper">

            <table className="admin-offers-table">


              <thead>

                <tr>

                  <th>
                    OFFER
                  </th>

                  <th>
                    DATES
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


                {offers.map(
                  (offer) => (

                    <tr
                      key={
                        offer.id
                      }
                    >


                      <td>

                        <div className="admin-offer-table-title">

                          <strong>
                            {offer.title}
                          </strong>

                          <span>

                            {offer.freeItem1Name}

                            {offer.freeItem2Name
                              ? ` + ${offer.freeItem2Name}`
                              : ""}

                          </span>

                        </div>

                      </td>


                      <td>

                        <div className="admin-offer-table-dates">

                          <span>
                            {formatDate(
                              offer.startDate
                            )}
                          </span>

                          <i className="bi bi-arrow-right"></i>

                          <span>
                            {formatDate(
                              offer.endDate
                            )}
                          </span>

                        </div>

                      </td>


                      <td>

                        <span
                          className={
                            `admin-offer-status ${
                              offer.active
                                ? "active"
                                : "inactive"
                            }`
                          }
                        >

                          {offer.active
                            ? "ACTIVE"
                            : "INACTIVE"}

                        </span>

                      </td>


                      <td>

                        <div className="admin-offer-actions">


                          <button
                            type="button"
                            className="edit"
                            onClick={() =>
                              handleEdit(
                                offer
                              )
                            }
                          >

                            <i className="bi bi-pencil"></i>

                            EDIT

                          </button>


                          {offer.active ? (

                            <button
                              type="button"
                              className="deactivate"
                              onClick={() =>
                                deactivateOffer(
                                  offer.id
                                )
                              }
                            >

                              <i className="bi bi-eye-slash"></i>

                              HIDE

                            </button>

                          ) : (

                            <button
                              type="button"
                              className="activate"
                              onClick={() =>
                                activateOffer(
                                  offer.id
                                )
                              }
                            >

                              <i className="bi bi-eye"></i>

                              ACTIVATE

                            </button>

                          )}


                          <button
                            type="button"
                            className="delete"
                            onClick={() =>
                              deleteOffer(
                                offer.id
                              )
                            }
                          >

                            <i className="bi bi-trash"></i>

                            DELETE

                          </button>


                        </div>

                      </td>


                    </tr>

                  )
                )}


              </tbody>

            </table>

          </div>

        )}


      </div>


    </section>

  );

}


export default AdminOffers;