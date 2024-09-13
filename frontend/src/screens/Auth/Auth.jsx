import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_ROUTE } from "../../constants/routes";
import { LogoHeader } from "../../components";
import { login } from "../../services/AuthApi";
import { toast } from "react-toastify";
import { TOKEN_KEY, useAuth } from "../../context/AuthContext";
import {
  VStack,
  Input,
  Button,
  Text,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import PasswordInput from "../../components/UI/PasswordInput/PasswordInput";

const Auth = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const navigate = useNavigate();
  const { checkAuthentication } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      email: authInfo.email,
      password: authInfo.password,
    };

    try {
      const response = await login(body);
      if (response.status) {
        localStorage.setItem(TOKEN_KEY, response.token);
        await checkAuthentication();
        toast.success(response.message);
      } else {
        toast.error(
          response?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = () => {
    navigate(`/${REGISTER_ROUTE}`);
  };

  useEffect(() => {
    validateForm();
  }, [authInfo]);

  return (
    <Flex justify="center" align="center" h="100vh" width="100%">
      <Box
        maxW="400px"
        width="100%"
        p={6}
        bg={cardBg}
        borderRadius="lg"
        boxShadow="xl"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <LogoHeader />
        <Text
          fontSize="3xl"
          color={useColorModeValue("gray.800", "white")}
          textAlign="center"
          mb={6}
          fontWeight={600}
        >
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start" w="100%">
            {/* Email Input */}
            <Input
              type="email"
              placeholder="Enter Email"
              value={authInfo.email}
              onChange={handleInputChange}
              bg={inputBg}
              focusBorderColor="blue.400"
              required
              size="md"
              borderRadius="md"
              fullWidth
              name="email"
            />

            {/* Password Input */}
            <PasswordInput
              placeholder="Enter Password"
              value={authInfo.password}
              onChange={handleInputChange}
              bg={inputBg}
              focusBorderColor="blue.400"
              required
              size="md"
              borderRadius="md"
              fullWidth
              name="password"
            />

            {/* Login Button */}
            <Button
              type="submit"
              colorScheme="blue"
              bg={buttonBg}
              width="100%"
              borderRadius="md"
              mt={4}
              isDisabled={!isFormValid}
              isLoading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text
          fontSize="sm"
          textAlign="center"
          mt={4}
          color={useColorModeValue("gray.600", "gray.300")}
        >
          Don't have an account?{" "}
          <Text as="span" color="blue.400" cursor="pointer" onClick={signUp}>
            Sign Up
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default Auth;
