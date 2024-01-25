import React, { useEffect, useState } from "react";
import NavBar from "../../Components/navbar/NavBar";
import axios from "axios";
import Headroom from "react-headroom";
import { useDispatch } from "react-redux";
import { incrementItem } from "../../src/slices/cartSlice";
import cart from "../../assets/Buy.svg";
import "./gadets.css";

const Gadets = () => {
  const [products, setProducts] = useState([]);
  // State for managing the button status for each product
  const [buttonStatus, setButtonStatus] = useState({});
  // State for handling product hover
  const [hoveredProductId, setHoveredProductId] = useState(null);
  // State for managing loading state
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://freetestapi.com/api/v1/products"
        );
        setProducts(response.data);
        setLoading(false);

        // console.log("Api data:", response);
        // Initialize button status for each product
        const initialButtonStatus = response.data.reduce((acc, product) => {
          acc[product.id] = "Add to Cart";
          return acc;
        }, {});
        setButtonStatus(initialButtonStatus);
      } catch (error) {
        setLoading(false);
        console.error("Error occurred:", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle product hover
  const handleHover = (productId) => {
    setHoveredProductId(productId);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  // Function to handle button click
  const handleButtonClick = (productId) => {
    setButtonStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: "Edit Cart",
    }));
    dispatch(incrementItem());
  };

  return (
    <>
      <Headroom>
        <NavBar />
      </Headroom>
      <div style={{ backgroundColor: "#E1E1E1" }}>
        <h2 style={{ marginLeft: "5%" }}>Gadets</h2>
        {/* Loading spinner displayed when data is being fetched */}
        {isLoading && (
          <div className="loading-container-gadets">
            <div className="spinner-border  " role="status"></div>
          </div>
        )}
        {/* Product list */}
        <div className="product-list-gadets">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card-gadets"
              onMouseEnter={() => handleHover(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Product image */}
              <img
                src={product.image}
                className="card-img-gadets"
                alt={product.name}
              />
              {hoveredProductId === product.id && (
                <>
                  {/* Add to Cart button */}
                  <button
                    className="cart-button-gadets"
                    onClick={() => handleButtonClick(product.id)}
                  >
                    {buttonStatus[product.id]}
                  </button>
                  {/* Display cart image when the button is "View Cart" */}
                  {buttonStatus[product.id] === "Edit Cart" && (
                    <img src={cart} alt="Cart" className="cart-image-gadets" />
                  )}
                </>
              )}

              {/* Product details */}
              <div className="card-body-gadets">
                <p>{product.name}</p>
                <p>{"Brand: " + product.brand}</p>
                <p style={{ fontWeight: "700" }}>{"$ " + product.price}</p>
                <p>{"Color: " + product.color}</p>
                <p>{"Rating: " + product.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gadets;
