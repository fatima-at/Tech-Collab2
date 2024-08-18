import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { primaryColor } from "../../../constants/colors";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loading-container">
      <HashLoader color={primaryColor} size={50} />
    </div>
  );
};

export default Loader;
