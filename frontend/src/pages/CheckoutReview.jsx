import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

import "./CheckoutReview.css";


function CheckoutReview() {

  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
  } = useCart();

  const [customer, setCustomer] = useState(null);

  const [orderPlaced, setOrderPlaced] =
  useState(false);

  const [
    returnPolicyAccepted,
    setReturnPolicyAccepted
  ] = useState(false);

  const [
    locationStatus,
    setLocationStatus
  ] = useState("NOT_CHECKED");

  const [
    customerLatitude,
    setCustomerLatitude
  ] = useState(null);

  const [
    customerLongitude,
    setCustomerLongitude
  ] = useState(null);

  const [
    deliveryDistanceKm,
    setDeliveryDistanceKm
  ] = useState(null);

  const [
    paymentConfirmed,
    setPaymentConfirmed
  ] = useState(false);

  const [
    isGettingLocation,
    setIsGettingLocation
  ] = useState(false);


  const {
    customer: loggedInCustomer,
    isLoggedIn,
  } = useCustomerAuth();


  // =========================================================
  // LOAD CUSTOMER INFORMATION
  // =========================================================

  useEffect(() => {

    const storedCustomer =
      sessionStorage.getItem(
        "sriLaxmiCheckoutCustomer"
      );


    if (!storedCustomer) {

      navigate("/checkout");

      return;
    }


    try {

      const parsedCustomer =
        JSON.parse(storedCustomer);

      setCustomer(parsedCustomer);

    } catch (error) {

      console.error(
        "Unable to load customer information:",
        error
      );

      navigate("/checkout");
    }

  }, [navigate]);


  // =========================================================
  // EMPTY CART
  // =========================================================

  if (
      cartItems.length === 0 &&
      !orderPlaced
    ) {

    return (

      <section className="checkout-review-empty">

        <div className="checkout-review-empty-icon">
          <i className="bi bi-bag-x"></i>
        </div>

        <h1>
          Your Cart Is Empty
        </h1>

        <p>
          Add products before reviewing your order.
        </p>

        <Link to="/mobiles">
          CONTINUE SHOPPING
        </Link>

      </section>

    );
  }


  // =========================================================
  // WAIT FOR CUSTOMER DATA
  // =========================================================

  if (!customer) {
    return null;
  }


  // =========================================================
  // CALCULATE DISTANCE
  // =========================================================

  function calculateDistanceKm(
    latitude1,
    longitude1,
    latitude2,
    longitude2
  ) {

    const earthRadiusKm = 6371;

    const latDifference =
      (latitude2 - latitude1) *
      Math.PI / 180;

    const lonDifference =
      (longitude2 - longitude1) *
      Math.PI / 180;

    const a =
      Math.sin(latDifference / 2) *
        Math.sin(latDifference / 2) +

      Math.cos(
        latitude1 * Math.PI / 180
      ) *

      Math.cos(
        latitude2 * Math.PI / 180
      ) *

      Math.sin(lonDifference / 2) *
        Math.sin(lonDifference / 2);


    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );


    return earthRadiusKm * c;
  }


  // =========================================================
  // GET CUSTOMER LOCATION
  // =========================================================

  function getCustomerLocation() {

    if (!navigator.geolocation) {

      setLocationStatus(
        "LOCATION_NOT_SUPPORTED"
      );

      alert(
        "GPS location is not supported by this browser."
      );

      return;
    }


    setIsGettingLocation(true);

    setLocationStatus(
      "GETTING_LOCATION"
    );


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;


        const distance =
          calculateDistanceKm(
            17.458870499033107,
            77.4200179686237,
            latitude,
            longitude
          );


        setCustomerLatitude(
          latitude
        );

        setCustomerLongitude(
          longitude
        );


        setDeliveryDistanceKm(
          Number(
            distance.toFixed(2)
          )
        );


        if (distance <= 10) {

          setLocationStatus(
            "WITHIN_DELIVERY_AREA"
          );

        } else {

          setLocationStatus(
            "OUTSIDE_DELIVERY_AREA"
          );

        }


        setIsGettingLocation(false);
      },


      (error) => {

        console.error(
          "Unable to get customer location:",
          error
        );


        setIsGettingLocation(false);

        setLocationStatus(
          "LOCATION_FAILED"
        );


        alert(
          "Please allow GPS location access to check delivery availability."
        );
      },


      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }

    );
  }


  // =========================================================
  // DELIVERY CHARGE
  // ₹15 PER KM + ₹10 PACKING
  // =========================================================

  const deliveryCharge =
    deliveryDistanceKm !== null
      ? Number(
          (
            deliveryDistanceKm * 15 +
            10
          ).toFixed(2)
        )
      : 0;


  const grandTotal =
    cartSubtotal + deliveryCharge;


  // =========================================================
  // PLACE ORDER
  // =========================================================

  async function handlePlaceOrder() {

    // RETURN POLICY

    if (!returnPolicyAccepted) {

      alert(
        "Please confirm that you understand the product cannot be returned after delivery."
      );

      return;
    }


    // LOCATION

    if (
      locationStatus !==
      "WITHIN_DELIVERY_AREA"
    ) {

      alert(
        "Delivery is available only within 10 km from Sri Laxmi Mobiles. Please check your GPS location."
      );

      return;
    }


    if (
      customerLatitude === null ||
      customerLongitude === null ||
      deliveryDistanceKm === null
    ) {

      alert(
        "Please check your GPS location before placing the order."
      );

      return;
    }


    // PAYMENT

    if (!paymentConfirmed) {

      alert(
        "Please complete the online payment using the QR code and confirm the payment before placing the order."
      );

      return;
    }


    // LOGIN

    if (
      !isLoggedIn ||
      !loggedInCustomer
    ) {

      alert(
        "Please login before placing an order."
      );

      navigate("/login");

      return;
    }


    if (!loggedInCustomer.id) {

      alert(
        "Customer information is unavailable. Please login again."
      );

      navigate("/login");

      return;
    }


    try {

      const orderData = {

        customerId:
          loggedInCustomer.id,

        customerName:
          customer.name,

        mobile:
          customer.mobile,

        address:
          customer.address,

        notes:
          customer.notes || "",


        // Frontend display value.
        // Backend independently recalculates
        // the final delivery charge.

        deliveryCharge:
          deliveryCharge,


        paymentMethod:
          "ONLINE",

        paymentStatus:
          "PAID_CONFIRMED",


        customerLatitude:
          customerLatitude,

        customerLongitude:
          customerLongitude,

        deliveryDistanceKm:
          deliveryDistanceKm,


        returnPolicyAccepted:
          true,


        items:
          cartItems.map((item) => ({

            productId:
              item.id,

            productName:
              item.name,

            brand:
              item.brand,

            price:
              item.price,

            quantity:
              item.quantity,

          })),

      };


      const response = await fetch(
          "https://sri-laxmi-mobiles-backend.onrender.com/api/orders",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(orderData),
          }
        );


      if (!response.ok) {

        let errorMessage =
          "Unable to place order.";

        try {

          const errorData =
            await response.json();

          if (
            errorData &&
            errorData.message
          ) {
            errorMessage =
              errorData.message;
          }

        } catch (error) {

          console.error(
            "Unable to read server error:",
            error
          );

        }

        throw new Error(
          errorMessage
        );
      }


      const savedOrder =
        await response.json();


      console.log(
        "Order created successfully:",
        savedOrder
      );


      sessionStorage.setItem(
        "sriLaxmiLastOrder",
        JSON.stringify(savedOrder)
      );

      setOrderPlaced(true);

      navigate(
        `/order-success/${savedOrder.id}`,
        {
          replace: true,
          state: {
            order: savedOrder,
          },
        }
      );


    } catch (error) {

      console.error(
        "Order placement failed:",
        error
      );


      alert(
        error.message ||
        "Unable to place your order. Please try again."
      );
    }
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="checkout-review-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="checkout-review-header">

        <div className="checkout-review-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Review Your Order
          </h1>

          <span>
            Check your details before placing the order
          </span>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="checkout-review-content">

        <div className="checkout-review-layout">


          {/* =================================================
              LEFT SECTION
          ================================================= */}

          <div className="checkout-review-main">


            {/* CUSTOMER INFORMATION */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-person-fill"></i>

                  <h2>
                    CUSTOMER INFORMATION
                  </h2>

                </div>


                <Link
                  to="/checkout"
                  className="review-edit-button"
                >
                  EDIT
                </Link>

              </div>


              <div className="review-customer-details">

                <div className="review-detail">

                  <span>
                    NAME
                  </span>

                  <strong>
                    {customer.name}
                  </strong>

                </div>


                <div className="review-detail">

                  <span>
                    MOBILE
                  </span>

                  <strong>
                    {customer.mobile}
                  </strong>

                </div>


                <div className="review-detail review-detail-full">

                  <span>
                    DELIVERY ADDRESS
                  </span>

                  <strong>
                    {customer.address}
                  </strong>

                </div>


                {customer.notes && (

                  <div className="review-detail review-detail-full">

                    <span>
                      ADDITIONAL NOTES
                    </span>

                    <strong>
                      {customer.notes}
                    </strong>

                  </div>

                )}

              </div>

            </section>


            {/* ORDER ITEMS */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-bag-fill"></i>

                  <h2>
                    ORDER ITEMS
                  </h2>

                </div>

                <span className="review-item-count">

                  {cartCount} item
                  {cartCount !== 1
                    ? "s"
                    : ""}

                </span>

              </div>


              <div className="review-products">

                {cartItems.map((item) => (

                  <article
                    className="review-product"
                    key={item.id}
                  >


                    {/* IMAGE */}

                    <div className="review-product-image">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      ) : (

                        <i className="bi bi-phone"></i>

                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="review-product-details">

                      <span>
                        {item.brand}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}

                        {" "}×{" "}

                        {item.quantity}
                      </p>

                    </div>


                    {/* TOTAL */}

                    <strong className="review-product-total">

                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </strong>

                  </article>

                ))}

              </div>

            </section>


            {/* DELIVERY */}

            <section className="review-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-geo-alt-fill"></i>

                  <h2>
                    DELIVERY
                  </h2>

                </div>

              </div>


              <div className="review-delivery">

                <div className="review-delivery-icon">

                  <i className="bi bi-truck"></i>

                </div>


                <div>

                  <strong>
                    Local Delivery
                  </strong>

                  <p>
                    Delivery available within
                    Chincholli local area /
                    up to 10 km from the shop.
                  </p>

                  <p>
                    ₹15 per km + ₹10 packing charge.
                  </p>

                  {deliveryDistanceKm !== null && (
                    <p>
                      Your calculated distance:
                      {" "}
                      <strong>
                        {deliveryDistanceKm} km
                      </strong>
                    </p>
                  )}

                </div>


                <strong className="review-delivery-free">

                  ₹
                  {deliveryCharge.toFixed(2)}

                </strong>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="review-card checkout-payment-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-qr-code"></i>

                  <h2>
                    ONLINE PAYMENT
                  </h2>

                </div>

              </div>


              <div className="checkout-payment-content">

                <p className="checkout-payment-intro">
                  Online payment is required before placing your order.
                </p>


                <p className="checkout-payment-description">
                  Scan the QR code below using PhonePe or another
                  supported UPI app and complete the payment.
                </p>


                <div className="checkout-payment-qr-wrapper">

                  <img
                    src="/payment-qr.jpeg"
                    alt="Sri Laxmi Mobiles PhonePe payment QR code"
                    className="checkout-payment-qr"
                  />

                </div>


                <p className="checkout-payment-warning">

                  <i className="bi bi-shield-check"></i>

                  <strong>
                    Payment must be completed before placing the order.
                  </strong>

                </p>


                <label className="checkout-payment-confirm">

                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(event) =>
                      setPaymentConfirmed(
                        event.target.checked
                      )
                    }
                  />


                  <span>
                    I have completed the online payment using the QR
                    code and confirm that the payment has been made.
                  </span>

                </label>

              </div>

            </section>


            {/* DELIVERY LOCATION */}

            <section className="review-card checkout-location-card">

              <div className="review-card-header">

                <div>

                  <i className="bi bi-geo-alt-fill"></i>

                  <h2>
                    DELIVERY LOCATION
                  </h2>

                </div>

              </div>


              <div className="checkout-location-content">

                <p className="checkout-location-description">

                  Local delivery is available only within
                  <strong> 10 km </strong>
                  from Sri Laxmi Mobiles.

                </p>


                <p className="checkout-location-description">

                  Delivery charge:
                  <strong>
                    {" "}₹15 per km + ₹10 packing
                  </strong>

                </p>


                <button
                  type="button"
                  className="checkout-location-button"
                  onClick={getCustomerLocation}
                  disabled={isGettingLocation}
                >

                  <i className="bi bi-crosshair"></i>

                  {isGettingLocation
                    ? "CHECKING LOCATION..."
                    : "CHECK MY DELIVERY LOCATION"}

                </button>


                {locationStatus ===
                  "WITHIN_DELIVERY_AREA" && (

                  <div className="checkout-location-result success">

                    <i className="bi bi-check-circle-fill"></i>

                    <div>

                      <strong>
                        Delivery available
                      </strong>

                      <span>
                        Distance from shop:
                        {" "}
                        <b>
                          {deliveryDistanceKm} km
                        </b>
                      </span>

                      <span>
                        Delivery charge:
                        {" "}
                        <b>
                          ₹{deliveryCharge.toFixed(2)}
                        </b>
                      </span>

                    </div>

                  </div>

                )}


                {locationStatus ===
                  "OUTSIDE_DELIVERY_AREA" && (

                  <div className="checkout-location-result error">

                    <i className="bi bi-x-circle-fill"></i>

                    <div>

                      <strong>
                        Delivery is not available
                      </strong>

                      <span>
                        Distance from shop:
                        {" "}
                        <b>
                          {deliveryDistanceKm} km
                        </b>
                      </span>

                      <span>
                        Delivery is available only within 10 km.
                      </span>

                    </div>

                  </div>

                )}


                {locationStatus ===
                  "LOCATION_FAILED" && (

                  <div className="checkout-location-result warning">

                    <i className="bi bi-exclamation-triangle-fill"></i>

                    <div>

                      <strong>
                        Unable to get your location
                      </strong>

                      <span>
                        Please allow GPS permission and try again.
                      </span>

                    </div>

                  </div>

                )}

              </div>

            </section>


            {/* ACTIONS */}

            <div className="review-actions">

              <Link
                to="/cart"
                className="review-back-button"
              >

                <i className="bi bi-arrow-left"></i>

                BACK TO CART

              </Link>


              <button
                type="button"
                className="review-place-order-button"
                onClick={handlePlaceOrder}
              >

                PLACE ORDER

                <i className="bi bi-check-lg"></i>

              </button>

            </div>


          </div>


          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="review-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            <div className="review-summary-row">

              <span>
                Products
              </span>

              <strong>
                {cartCount}
              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {cartSubtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Delivery
              </span>

              <strong>
                ₹
                {deliveryCharge.toFixed(2)}
              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Distance
              </span>

              <strong>

                {deliveryDistanceKm !== null
                  ? `${deliveryDistanceKm} km`
                  : "Not checked"}

              </strong>

            </div>


            <div className="review-summary-row">

              <span>
                Packing
              </span>

              <strong>
                ₹10.00
              </strong>

            </div>


            <div className="review-summary-divider"></div>


            <div className="review-total-row">

              <span>
                TOTAL
              </span>

              <strong>
                ₹
                {grandTotal.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

            </div>


            <div className="review-summary-note">

              <i className="bi bi-exclamation-triangle-fill"></i>

              <span>

                <strong>
                  IMPORTANT — NO RETURN AFTER DELIVERY
                </strong>

                <br />

                All products are non-returnable once the order
                has been delivered. Please check your product,
                customer details and order information carefully
                before placing the order.

              </span>

            </div>


            <label className="checkout-return-confirm">

              <input
                type="checkbox"
                checked={returnPolicyAccepted}
                onChange={(event) =>
                  setReturnPolicyAccepted(
                    event.target.checked
                  )
                }
              />

              <span>
                I understand and agree that the product cannot
                be returned after delivery.
              </span>

            </label>

          </aside>


        </div>

      </section>

    </div>

  );
}


export default CheckoutReview;