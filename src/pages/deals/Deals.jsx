import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Headroom from 'react-headroom'
import NavBar from '../../Components/navbar/NavBar'

const Deals = () => {
    const [products, setProducts] = useState([]);
    // State for displaying error
    const [error, setError] = useState(null);
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://freetestapi.com/api/v1/book");
          setProducts(response.data);
  
        //   console.log("Api data:", response);
          // Initialize button status for each product
          const initialButtonStatus = response.data.reduce((acc, product) => {
            acc[product.id] = "Add to Cart";
            return acc;
          }, {});
          setButtonStatus(initialButtonStatus);
        } catch (error) {
          setError("Error 404: Error occurred while fetching data.");
        //   console.error("Error occurred:", error);
        }
      };
      fetchData();
    }, []);
  
  return (
    <>
      <Headroom>
        <NavBar />
      </Headroom>
      <div style={{ backgroundColor: "#E1E1E1", height: "100%" }}>
        <h2 style={{ marginLeft: "5%" }}>Deals</h2>
        
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
       
      </div>
    </>
  )
}

export default Deals
