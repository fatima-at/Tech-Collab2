import { Box, VStack, Text, Image, useColorModeValue } from "@chakra-ui/react";
import emptyStateImage from "../../../assets/images/empty-folder.png"; // Include your illustration or placeholder image

const EmptyState = ({ title, message }) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      bg={bg}
      w="100%"
      p={8}
      borderRadius="lg"
      boxShadow="sm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100%"
    >
      <VStack spacing={6} align="center">
        {/* Placeholder image */}
        <Image
          src={emptyStateImage}
          alt="No items"
          boxSize="150px"
          opacity={0.8}
        />

        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
          textAlign="center"
        >
          {title}
        </Text>

        {/* Message */}
        <Text
          fontSize="lg"
          color={color}
          textAlign="center"
          fontWeight="medium"
        >
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default EmptyState;
