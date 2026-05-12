import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount, theme, toggleTheme } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <i className="fas fa-utensils" /> FoodieDrop
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-product"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </NavLink>
          </li>
        </ul>

        <div className="nav-icons">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? (
              <>
                <i className="fas fa-sun" /> Light
              </>
            ) : (
              <>
                <i className="fas fa-moon" /> Dark
              </>
            )}
          </button>
          <NavLink to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart" />
            <span className="cart-count">{cartCount}</span>
          </NavLink>
          <NavLink to="/profile" className="user-icon">
            <i className="fas fa-user-circle" />
          </NavLink>
        </div>

        <div className="hamburger" onClick={() => setIsOpen((value) => !value)}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
