import { useState } from "react";
import "./Services.css";
import axios from "axios";


const services = [
  {
    icon: "bi-phone",
    title: "Screen Replacement",
    description:
      "Damaged, cracked or broken mobile screen replacement service.",
  },
  {
    icon: "bi-battery-half",
    title: "Battery Replacement",
    description:
      "Battery replacement for phones with poor backup or charging issues.",
  },
  {
    icon: "bi-usb-plug",
    title: "Charging Port Repair",
    description:
      "Solutions for charging port, loose connection and charging problems.",
  },
  {
    icon: "bi-camera",
    title: "Camera Repair",
    description:
      "Camera-related problems including camera not opening or working properly.",
  },
  {
    icon: "bi-volume-up",
    title: "Speaker & Microphone",
    description:
      "Solutions for speaker, microphone and audio-related problems.",
  },
  {
    icon: "bi-cpu",
    title: "Software Services",
    description:
      "Software troubleshooting and solutions for common mobile software issues.",
  },
  {
    icon: "bi-arrow-repeat",
    title: "Flashing & Software",
    description:
      "Professional software installation and mobile flashing services.",
  },
  {
    icon: "bi-reception-4",
    title: "Network Issues",
    description:
      "Assistance with network, SIM, signal and connectivity-related problems.",
  },
  {
    icon: "bi-unlock",
    title: "Phone Unlocking",
    description:
      "Professional assistance for supported mobile unlocking requirements.",
  },
  {
    icon: "bi-droplet-half",
    title: "Water Damage",
    description:
      "Inspection and repair assistance for phones affected by water or moisture.",
  },
  {
    icon: "bi-tools",
    title: "General Repair",
    description:
      "Diagnosis and repair for other common mobile hardware problems.",
  },
  {
    icon: "bi-question-circle",
    title: "Other Mobile Issues",
    description:
      "Have another problem? Tell us about it and we will guide you.",
  },
];


