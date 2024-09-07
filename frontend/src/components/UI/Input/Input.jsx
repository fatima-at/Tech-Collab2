import React, { useState } from "react";
import {
  Input as ChakraInput,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const inputColor = required && isTouched && !isValid ? "red.500" : "primary";

  return (
    <FormControl
      isInvalid={required && isTouched && !isValid}
      width={fullWidth ? "100%" : undefined}
      style={style}
    >
      {label && (
        <FormLabel color="white">
          {label}
          {required && <span>*</span>}
        </FormLabel>
      )}

      <InputGroup>
        {fontAwesomeIcon && (
          <InputLeftElement pointerEvents="none">
            <FontAwesomeIcon icon={fontAwesomeIcon} />
          </InputLeftElement>
        )}
        {icon && (
          <InputLeftElement pointerEvents="none">
            <img src={icon} alt="icon" />
          </InputLeftElement>
        )}
        {type !== "select" ? (
          <>
            {type === "textarea" ? (
              <Textarea
                data-testid={testId}
                placeholder={placeholder}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={value}
                required={required}
                bg={background || "white"}
                style={inputStyle}
                {...rest}
              />
            ) : (
              <>
                <ChakraInput
                  data-testid={testId}
                  type={getInputType()}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  required={required}
                  onFocus={handleFocus}
                  value={value}
                  bg={background || "white"}
                  style={inputStyle}
                  {...rest}
                />
                {type === "password" && (
                  <InputRightElement>
                    <IconButton
                      icon={passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      onClick={togglePasswordVisibility}
                      size="sm"
                    />
                  </InputRightElement>
                )}
              </>
            )}
          </>
        ) : (
          <Select
            placeholder={placeholder}
            value={value}
            required={required}
            bg={background || "white"}
            style={inputStyle}
            {...rest}
          >
            <option value={optionEmptyValue || ""} hidden>
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
          </Select>
        )}
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
