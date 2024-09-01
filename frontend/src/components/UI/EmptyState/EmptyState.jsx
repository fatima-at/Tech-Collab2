import React from "react";
import { Center, VStack, Text, useColorModeValue } from "@chakra-ui/react";

const EmptyState = ({ title, message }) => {
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Center h="100%">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="md" color="gray.500">
          {message}
        </Text>
      </VStack>
    </Center>
  );
};

export default EmptyState;
