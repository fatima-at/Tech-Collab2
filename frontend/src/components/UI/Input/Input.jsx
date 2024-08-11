import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { primaryColor } from "../../../constants/colors";
import "./styles.css";
import arrowDownIcon from "./svgs/arrowDown.svg";

const Input = ({
  label,
  style,
  type,
  options,
  optionsValue,
  optionsName,
  optionEmptyValue,
  icon,
  fontAwesomeIcon,
  required,
  emptyState,
  numeric,
  defaultCountry,
  error,
  value,
  testId,
  placeholder,
  background,
  onBlur,
  onFocus,
  manualValidation,
  inputStyle,
  fullWidth,
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getInputType = () => {
    if (type === "password") {
      return passwordVisible ? "text" : "password";
    } else {
      return type;
    }
  };

  const handleFocus = () => {
    onFocus && onFocus();
  };

  const handleBlur = (e) => {
    onBlur && onBlur();
    setIsTouched(true);
    if (manualValidation !== undefined) {
      setIsValid(manualValidation);
      return;
    }
    if (e.target.value === "") {
      setIsValid(false);
      return;
    }
    if (numeric && /\D/.test(e.target.value)) {
      setIsValid(false);
      return;
    }
    setIsValid(e.target.checkValidity());
  };

  const handlePhoneBlur = () => {
    setIsTouched(true);
    setIsValid(isValidPhoneNumber(value || ""));
  };

  const inputColor =
    required && isTouched && !isValid ? "#ff0000" : primaryColor;

  return (
    <div
      className="register-label-input-container"
      style={fullWidth ? { width: "100%", ...style } : style}
    >
      {label && (
        <label
          className={
            required && isTouched && !isValid ? "register-label-error" : ""
          }
        >
          {label}
          {required ? <span>*</span> : null}
        </label>
      )}
      <div className="register-input-container">
        {!!fontAwesomeIcon && (
          <FontAwesomeIcon
            icon={fontAwesomeIcon}
            color={inputColor}
            size="1x"
            className="register-form-icon"
          />
        )}
        {!!icon && <img src={icon} className="register-form-icon" />}
        {type !== "select" ? (
          <>
            <input
              autoComplete="off"
              data-testid={testId}
              type={getInputType()}
              placeholder={placeholder}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value}
              style={{
                paddingLeft: fontAwesomeIcon || icon ? "32px" : "12px",
                background: background ? background : "white",
                ...inputStyle,
              }}
              className={
                required && isTouched && !isValid
                  ? "register-input register-input-error"
                  : "register-input"
              }
              {...rest}
            />
            {type === "password" && (
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                color={inputColor}
                size="1x"
                className="register-form-toggle-password-visibility-icon"
                onClick={togglePasswordVisibility}
              />
            )}
          </>
        ) : (
          <select
            className={`register-select-input ${
              !value || optionEmptyValue ? "register-select-placeholder" : ""
            }`}
            style={{ paddingLeft: fontAwesomeIcon || icon ? "32px" : "12px" }}
            {...rest}
          >
            <option value={optionEmptyValue ? optionEmptyValue : ""} hidden>
              {placeholder}
            </option>
            {options?.length > 0 ? (
              options.map((option, index) => (
                <option
                  key={index}
                  value={
                    optionsValue
                      ? option[optionsValue]
                      : option.id
                      ? option.id
                      : option
                  }
                >
                  {option.name
                    ? option.name
                    : optionsName
                    ? option[optionsName]
                    : option}
                </option>
              ))
            ) : (
              <option value="" disabled>
                {emptyState}
              </option>
            )}
          </select>
        )}
        {type === "select" && (
          <img src={arrowDownIcon} className="register-select-input-arrow" />
        )}
      </div>
      {required && isTouched && !isValid && error ? (
        <p className="register-input-message">{error}</p>
      ) : null}
    </div>
  );
};

export default Input;
