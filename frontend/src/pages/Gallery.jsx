import { useMemo, useState } from "react";
import "./Gallery.css";
import lmLogo from "../assets/lm-mobile-logo.png";

const GALLERY_ITEMS = [
  {
    id: "shop-inside",
    category: "Shop",
    image: "/gallery/shop-inside-1.jpg",
    title: "Inside Our Store",
    description:
      "Explore our store filled with mobile accessories, products and everyday essentials.",
  },
  {
    id: "store-front",
    category: "Shop",
    image: "/gallery/shop-front-1.jpeg",
    title: "Sri Laxmi Mobiles",
    description:
      "Visit Sri Laxmi Mobiles in Chincholli for mobiles, accessories and trusted services.",
  },
  {
    id: "repair-service",
    category: "Services",
    image: "/gallery/repair-service.jpg",
    title: "Mobile Repair Service",
    description:
      "Professional mobile repairing and service facilities available at our shop.",
  },
  {
    id: "repair-training",
    category: "Achievements",
    image: "/gallery/certificate-presentation.jpeg",
    title: "Repair Training",
    description:
      "A special achievement celebrating advanced mobile repair training and learning.",
  },
  {
    id: "certificate",
    category: "Achievements",
    image: "/gallery/certificate.jpeg",
    title: "Advanced Repair Certificate",
    description:
      "Certificate of completion for advanced chip-level mobile repairing training.",
  },
];

const FILTERS = [
  {
    label: "All",
    icon: "bi-grid-3x3-gap",
  },
  {
    label: "Shop",
    icon: "bi-shop",
  },
  {
    label: "Services",
    icon: "bi-tools",
  },
  {
    label: "Achievements",
    icon: "bi-trophy",
  },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return GALLERY_ITEMS;
    }

    return GALLERY_ITEMS.filter(
      (item) => item.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <main className="gallery-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="gallery-hero">

        <div className="gallery-hero-orbit gallery-hero-orbit-left"></div>

        <div className="gallery-hero-orbit gallery-hero-orbit-right"></div>

        <div className="gallery-hero-dots gallery-hero-dots-left"></div>

        <div className="gallery-hero-dots gallery-hero-dots-right"></div>

        <div className="gallery-hero-content">

          <span className="gallery-eyebrow">
            SRI LAXMI MOBILES
          </span>

          <h1>
            Our <span>Gallery</span>
          </h1>

          <div className="gallery-hero-line"></div>

          <p>
            A glimpse of our store, services
            <br />
            and journey at Sri Laxmi Mobiles.
          </p>

        </div>

      </section>


      {/* =====================================================
          FILTERS + GALLERY
      ===================================================== */}

      <section className="gallery-content">

        <div
          className="gallery-filter-row"
          aria-label="Gallery categories"
        >

          {FILTERS.map((filter) => (

            <button
              key={filter.label}
              type="button"
              className={`gallery-filter-button ${
                activeFilter === filter.label
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter.label)
              }
            >

              <i
                className={`bi ${filter.icon}`}
              ></i>

              <span>
                {filter.label}
              </span>

            </button>

          ))}

        </div>


        {/* =====================================================
            GALLERY GRID
        ===================================================== */}

        <div className="gallery-grid">

          {visibleItems.map((item) => (

            <article
              className="gallery-card"
              key={item.id}
            >

              <div className="gallery-image-wrap">

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <span className="gallery-category-badge">
                  {item.category}
                </span>

              </div>


              <div className="gallery-card-body">

                <h2>
                  {item.title}
                </h2>

                <p>
                  {item.description}
                </p>

                <button
                  type="button"
                  className="gallery-view-button"
                  onClick={() =>
                    setSelectedImage(item)
                  }
                >

                  View Photo

                  <i className="bi bi-arrow-up-right"></i>

                </button>

              </div>

            </article>

          ))}

        </div>


        {/* =====================================================
            PHOTO COUNT
        ===================================================== */}

        <div className="gallery-summary">

          <strong>
            {GALLERY_ITEMS.length}
          </strong>

          <span>
            Photos
          </span>

          <div></div>

          <span>
            Sri Laxmi Mobiles
          </span>

        </div>

      </section>


      {/* =====================================================
          VISIT STORE
      ===================================================== */}

      <section className="gallery-visit-section">

        <div className="gallery-visit-card">

          <div className="gallery-visit-copy">

            <span className="gallery-section-label">
              COME VISIT US
            </span>

            <h2>
              See Our Store{" "}
              <span>In Person</span>
            </h2>

            <p>
              Visit Sri Laxmi Mobiles in Chincholli
              for mobiles, accessories and trusted
              mobile services.
            </p>


            <div className="gallery-visit-actions">

              <a
                href="https://maps.app.goo.gl/nGzZoD9cwZPydedJA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-map-button"
              >

                <i className="bi bi-geo-alt-fill"></i>

                Open Google Maps

              </a>


              <a
                href="tel:9035300355"
                className="gallery-call-button"
              >

                <i className="bi bi-telephone-fill"></i>

                Call Us

              </a>

            </div>

          </div>


          {/* BRAND CARD */}

          <div className="gallery-brand-card">

            <img
              src={lmLogo}
              alt="Sri Laxmi Mobiles logo"
            />

            <h3>
              Sri Laxmi Mobiles
            </h3>

            <strong>
              Chincholli
            </strong>

            <span>
              Kalaburagi, Karnataka
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          PHOTO PREVIEW / LIGHTBOX
      ===================================================== */}

      {selectedImage && (

        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close photo"
            onClick={() =>
              setSelectedImage(null)
            }
          >

            <i className="bi bi-x-lg"></i>

          </button>


          <div
            className="gallery-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            <div>

              <span>
                {selectedImage.category}
              </span>

              <h2>
                {selectedImage.title}
              </h2>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Gallery;