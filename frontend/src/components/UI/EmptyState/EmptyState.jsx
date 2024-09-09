import React from "react";
import { Center, VStack, Text, useColorModeValue, Box } from "@chakra-ui/react";

const EmptyState = ({ title, message }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bgGradient = useColorModeValue(
    "linear(to-r, gray.100, gray.200)",
    "linear(to-r, gray.700, gray.600)"
  );
  const messageColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Center h="100%">
      <Box
        borderRadius="lg"
        p={8}
        maxW="md"
        textAlign="center"
        bgGradient={bgGradient}
        boxShadow="md"
      >
        <VStack spacing={4}>
          {/* Title */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={textColor}
            lineHeight="1.4"
          >
            {title}
          </Text>

          {/* Message */}
          <Text fontSize="md" color={messageColor} lineHeight="1.6">
            {message}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default EmptyState;
