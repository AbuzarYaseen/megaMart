import React, { useState } from "react";
import "./navbar.css";
import megaMart from "../../assets/MegaMart.svg";
import vertor from "../../assets/Vector.svg";
import search from "../../assets/Search.svg";
import cart from "../../assets/Buy.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const cartCount = useSelector((state) => {
    return state.cart.count;
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="nav-container">
        <Link to="/home">
          <div className="Logo">
            <span className="Logo-M">M</span>
            <img className="Logo-M-img" src={megaMart} />
          </div>
        </Link>
        <div className="search-container">
          <div className="dropdown-main">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <span className="dropdown-text">All</span>
            </Link>
            <img
              className="dropdown-img"
              src={vertor}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-content">
                <Link
                  to="/gadets"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Gadets</span>
                </Link>

                <Link
                  to="/mobiles"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Mobiles</span>
                </Link>

                <Link
                  to="/toys"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Toys</span>
                </Link>
                <Link
                  to="/deals"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Deals</span>
                </Link>
                <Link
                  to="/books"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Books</span>
                </Link>
              </div>
            )}
          </div>
          <input className="search-input" placeholder="Search here..." />
          <img className="search-icon" src={search} />
        </div>

        <div className="cart-container">
          <img className="cart-icon" src={cart} />
          <span className="cart-text">Cart</span>
          <span className="cart-count cart-count-number">{cartCount}</span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
