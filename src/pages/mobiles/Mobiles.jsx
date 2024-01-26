import React, { useEffect, useState } from "react";
import NavBar from "../../Components/navbar/NavBar";
import axios from "axios";
import Headroom from "react-headroom";
import { useDispatch } from "react-redux";
import { incrementItem } from "../../src/slices/cartSlice";
import cart from "../../assets/Buy.svg";
import "./mobiles.css";

const Mobiles = () => {
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://freetestapi.com/api/v1/mobiles"
        );
        setProducts(response.data);
        setLoading(false);

        //   console.log("Api data:", response);
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

  useEffect(() => {
    // Filter products based on the search term
    setFilteredProducts(
      products.filter(
        (product) =>
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.model.toLowerCase().includes(searchTerm.toLowerCase())
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
        <NavBar handleSearchChange={handleSearchChange} />
      </Headroom>
      <div style={{ backgroundColor: "#E1E1E1" }}>
        <h2 style={{ marginLeft: "5%" }}>Mobiles</h2>
        {/* Loading spinner displayed when data is being fetched */}
        {isLoading && (
          <div className="loading-container-mobiles">
            <div className="spinner-border  " role="status"></div>
          </div>
        )}
        {/* Product list */}
        <div className="product-list-mobiles">
          {searchTerm !== ""
            ? // Display only filtered products if there is a search term
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card-mobiles"
                  onMouseEnter={() => handleHover(product.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={product.image}
                    className="card-img-mobiles"
                    alt={"Image not available in fake API"}
                  />
                  {hoveredProductId === product.id && (
                    <>
                      <button
                        className="cart-button-mobiles"
                        onClick={() => handleButtonClick(product.id)}
                      >
                        {buttonStatus[product.id]}
                      </button>
                      {buttonStatus[product.id] === "Edit Cart" && (
                        <img
                          src={cart}
                          alt="Cart"
                          className="cart-image-mobiles"
                        />
                      )}
                    </>
                  )}
                  <div className="card-body-mobiles">
                    <p>{product.name}</p>
                    <p>{"Model: " + product.model}</p>
                    <p>{"Brand: " + product.brand}</p>
                    <p>{"Size: " + product.display_size}</p>
                    <p style={{ fontWeight: "700" }}>{"$ " + product.price}</p>
                    <p>{"Color: " + product.colors[0]}</p>
                    <p>{"Storage: " + product.storage}</p>
                    <p>{"Rating: " + product.ratings.average}</p>
                    <p>{"Release Year: " + product.release_year}</p>
                  </div>
                </div>
              ))
            : // Otherwise, display all products
              products.map((product) => (
                <div
                  key={product.id}
                  className="product-card-mobiles"
                  onMouseEnter={() => handleHover(product.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={product.image}
                    className="card-img-mobiles"
                    alt={"Image not available in fake API"}
                  />
                  {hoveredProductId === product.id && (
                    <>
                      <button
                        className="cart-button-mobiles"
                        onClick={() => handleButtonClick(product.id)}
                      >
                        {buttonStatus[product.id]}
                      </button>
                      {buttonStatus[product.id] === "Edit Cart" && (
                        <img
                          src={cart}
                          alt="Cart"
                          className="cart-image-mobiles"
                        />
                      )}
                    </>
                  )}
                  <div className="card-body-mobiles">
                    <p>{product.name}</p>
                    <p>{"Model: " + product.model}</p>
                    <p>{"Brand: " + product.brand}</p>
                    <p>{"Size: " + product.display_size}</p>
                    <p style={{ fontWeight: "700" }}>{"$ " + product.price}</p>
                    <p>{"Color: " + product.colors[0]}</p>
                    <p>{"Storage: " + product.storage}</p>
                    <p>{"Rating: " + product.ratings.average}</p>
                    <p>{"Release Year: " + product.release_year}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Mobiles;
