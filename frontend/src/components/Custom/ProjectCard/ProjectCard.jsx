import { GridItem, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const ProjectCard = ({ title, subtitle, description, handleProjectClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <GridItem
      w="100%"
      p={5}
      borderRadius="lg"
      boxShadow="md"
      bg={bgColor}
      _hover={{ boxShadow: "xl" }}
      cursor="pointer"
      onClick={handleProjectClick}
    >
      <VStack align="start" spacing={3}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="md" color="gray.500">
          {subtitle}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {description}
        </Text>
      </VStack>
    </GridItem>
  );
};

export default ProjectCard;
