import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";
import "./AdminRepairRequests.css";
import {
    useNavigate
} from "react-router-dom";


function AdminRepairRequests() {

  const [repairRequests, setRepairRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();


  // =========================
  // LOAD REPAIR REQUESTS
  // =========================

  async function loadRepairRequests() {

    try {

      setLoading(true);
      setError("");

      const response = await adminFetch(
        "https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests"
      );


      if (!response.ok) {

        throw new Error(
          "Unable to load repair requests."
        );

      }


      const data =
        await response.json();


      setRepairRequests(
        Array.isArray(data)
          ? data
          : []
      );


    } catch (error) {

      console.error(
        "Unable to load repair requests:",
        error
      );

      setError(
        "Unable to load repair requests."
      );


    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadRepairRequests();

  }, []);


  // =========================
  // UPDATE STATUS
  // =========================

  async function handleStatusChange(
    id,
    status
  ) {

    try {

      setUpdatingId(id);


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
              status
            ),
          }
        );


      if (!response.ok) {

        const message =
          await response.text();

        throw new Error(
          message ||
          "Unable to update status."
        );

      }


      const updatedRequest =
        await response.json();


      setRepairRequests(
        (previous) =>
          previous.map(
            (request) =>
              request.id === id
                ? updatedRequest
                : request
          )
      );


    } catch (error) {

      console.error(
        "Unable to update repair request status:",
        error
      );


      window.alert(
        "Unable to update the request status. Please try again."
      );


    } finally {

      setUpdatingId(null);

    }
  }


  // =========================
  // DELETE REQUEST
  // =========================

  async function handleDelete(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this repair request?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setDeletingId(id);


      const response =
        await adminFetch(
          `https://sri-laxmi-mobiles-backend.onrender.com/api/repair-requests/${id}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to delete repair request."
        );

      }


      setRepairRequests(
        (previous) =>
          previous.filter(
            (request) =>
              request.id !== id
          )
      );


    } catch (error) {

      console.error(
        "Unable to delete repair request:",
        error
      );


      window.alert(
        "Unable to delete the repair request. Please try again."
      );


    } finally {

      setDeletingId(null);

    }
  }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="admin-repair-page">

        <div className="admin-repair-loading">

          <i className="bi bi-arrow-repeat"></i>

          <p>
            Loading repair requests...
          </p>

        </div>

      </section>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <section className="admin-repair-page">

        <div className="admin-repair-error">

          <i className="bi bi-exclamation-circle"></i>

          <h2>
            Unable To Load Repair Requests
          </h2>

          <p>
            {error}
          </p>


          <button
            type="button"
            onClick={loadRepairRequests}
          >
            TRY AGAIN
          </button>

        </div>

      </section>

    );

  }


  return (

    <section className="admin-repair-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="admin-repair-heading">

        <div>

          <p>
            SRI LAXMI MOBILES
          </p>

          <h1>
            Repair Requests
          </h1>

          <span>
            View and manage customer mobile repair requests.
          </span>

        </div>


        <button
          type="button"
          className="admin-repair-refresh"
          onClick={loadRepairRequests}
        >

          <i className="bi bi-arrow-clockwise"></i>

          REFRESH

        </button>

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="admin-repair-summary">

        <div className="admin-repair-summary-card">

          <div className="admin-repair-summary-icon">

            <i className="bi bi-tools"></i>

          </div>

          <div>

            <span>
              TOTAL REQUESTS
            </span>

            <strong>
              {repairRequests.length}
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          REQUESTS
      ========================= */}

      <div className="admin-repair-section">


        <div className="admin-repair-section-heading">

          <div>

            <h2>
              Customer Repair Requests
            </h2>

            <p>
              Latest repair requests submitted from the website.
            </p>

          </div>

        </div>


        {repairRequests.length === 0 ? (

          <div className="admin-repair-empty">

            <i className="bi bi-tools"></i>

            <h3>
              No Repair Requests
            </h3>

            <p>
              There are currently no repair requests.
            </p>

          </div>

        ) : (

          <div className="admin-repair-list">

            {repairRequests.map(
              (request) => {

                const status =
                  request.status ||
                  "PENDING";


                return (

                 <div
                    className="admin-repair-card"
                    key={request.id}
                    onClick={() =>
                        navigate(
                            `/admin/repair-requests/${request.id}`
                        )
                    }
                    role="button"
                    tabIndex={0}
                >


                    {/* CUSTOMER */}

                    <div className="admin-repair-card-header">

                      <div>

                        <span>
                          REQUEST #{request.id}
                        </span>

                        <h3>
                          {request.name}
                        </h3>

                      </div>


                      <div className="admin-repair-service-badge">

                        {request.service}

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="admin-repair-details">


                      <div>

                        <i className="bi bi-telephone"></i>

                        <div>

                          <small>
                            PHONE
                          </small>

                          <strong>
                            {request.phone}
                          </strong>

                        </div>

                      </div>


                      <div>

                        <i className="bi bi-phone"></i>

                        <div>

                          <small>
                            MOBILE
                          </small>

                          <strong>
                            {request.model}
                          </strong>

                        </div>

                      </div>


                      <div>

                        <i className="bi bi-clock"></i>

                        <div>

                          <small>
                            PREFERRED TIME
                          </small>

                          <strong>
                            {request.preferredTime || "-"}
                          </strong>

                        </div>

                      </div>


                    </div>


                    {/* PROBLEM */}

                    <div className="admin-repair-problem">

                      <small>
                        PROBLEM
                      </small>

                      <p>
                        {request.problem}
                      </p>

                    </div>


                    {/* STATUS */}

                    <div className="admin-repair-status-row">

                      <div>

                        <small>
                          REQUEST STATUS
                        </small>

                        <select
                          className={
                              `admin-repair-status-select ` +
                              `status-${status.toLowerCase()}`
                          }
                          onClick={(event) =>
                              event.stopPropagation()
                          }
                          value={status}
                          disabled={
                            updatingId === request.id
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              request.id,
                              event.target.value
                            )
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


                      {updatingId === request.id && (

                        <span className="admin-repair-updating">

                          <i className="bi bi-arrow-repeat"></i>

                          UPDATING...

                        </span>

                      )}

                    </div>


                    {/* FOOTER */}

                    <div className="admin-repair-card-footer">

                      <span>

                        <i className="bi bi-calendar3"></i>

                        {request.createdAt
                          ? new Date(
                              request.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "-"
                        }

                      </span>


                      <button
                        type="button"
                        className="admin-repair-delete"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(request.id);
                        }}
                      >

                        {deletingId === request.id ? (

                          <>
                            DELETING...
                            <i className="bi bi-hourglass-split"></i>
                          </>

                        ) : (

                          <>
                            DELETE
                            <i className="bi bi-trash3"></i>
                          </>

                        )}

                      </button>

                    </div>


                  </div>

                );

              }
            )}

          </div>

        )}

      </div>


    </section>

  );

}


export default AdminRepairRequests;