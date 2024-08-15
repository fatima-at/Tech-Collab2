import React, { useEffect, useState } from "react";
import { Button, Input, Text } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../../../../constants/routes";
import { toast } from "react-toastify";
import { signUp } from "../../../../services/AuthApi";

const RegisterForm = ({ setDidSubmit }) => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredInfo, setRegisteredInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisteredInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = registeredInfo;

    if (!name || !email || !password || !confirmPassword) {
      setIsFormValid(false);
      return;
    }

    if (password.length < 8 || password !== confirmPassword) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      name: registeredInfo.name,
      email: registeredInfo.email,
      password: registeredInfo.password,
      user_type: "student",
    };

    try {
      const response = await signUp(body);
      toast.success(response.message);
      setDidSubmit(true);
    } catch (error) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    navigate(`/${AUTH_ROUTE}`);
  };

  useEffect(() => {
    validateForm();
  }, [registeredInfo]);

  return (
    <div className="register-box-container">
      <div className="register-box">
        <Text type="h2" color="white" style={{ textAlign: "center" }}>
          Register
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Full Name"
            value={registeredInfo.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Enter Email"
            value={registeredInfo.email}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={registeredInfo.password}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registeredInfo.confirmPassword}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Button
            type="Primary"
            style={{ width: "100%", marginTop: ".5rem" }}
            submit
            disabled={!isFormValid}
            loading={isLoading}
          >
            Register
          </Button>
        </form>
        <span className="register-already-have-account-text">
          Already have an account?{" "}
          <span className="register-login" onClick={login}>
            Login
          </span>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