function Services() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: "",
    service: "",
    problem: "",
    preferredTime: "",
  });

  const [formMessage, setFormMessage] = useState({
    type: "",
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  setFormMessage({
    type: "",
    text: "",
  });

  const name = formData.name.trim();
  const phone = formData.phone.trim();
  const model = formData.model.trim();
  const service = formData.service.trim();
  const problem = formData.problem.trim();

  // =========================
  // FRONTEND VALIDATION
  // =========================
  if (isSubmitting) {
    return;
  }

  setIsSubmitting(true);

  if (!name) {
    setFormMessage({
      type: "error",
      text: "Please enter your name.",
    });
    return;
  }

  if (name.length < 2) {
    setFormMessage({
      type: "error",
      text: "Please enter a valid name.",
    });
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    setFormMessage({
      type: "error",
      text: "Please enter a valid 10-digit phone number.",
    });
    return;
  }

  if (!model) {
    setFormMessage({
      type: "error",
      text: "Please enter your mobile brand or model.",
    });
    return;
  }

  if (!service) {
    setFormMessage({
      type: "error",
      text: "Please select a service.",
    });
    return;
  }

  if (!problem) {
    setFormMessage({
      type: "error",
      text: "Please describe the problem with your mobile.",
    });
    return;
  }

  if (problem.length < 5) {
    setFormMessage({
      type: "error",
      text: "Please provide a little more detail about the problem.",
    });
    return;
  }


  // =========================
  // SEND TO BACKEND
  // =========================

  try {

    const response = await axios.post(
      "http://localhost:8081/api/repair-requests",
      {
        name,
        phone,
        model,
        service,
        problem,
        preferredTime: formData.preferredTime,
      }
    );


    // =========================
    // SUCCESS
    // =========================

    if (response.status === 200 || response.status === 201) {

      setFormMessage({
        type: "success",
        text:
          "Your repair request has been submitted successfully. We will assist you shortly.",
      });


      setFormData({
        name: "",
        phone: "",
        model: "",
        service: "",
        problem: "",
        preferredTime: "",
      });

    }

  } catch (error) {

    console.error(
      "Repair request submission failed:",
      error
    );


    // =========================
    // BACKEND ERROR
    // =========================

    let errorMessage =
      "Unable to submit your repair request. Please try again.";

    if (
      error.response &&
      error.response.data
    ) {

      if (
        typeof error.response.data === "string" &&
        error.response.data.trim() !== ""
      ) {

        errorMessage =
          error.response.data;

      } else if (
        error.response.data.message
      ) {

        errorMessage =
          error.response.data.message;
      }
    }


    setFormMessage({
      type: "error",
      text: errorMessage,
    });
  } finally {
  setIsSubmitting(false);
  }
};


  return (

    <div className="services-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="services-page-header">

        <div className="services-header-content">

          <p>
            Sri Laxmi Mobiles
          </p>

          <h1>
            Mobile Services & Repair
          </h1>

          <span>
            Professional mobile repair and software services for your device.
          </span>

        </div>

      </section>


      {/* =========================
          INTRODUCTION
      ========================= */}

      <section className="service-intro">

        <div className="service-container">

          <div className="service-intro-content">

            <div className="service-intro-icon">
              <i className="bi bi-tools"></i>
            </div>

            <div>

              <h2>
                COMPLETE MOBILE REPAIR SOLUTIONS
              </h2>

              <p>
                From hardware repairs to software-related problems,
                Sri Laxmi Mobiles provides assistance for a wide range
                of mobile issues.
              </p>

              <p className="service-note">
                After submitting a repair request, please visit our shop
                at your convenient time so our team can inspect your device.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="service-benefits">

        <div className="service-container">

          <div className="section-title-center">

            <p>
              WHY CHOOSE US
            </p>

            <h2>
              RELIABLE SERVICE FOR YOUR MOBILE
            </h2>

          </div>


          <div className="service-benefit-grid">

            <div className="service-benefit-card">

              <i className="bi bi-search"></i>

              <h3>
                Proper Diagnosis
              </h3>

              <p>
                We identify the problem before recommending a repair.
              </p>

            </div>


            <div className="service-benefit-card">

              <i className="bi bi-person-gear"></i>

              <h3>
                Experienced Service
              </h3>

              <p>
                Get assistance for common hardware and software issues.
              </p>

            </div>


            <div className="service-benefit-card">

              <i className="bi bi-shield-check"></i>

              <h3>
                Careful Handling
              </h3>

              <p>
                Your device is handled carefully during inspection and repair.
              </p>

            </div>


            <div className="service-benefit-card">

              <i className="bi bi-chat-dots"></i>

              <h3>
                Clear Guidance
              </h3>

              <p>
                We explain the issue and guide you on the next steps.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SERVICES GRID
      ========================= */}

      <section className="all-services">

        <div className="service-container">

          <div className="section-title">

            <div>

              <p>
                OUR SERVICES
              </p>

              <h2>
                MOBILE REPAIR & SOFTWARE SERVICES
              </h2>

            </div>

            <span>
              {services.length} Services
            </span>

          </div>


          <div className="services-grid-page">

            {services.map((service) => (

              <div
                className="service-page-card"
                key={service.title}
              >

                <div className="service-page-icon">
                  <i className={`bi ${service.icon}`}></i>
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

               <button
                  type="button"
                  onClick={() => {
                    setFormData((previous) => ({
                      ...previous,
                      service: service.title,
                    }));

                    document
                      .getElementById("repair-request")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  REQUEST SERVICE
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="how-service-works">

        <div className="service-container">

          <div className="section-title-center">

            <p>
              SIMPLE PROCESS
            </p>

            <h2>
              HOW IT WORKS
            </h2>

          </div>


          <div className="service-steps">

            <div className="service-step">

              <div className="step-number">
                01
              </div>

              <i className="bi bi-ui-checks-grid"></i>

              <h3>
                Tell Us Your Problem
              </h3>

              <p>
                Submit your mobile issue through the request form.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="service-step">

              <div className="step-number">
                02
              </div>

              <i className="bi bi-calendar-check"></i>

              <h3>
                Choose a Convenient Time
              </h3>

              <p>
                Select a preferred time to visit our shop.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="service-step">

              <div className="step-number">
                03
              </div>

              <i className="bi bi-shop"></i>

              <h3>
                Visit Our Shop
              </h3>

              <p>
                Bring your device to Sri Laxmi Mobiles for inspection.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          REPAIR REQUEST
      ========================= */}

      <section
        className="repair-request-section"
        id="repair-request"
      >

        <div className="service-container">

          <div className="repair-request-layout">


            {/* LEFT INFORMATION */}

            <div className="repair-request-info">

              <p>
                NEED HELP WITH YOUR PHONE?
              </p>

              <h2>
                REQUEST A REPAIR SERVICE
              </h2>

              <span>
                Tell us about the issue with your mobile.
                Submit your request and visit our shop at your
                convenient time for inspection.
              </span>


              <div className="repair-contact-box">

                <div>
                  <i className="bi bi-telephone-fill"></i>

                  <span>
                    <small>
                      CALL US
                    </small>

                    9035300355
                  </span>

                </div>


                <div>
                  <i className="bi bi-whatsapp"></i>

                  <span>
                    <small>
                      WHATSAPP
                    </small>

                    9035300355
                  </span>

                </div>


                <div>
                  <i className="bi bi-geo-alt-fill"></i>

                  <span>
                    <small>
                      SHOP LOCATION
                    </small>

                    Chincholli, Kalaburagi
                  </span>

                </div>

              </div>

            </div>


            {/* FORM */}

            <form
              className="repair-form"
              onSubmit={handleSubmit}
            >

              <h3>
                REPAIR REQUEST
              </h3>
              {formMessage.text && (
                <div
                  className={`repair-form-message ${formMessage.type}`}
                  role="alert"
                >
                  {formMessage.text}
                </div>
              )}


              <div className="repair-form-row">

                <div className="repair-field">

                  <label>
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="repair-field">

                  <label>
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />

                </div>

              </div>


              <div className="repair-field">

                <label>
                  Mobile Brand / Model *
                </label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="Example: Samsung Galaxy A55"
                  required
                />

              </div>
              <div className="repair-field">

                <label>
                  Service Required *
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option
                      key={service.title}
                      value={service.title}
                    >
                      {service.title}
                    </option>
                  ))}

                </select>

              </div>


              <div className="repair-field">

                <label>
                  What is the problem? *
                </label>

                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Describe the issue with your mobile..."
                  rows="4"
                  required
                ></textarea>

              </div>


              <div className="repair-field">

                <label>
                  Preferred Visit Time
                </label>

                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >

                  <option value="">
                    Select a convenient time
                  </option>

                  <option value="Morning">
                    Morning (9:00 AM – 12:00 PM)
                  </option>

                  <option value="Afternoon">
                    Afternoon (12:00 PM – 4:00 PM)
                  </option>

                  <option value="Evening">
                    Evening (4:00 PM – 7:00 PM)
                  </option>

                  <option value="Night">
                    Night (7:00 PM – 9:00 PM)
                  </option>

                </select>

              </div>


                <button
                  type="submit"
                  className="repair-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      SUBMITTING...
                      <i className="bi bi-hourglass-split"></i>
                    </>
                  ) : (
                    <>
                      SUBMIT REPAIR REQUEST
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>


              <p className="repair-form-note">
                * Please visit our shop after submitting your request.
              </p>

            </form>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="service-final-cta">

        <div>

          <img
            src="/src/assets/lm-mobile-logo.png"
            alt="Sri Laxmi Mobiles"
            className="service-cta-logo"
          />

          <h2>
            HAVE A MOBILE PROBLEM?
          </h2>

          <p>
            Visit Sri Laxmi Mobiles in Chincholli and let us help you.
          </p>

          <a
            href="https://maps.app.goo.gl/nGzZoD9cwZPydedJA?g_st=ac"
            target="_blank"
            rel="noreferrer"
          >
            GET DIRECTIONS
            <i className="bi bi-arrow-right"></i>
          </a>

        </div>

      </section>

    </div>
  );
}


export default Services;