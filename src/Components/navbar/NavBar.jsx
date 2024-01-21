import React, { useState } from "react";
import "./navbar.css";
import megaMart from "../../assets/MegaMart.svg";
import vertor from "../../assets/Vector.svg";
import search from "../../assets/Search.svg";
import cart from "../../assets/Buy.svg";
import { useSelector } from "react-redux";

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
        <div className="Logo">
          <span className="Logo-M">M</span>
          <img className="Logo-M-img" src={megaMart} />
        </div>
        <div className="search-container">
          <div className="dropdown-main" onClick={toggleDropdown}>
            <span className="dropdown-text">All</span>
            <img className="dropdown-img" src={vertor} />
            {showDropdown && (
              <div className="dropdown-content">
                <span>Mobiles</span>
                <span>Games</span>
                <span>Toys</span>
                <span>Deals</span>
                <span>Books</span>
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
