import React, { useState } from "react";
import "./navbar.css";
import megaMart from "../../assets/MegaMart.svg";
import vertor from "../../assets/Vector.svg";
import search from "../../assets/Search.svg";
import cart from "../../assets/Buy.svg";
import logout from "../../assets/logout.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({handleSearchChange}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term


  const cartCount = useSelector((state) => {
    return state.cart.count;
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.removeItem("userLogin");
    navigate("/signin");
  };

  // const handleSearchIconClick = () => {
  //   // Trigger search functionality only when text is written
  //   if (searchTerm.trim() !== "") {
  //     handleSearchChange(searchTerm);
  //   }
  // };


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
          <input className="search-input" placeholder="Search here..." 
           //onChange={(e)=>setSearchTerm(e.target.value)}
           onChange={handleSearchChange} 
          />
          <img className="search-icon" src={search} 
          //onClick={handleSearchIconClick}
          />
        </div>

        <div className="cart-container">
          <img className="cart-icon" src={cart} />
          <span className="cart-text">Cart</span>
          <span className="cart-count cart-count-number">{cartCount}</span>
        </div>
        <img className="logout-icon" src={logout} onClick={handleClick} />
      </div>
    </>
  );
};

export default NavBar;
