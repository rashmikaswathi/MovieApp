import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer">
    <h2>Contact us</h2>

    <div className="social-icons">
      <button type="button" aria-label="google">
        <FaGoogle />
      </button>

      <button type="button" aria-label="twitter">
        <FaTwitter />
      </button>

      <button type="button" aria-label="instagram">
        <FaInstagram />
      </button>

      <button type="button" aria-label="youtube">
        <FaYoutube />
      </button>
    </div>
  </footer>
)

export default Footer
