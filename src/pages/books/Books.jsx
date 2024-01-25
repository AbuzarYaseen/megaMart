import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementItem } from "../../src/slices/cartSlice";
import cart from "../../assets/Buy.svg";
import axios from "axios";
import Headroom from "react-headroom";
import NavBar from "../../Components/navbar/NavBar";
import "./books.css";

const Books = () => {
  const [products, setProducts] = useState([]);
  // State for managing the button status for each product
  const [buttonStatus, setButtonStatus] = useState({});
  // State for handling product hover
  const [hoveredProductId, setHoveredProductId] = useState(null);
  // State for managing loading state
  const [isLoading, setLoading] = useState(false);
  // State for displaying error
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://freetestapi.com/api/v1/book");
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
        setError("Error occurred while fetching data.");
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
      <div style={{ backgroundColor: "#E1E1E1", height: "100%" }}>
        <h2 style={{ marginLeft: "5%" }}>Books</h2>
        {/* Loading spinner displayed when data is being fetched */}
        {isLoading && (
          <div className="loading-container-books">
            <div className="spinner-border  " role="status"></div>
          </div>
        )}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {products.length > 0 && (
          //   Product list
          <div className="product-list-books">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card-books"
                onMouseEnter={() => handleHover(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Product image */}
                <img
                  src={product.cover_image}
                  className="card-img-books"
                  alt={product.title}
                />
                {hoveredProductId === product.id && (
                  <>
                    {/* Add to Cart button */}
                    <button
                      className="cart-button-books"
                      onClick={() => handleButtonClick(product.id)}
                    >
                      {buttonStatus[product.id]}
                    </button>
                    {/* Display cart image when the button is "View Cart"  */}
                    {buttonStatus[product.id] === "Edit Cart" && (
                      <img src={cart} alt="Cart" className="cart-image-books" />
                    )}
                  </>
                )}

                {/* Product details */}
                <div className="card-body-books">
                  <p>{"Title: " + product.title}</p>
                  <p>{"Author: " + product.author}</p>
                  <p>{"Description: " + product.description}</p>
                  <p>{"Year: " + product.publication_year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Books;
