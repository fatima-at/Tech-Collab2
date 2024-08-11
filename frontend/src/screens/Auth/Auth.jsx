import React from "react";
import styles from "./styles.module.css";
import Input from "../../components/UI/Input/Input";
import Text from "../../components/UI/Text/Text";
import Button from "../../components/UI/Button/Button";

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Text type="h2" color="white" style={{ textAlign: "center" }}>
          Login
        </Text>
        <form className={styles.form}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter Email"
            required
            fullWidth
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter Password"
            required
            fullWidth
          />
          <Button type="Primary" style={{ width: "100%", marginTop: ".5rem" }}>
            Login
          </Button>
        </form>
        <span className={styles.dontHaveAccountText}>
          Don't have an account?{" "}
          <span className={styles.signUpText}>Sign Up</span>
        </span>
      </div>
    </div>
  );
};

export default Auth;
