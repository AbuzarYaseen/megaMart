import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/NavBar";
import "./home.css";
import cart from "../../assets/Buy.svg";
import { useDispatch } from "react-redux";
import { incrementItem } from "../../src/slices/cartSlice";
import Headroom from "react-headroom";

const Home = () => {
  // State for storing product data
  const [products, setProducts] = useState([]);
  // State for managing the button status for each product
  const [buttonStatus, setButtonStatus] = useState({});
  // State for handling product hover
  const [hoveredProductId, setHoveredProductId] = useState(null);
  // State for managing loading state
  const [isLoading, setLoading] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Start loading
        setLoading(true);
        // Fetch data from the API
        const response = await axios.get("https://fakestoreapi.com/products");
        // Set the fetched data in the state
        setProducts(response.data);
        // Initialize button status for each product
        const initialButtonStatus = response.data.reduce((acc, product) => {
          acc[product.id] = "Add to Cart";
          return acc;
        }, {});
        setButtonStatus(initialButtonStatus);
        
        setFilteredProducts(response.data);
      } catch (error) {
        // Handle errors
        setLoading(false);
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetch data function when the component mounts
    fetchData();
  }, []);

  // Log the fetched data to the console
  // console.log("Fetched Data:", products);

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
      [productId]: "View Cart",
    }));
    dispatch(incrementItem());
  };

  return (
    <>
      <Headroom>
        <NavBar />
      </Headroom>
      <div style={{ backgroundColor: "#E1E1E1" }}>
        <h2 style={{ marginLeft: "5%" }}>Products</h2>
        {/* Loading spinner displayed when data is being fetched */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner-border  " role="status"></div>
          </div>
        )}
        {/* Product list */}
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onMouseEnter={() => handleHover(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Product image */}
              <img
                src={product.image}
                className="card-img"
                alt={product.title}
              />
              {hoveredProductId === product.id && (
                <>
                  {/* Add to Cart button */}
                  <button
                    className="cart-button"
                    onClick={() => handleButtonClick(product.id)}
                  >
                    {buttonStatus[product.id]}
                  </button>
                  {/* Display cart image when the button is "View Cart" */}
                  {buttonStatus[product.id] === "View Cart" && (
                    <img src={cart} alt="Cart" className="cart-image" />
                  )}
                </>
              )}

              {/* Product details */}
              <div className="card-body">
                <p>{product.title}</p>
                <p style={{ fontWeight: "700" }}>{"$ " + product.price}</p>
                <p>{"Rating: " + product.rating.rate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
