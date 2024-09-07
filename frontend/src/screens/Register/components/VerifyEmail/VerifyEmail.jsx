import React from "react";
import emailIcon from "../../svgs/emailIcon.svg";
import { Text } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../../../../constants/routes";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate(`/${AUTH_ROUTE}`);
  };
  return (
    <div className="verify-email-screen">
      <div className="verify-email-box">
        <img src={emailIcon} alt="" />
        <Text type="h3" color="white">
          Check your email
        </Text>
        <Text type="p" color="white">
          A verification link has been sent to your email. Please click the link
          to complete your registration.
        </Text>
        <div className="verify-email-back-to-login">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>
            Back to{" "}
            <span
              style={{ fontWeight: "600", cursor: "pointer" }}
              onClick={login}
            >
              {" "}
              Login Page
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
