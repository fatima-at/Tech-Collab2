import React from "react";
import emailIcon from "../../svgs/emailIcon.svg";
import {
  VStack,
  Text,
  Box,
  useColorModeValue,
  Flex,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../../../../constants/routes";

const VerifyEmail = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const navigate = useNavigate();
  const login = () => {
    navigate(`/${AUTH_ROUTE}`);
  };
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
        textAlign="center"
      >
        <VStack spacing={4} align="center">
          {/* Email Icon */}
          <Image src={emailIcon} alt="Email Icon" boxSize="80px" mb={4} />

          {/* Title */}
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Check your email
          </Text>

          {/* Description */}
          <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
            A verification link has been sent to your email. Please click the
            link to complete your registration.
          </Text>

          {/* Back to Login */}
          <HStack
            spacing={2}
            color={useColorModeValue("blue.500", "blue.300")}
            cursor="pointer"
            onClick={login}
            mt={4}
          >
            <Icon as={FontAwesomeIcon} icon={faArrowLeft} />
            <Text fontWeight="500">Back to Login Page</Text>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default VerifyEmail;
