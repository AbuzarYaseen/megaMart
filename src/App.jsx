import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import Protected, {
  ProtectedBooks,
  ProtectedGadets,
  ProtectedMobiles,
  ProtectedDeals,
  ProtectedToys,
} from "./pages/protectedRoutes/Protected";
import Gadets from "./pages/gadets/Gadets";
import Books from "./pages/books/Books";
import Mobiles from "./pages/mobiles/Mobiles";
import Toys from "./pages/toys/Toys";
import Deals from "./pages/deals/Deals";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="home" element={<Protected Component={Home} />} />
          <Route path="gadets" element={<ProtectedGadets />} />
          <Route path="books" element={<ProtectedBooks />} />
          <Route path="mobiles" element={<ProtectedMobiles />} />
          <Route path="toys" element={<ProtectedToys />} />
          <Route path="deals" element={<ProtectedDeals />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
