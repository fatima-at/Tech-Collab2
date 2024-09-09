import React from "react";
import { Center, VStack, Text, useColorModeValue, Box } from "@chakra-ui/react";

const EmptyState = ({ title, message }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const messageColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Center h="100%">
      <Box
        borderRadius="lg"
        p={8}
        maxW="md"
        textAlign="center"
        bg={bgColor}
        boxShadow={boxShadow}
      >
        <VStack spacing={5}>
          {/* Title */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={textColor}
            letterSpacing="wider"
            lineHeight="1.4"
          >
            {title}
          </Text>

          {/* Message */}
          <Text fontSize="lg" color={messageColor} lineHeight="1.6">
            {message}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default EmptyState;
