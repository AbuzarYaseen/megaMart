import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from "./pages/protectedRoutes/Protected";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          
          <Route path="home" element={<Protected Component = {Home}/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
