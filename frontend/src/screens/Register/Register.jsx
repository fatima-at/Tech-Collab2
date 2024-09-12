import React, { useState } from "react";
import "./styles.css";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Register = () => {
  const [didSubmit, setDidSubmit] = useState(false);

  return (
    <>
      {didSubmit ? (
        <VerifyEmail />
      ) : (
        <RegisterForm setDidSubmit={setDidSubmit} />
      )}
    </>
  );
};

export default Register;
