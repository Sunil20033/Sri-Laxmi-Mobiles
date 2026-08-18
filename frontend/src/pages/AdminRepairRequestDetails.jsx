import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { adminFetch } from "../utils/adminApi";

import "./AdminRepairRequestDetails.css";


function AdminRepairRequestDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [request, setRequest] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);

  const [deleting, setDeleting] = useState(false);


  // =========================
  // LOAD REQUEST
  // =========================

  async function loadRequest() {

    try {

      setLoading(true);

      setError("");


      const response =
        await adminFetch(
          `https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests/${id}`
        );


      if (!response.ok) {

        throw new Error(
          "Repair request not found."
        );

      }


      const data =
        await response.json();


      setRequest(data);


    } catch (error) {

      console.error(
        "Unable to load repair request:",
        error
      );

      setError(
        "Unable to load this repair request."
      );


    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadRequest();

  }, [id]);


  // =========================
  // UPDATE STATUS
  // =========================

  async function handleStatusChange(
    event
  ) {

    const newStatus =
      event.target.value;


    try {

      setUpdating(true);


      const response =
        await adminFetch(
          `https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests/${id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newStatus
            ),
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to update status."
        );

      }


      const updatedRequest =
        await response.json();


      setRequest(
        updatedRequest
      );


    } catch (error) {

      console.error(
        "Unable to update status:",
        error
      );

      window.alert(
        "Unable to update the request status."
      );


    } finally {

      setUpdating(false);

    }

  }


  // =========================
  // DELETE
  // =========================

  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this repair request?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setDeleting(true);


      const response =
        await adminFetch(
          `https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests/${id}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to delete request."
        );

      }


      navigate(
        "/admin/repair-requests"
      );


    } catch (error) {

      console.error(
        "Unable to delete request:",
        error
      );


      window.alert(
        "Unable to delete the repair request."
      );


      setDeleting(false);

    }

  }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="admin-repair-details-page">

        <div className="admin-repair-details-loading">

          <i className="bi bi-arrow-repeat"></i>

          <p>
            Loading repair request...
          </p>

        </div>

      </section>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error || !request) {

    return (

      <section className="admin-repair-details-page">

        <div className="admin-repair-details-error">

          <i className="bi bi-exclamation-circle"></i>

          <h2>
            Repair Request Not Found
          </h2>

          <p>
            {error ||
              "This repair request does not exist."}
          </p>


          <Link
            to="/admin/repair-requests"
            className="admin-repair-details-back"
          >

            <i className="bi bi-arrow-left"></i>

            BACK TO REPAIR REQUESTS

          </Link>

        </div>

      </section>

    );

  }


  const status =
    request.status ||
    "PENDING";


  return (

    <section className="admin-repair-details-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-repair-details-heading">

        <div>

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            Repair Request #{request.id}
          </h1>

          <span>
            View and manage this customer repair request.
          </span>

        </div>


        <Link
          to="/admin/repair-requests"
          className="admin-repair-details-back"
        >

          <i className="bi bi-arrow-left"></i>

          BACK

        </Link>

      </div>


      {/* =========================
          CUSTOMER
      ========================= */}

      <div className="admin-repair-details-card">


        <div className="admin-repair-details-top">

          <div>

            <small>
              CUSTOMER
            </small>

            <h2>
              {request.name}
            </h2>

          </div>


          <div className="admin-repair-details-service">

            {request.service}

          </div>

        </div>


        {/* =========================
            CONTACT / DEVICE
        ========================= */}

        <div className="admin-repair-details-grid">


          {/* PHONE */}

          <a
            href={`tel:${request.phone}`}
            className="admin-repair-details-info"
          >

            <div className="admin-repair-details-icon">

              <i className="bi bi-telephone"></i>

            </div>

            <div>

              <small>
                PHONE
              </small>

              <strong>
                {request.phone}
              </strong>

            </div>

          </a>


          {/* MOBILE */}

          <div className="admin-repair-details-info">

            <div className="admin-repair-details-icon">

              <i className="bi bi-phone"></i>

            </div>

            <div>

              <small>
                MOBILE
              </small>

              <strong>
                {request.model}
              </strong>

            </div>

          </div>


          {/* PREFERRED TIME */}

          <div className="admin-repair-details-info">

            <div className="admin-repair-details-icon">

              <i className="bi bi-clock"></i>

            </div>

            <div>

              <small>
                PREFERRED TIME
              </small>

              <strong>
                {request.preferredTime || "-"}
              </strong>

            </div>

          </div>


          {/* SUBMITTED */}

          <div className="admin-repair-details-info">

            <div className="admin-repair-details-icon">

              <i className="bi bi-calendar3"></i>

            </div>

            <div>

              <small>
                SUBMITTED
              </small>

              <strong>

                {request.createdAt
                  ? new Date(
                      request.createdAt
                    ).toLocaleString(
                      "en-IN"
                    )
                  : "-"
                }

              </strong>

            </div>

          </div>


        </div>


        {/* =========================
            PROBLEM
        ========================= */}

        <div className="admin-repair-details-problem">

          <small>
            PROBLEM DESCRIPTION
          </small>

          <p>
            {request.problem}
          </p>

        </div>


        {/* =========================
            STATUS
        ========================= */}

        <div className="admin-repair-details-status">

          <div>

            <small>
              REQUEST STATUS
            </small>

            <select
              value={status}
              disabled={updating}
              onChange={
                handleStatusChange
              }
              className={
                `admin-repair-details-status-select ` +
                `status-${status.toLowerCase()}`
              }
            >

              <option value="PENDING">
                PENDING
              </option>

              <option value="COMPLETED">
                COMPLETED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>

            </select>

          </div>


          {updating && (

            <span>

              <i className="bi bi-arrow-repeat"></i>

              UPDATING...

            </span>

          )}

        </div>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="admin-repair-details-actions">


          {/* CALL */}

          <a
            href={`tel:${request.phone}`}
            className="admin-repair-details-call"
          >

            <i className="bi bi-telephone-fill"></i>

            CALL CUSTOMER

          </a>


          {/* WHATSAPP */}

          <a
            href={
              `https://wa.me/91${request.phone}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="admin-repair-details-whatsapp"
          >

            <i className="bi bi-whatsapp"></i>

            WHATSAPP CUSTOMER

          </a>


          {/* DELETE */}

          <button
            type="button"
            className="admin-repair-details-delete"
            disabled={deleting}
            onClick={handleDelete}
          >

            {deleting ? (

              <>
                DELETING...
                <i className="bi bi-hourglass-split"></i>
              </>

            ) : (

              <>
                DELETE REQUEST
                <i className="bi bi-trash3"></i>
              </>

            )}

          </button>


        </div>


      </div>


    </section>

  );

}


export default AdminRepairRequestDetails;