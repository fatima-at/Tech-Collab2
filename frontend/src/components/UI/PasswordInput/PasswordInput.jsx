import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const PasswordInput = ({
  value,
  handleInputChange,
  name,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputBg = useColorModeValue("gray.50", "gray.700");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <InputGroup size="md">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        bg={inputBg}
        focusBorderColor="blue.400"
        required
        size="md"
        borderRadius="md"
        fullWidth
        name={name}
        {...props}
      />
      <InputRightElement width="3.5rem">
        <IconButton
          aria-label={showPassword ? "Hide password" : "Show password"}
          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
          h="1.75rem"
          size="sm"
          onClick={togglePasswordVisibility}
          variant="ghost"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
