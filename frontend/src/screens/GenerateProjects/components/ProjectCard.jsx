import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { toggleBookmarkProject } from "../../../services/ProjectApi";
import { toast } from "react-toastify";

const ProjectCard = ({ project }) => {
  const bgColor = useColorModeValue("#3c3c3c", "#1a202c");
  const textColor = useColorModeValue("white", "gray.100");

  const [isBookmarked, setIsBookmarked] = useState(project.is_bookmarked);
  const debounceRef = useRef(false);

  const handleBookmarkToggle = async () => {
    if (debounceRef.current) return;

    debounceRef.current = true;

    try {
      const response = await toggleBookmarkProject(project.id);
      if (response.status) {
        setIsBookmarked((current) => {
          return !current;
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to toggle bookmark");
    } finally {
      setTimeout(() => {
        debounceRef.current = false;
      }, 300); // 300ms debounce duration
    }
  };

  return (
    <Box
      w="100%"
      p={4}
      borderRadius="md"
      bg={bgColor}
      color={textColor}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Stack spacing={2}>
        <Text fontSize="lg" fontWeight="bold">
          {project.title}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {`Created at: ${new Date().toLocaleDateString()}`}{" "}
        </Text>
      </Stack>
      <IconButton
        aria-label="Bookmark project"
        icon={<StarIcon />}
        variant={isBookmarked ? "solid" : "outline"}
        colorScheme="yellow"
        onClick={handleBookmarkToggle}
      />
    </Box>
  );
};

export default ProjectCard;
