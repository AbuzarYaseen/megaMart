import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/NavBar";
import "./home.css";
import cart from "../../assets/Buy.svg";
import { useDispatch, useSelector } from "react-redux";
import { incrementItem, addProduct } from "../../src/slices/cartSlice";
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
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);  

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
        setLoading(false);
        // console.log("Api data:", response);

        // Initialize button status for each product
        const initialButtonStatus = response.data.reduce((acc, product) => {
          acc[product.id] = "Add to Cart";
          return acc;
        }, {});
        setButtonStatus(initialButtonStatus);

        setProducts(response.data);
      } catch (error) {
        // Handle errors
        setLoading(false);
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetch data function when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on the search term
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

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

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Headroom>
        <NavBar handleSearchChange={handleSearchChange}/>
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

         {searchTerm !== ""
              ? filteredProducts.map((product) => (
                <div
                key={product.id}
                className="product-card-books"
                onMouseEnter={() => handleHover(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.image}
                  className="card-img-books"
                  alt={"Image loading error"}
                />
                {hoveredProductId === product.id && (
                  <>
                    <button
                      className="cart-button-books"
                      onClick={() => handleButtonClick(product.id)}
                    >
                      {buttonStatus[product.id]}
                    </button>
                    {buttonStatus[product.id] === "Edit Cart" && (
                      <img
                        src={cart}
                        alt="Cart"
                        className="cart-image-books"
                      />
                    )}
                  </>
                )}
                {/* Product details */}
                <div className="card-body-books">
                  <p>{product.title}</p>
                  <p>{"Category: " + product.category}</p>
                  <p style={{ fontWeight: "700" }}>{"$ " + product.price}</p>
                  <p>{"Rating: " + product.rating.rate}</p>
                </div>
              </div>
                ))
              : // Otherwise, display all products
                products.map((product) => (
                  <div
                    key={product.id}
                    className="product-card-books"
                    onMouseEnter={() => handleHover(product.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={product.image}
                      className="card-img-books"
                      alt={"Image not available in fake API"}
                    />
                    {hoveredProductId === product.id && (
                      <>
                        <button
                          className="cart-button-books"
                          onClick={() => handleButtonClick(product.id)}
                        >
                          {buttonStatus[product.id]}
                        </button>
                        {buttonStatus[product.id] === "Edit Cart" && (
                          <img
                            src={cart}
                            alt="Cart"
                            className="cart-image-books"
                          />
                        )}
                      </>
                    )}
                    {/* Product details */}
                    <div className="card-body-books">
                      <p>{product.title}</p>
                      <p>{"Category:" + product.category}</p>
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
