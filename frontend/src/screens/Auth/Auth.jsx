import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Input from "../../components/UI/Input/Input";
import Text from "../../components/UI/Text/Text";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { REGISTER_ROUTE } from "../../constants/routes";
import { LogoHeader } from "../../components";

const Auth = () => {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = authInfo;

    if (!email || !password) {
      setIsFormValid(false);
      return;
    }

    if (password.length < 8) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const signUp = () => {
    navigate(`/${REGISTER_ROUTE}`);
  };

  useEffect(() => {
    validateForm();
  }, [authInfo]);

  return (
    <div className={styles.container}>
      <LogoHeader />
      <div className={styles.loginBoxContainer}>
        <div className={styles.loginBox}>
          <Text type="h2" color="white" style={{ textAlign: "center" }}>
            Login
          </Text>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Enter Email"
              value={authInfo.email}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={authInfo.password}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <Button
              type="Primary"
              style={{ width: "100%", marginTop: ".5rem" }}
              disabled={!isFormValid}
              submit
            >
              Login
            </Button>
          </form>
          <span className={styles.dontHaveAccountText}>
            Don't have an account?{" "}
            <span className={styles.signUpText} onClick={signUp}>
              Sign Up
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
