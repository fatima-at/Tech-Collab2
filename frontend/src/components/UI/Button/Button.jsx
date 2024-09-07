import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const Button = ({
  children,
  className,
  type,
  disabled,
  loading,
  onClick,
  submit,
  testId,
  ...rest
}) => {
  return (
    <button
      data-testid={testId}
      className={
        type === "Primary"
          ? (className = `primary-button ${className}`)
          : type === "Secondary"
          ? (className = `secondary-button ${className}`)
          : type === "Danger"
          ? (className = `danger-button ${className}`)
          : type === "Cancel"
          ? (className = `primary-cancel-button ${className}`)
          : className || ""
      }
      disabled={disabled ? true : false}
      type={submit ? "submit" : "button"}
      onClick={
        loading
          ? () => {
              return;
            }
          : (e) => {
              e.stopPropagation();
              onClick?.();
            }
      }
      {...rest}
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : children}
    </button>
  );
};

export default Button;
