import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {

  const location = useLocation();

  // Do not show footer inside admin pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="simple-developer-footer">

      <div className="simple-footer-content">

        {/* Developer Credit */}

        <div className="simple-footer-credit">

          <span>
            Designed &amp; Developed By
          </span>

          <strong>
            Sunil J
          </strong>

        </div>


        {/* Contact & Social Icons */}

        <div className="simple-footer-socials">

          {/* Call */}

          <a
            href="tel:8296557702"
            className="simple-footer-icon"
            aria-label="Call Sunil J"
            title="Call"
          >
            <i className="bi bi-telephone-fill"></i>
          </a>

          {/* WhatsApp */}

          <a
            href="https://wa.me/918296557702?text=Hi%20Sunil%2C%20I%E2%80%99m%20interested%20in%20getting%20a%20website%20designed%20for%20my%20business.%20Please%20share%20the%20details%20and%20let%20me%20know%20how%20we%20can%20get%20started."
            target="_blank"
            rel="noreferrer"
            className="simple-footer-icon"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <i className="bi bi-whatsapp"></i>
          </a>


          {/* Instagram */}

          <a
            href="https://www.instagram.com/itz_sunil_x4/"
            target="_blank"
            rel="noreferrer"
            className="simple-footer-icon"
            aria-label="Instagram"
            title="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>


          {/* LinkedIn */}

          <a
            href="https://www.linkedin.com/in/sunil-j1/"
            target="_blank"
            rel="noreferrer"
            className="simple-footer-icon"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>


          {/* GitHub */}

          <a
            href="https://github.com/Sunil20033"
            target="_blank"
            rel="noreferrer"
            className="simple-footer-icon"
            aria-label="GitHub"
            title="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>

        </div>


        {/* Copyright */}

        <div className="simple-footer-copyright">

          © {new Date().getFullYear()} Sri Laxmi Mobiles

        </div>

      </div>

    </footer>
  );
}

export default Footer;