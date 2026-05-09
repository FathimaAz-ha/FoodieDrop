import { useLocation, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>FoodieDrop</h4>
          <p>Your trusted source for fresh food delivery</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <button type="button" onClick={() => scrollToSection('home')}>
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('products')}>
                Shop
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('about')}>
                About
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter" />
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 FoodieDrop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
