import React,{useEffect , useState} from 'react'
import NavBar from "../../Components/navbar/NavBar";
import axios from 'axios';
import Headroom from 'react-headroom';
import { useDispatch } from 'react-redux';
import { incrementItem } from '../../src/slices/cartSlice';
import cart from "../../assets/Buy.svg";
import "./mobiles.css"

const Mobiles = () => {
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
          <h2 style={{ marginLeft: "5%" }}>Mobiles</h2>
          {/* Loading spinner displayed when data is being fetched */}
          {isLoading && (
            <div className="loading-container-mobiles">
              <div className="spinner-border  " role="status"></div>
            </div>
          )}
          {/* Product list */}
          <div className="product-list-mobiles">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card-mobiles"
                onMouseEnter={() => handleHover(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Product image */}
                <img
                  src={product.image}
                  className="card-img-mobiles"
                  alt={"Image not available in fake API"}
                />
                {hoveredProductId === product.id && (
                  <>
                    {/* Add to Cart button */}
                    <button
                      className="cart-button-mobiles"
                      onClick={() => handleButtonClick(product.id)}
                    >
                      {buttonStatus[product.id]}
                    </button>
                    {/* Display cart image when the button is "View Cart" */}
                    {buttonStatus[product.id] === "Edit Cart" && (
                      <img src={cart} alt="Cart" className="cart-image-mobiles" />
                    )}
                  </>
                )}
  
                {/* Product details */}
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
}

export default Mobiles
