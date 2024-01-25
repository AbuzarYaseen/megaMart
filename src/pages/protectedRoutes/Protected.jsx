import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Deals from "../deals/Deals";
import Books from "../books/Books";
import Mobiles from "../mobiles/Mobiles";
import Toys from "../toys/Toys";
import Gadets from "../gadets/Gadets";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

const ProtectedGadets = () => {
  return <Protected Component={Gadets} />;
};

const ProtectedBooks = () => {
  return <Protected Component={Books} />;
};

const ProtectedMobiles = () => {
  return <Protected Component={Mobiles} />;
};

const ProtectedDeals = () => {
  return <Protected Component={Deals} />;
};

const ProtectedToys = () => {
  return <Protected Component={Toys} />;
};

export {
  ProtectedGadets,
  ProtectedBooks,
  ProtectedMobiles,
  ProtectedDeals,
  ProtectedToys,
};

export default Protected;
