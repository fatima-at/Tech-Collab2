import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Input, LogoHeader, Text } from "../../components";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../../constants/routes";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Register = () => {
  const [didSubmit, setDidSubmit] = useState(false);

  return (
    <div className="register-screen">
      <LogoHeader />
      {didSubmit ? (
        <VerifyEmail />
      ) : (
        <RegisterForm setDidSubmit={setDidSubmit} />
      )}
    </div>
  );
};

export default Register;
