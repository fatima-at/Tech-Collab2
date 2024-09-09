import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  VStack,
  ListItem,
  UnorderedList,
  Divider,
  OrderedList,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { toggleBookmarkProject } from "../../../services/ProjectApi";
import { toast } from "react-toastify";
import {
  primaryTextColor,
  secondaryTextColor,
} from "../../../constants/colors";

const ProjectCard = ({ project }) => {
  const bgColor = useColorModeValue("#F5F5F5", "#FFF");
  const textColor = useColorModeValue(primaryTextColor, secondaryTextColor);

  const [isBookmarked, setIsBookmarked] = useState(project.is_bookmarked);
  const debounceRef = useRef(false);

  // Parse the stringified arrays
  const projectSteps = project.project_steps
    ? JSON.parse(project.project_steps)
    : [];
  const projectRequirements = project.project_requirements
    ? JSON.parse(project.project_requirements)
    : [];
  const projectTips = project.project_tips
    ? JSON.parse(project.project_tips)
    : [];
  const projectApplications = project.project_applications
    ? JSON.parse(project.project_applications)
    : [];

  const handleBookmarkToggle = async () => {
    if (debounceRef.current) return;

    debounceRef.current = true;

    try {
      const response = await toggleBookmarkProject(project.id);
      if (response.status) {
        setIsBookmarked((current) => !current);
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
      p={6}
      borderRadius="md"
      bg={bgColor}
      color={textColor}
      display="flex"
      flexDirection="column"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Stack spacing={4} mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          {project.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {`Created at: ${new Date().toLocaleDateString()}`}
        </Text>
        <Text fontSize="md" color="gray.600">
          {project.project_description}
        </Text>
      </Stack>

      <Divider my={4} borderColor="gray.500" />

      {/* Display project steps */}
      {projectSteps.length > 0 && (
        <VStack align="start" spacing={2} mb={4}>
          <Text fontSize="md" fontWeight="bold">
            Steps:
          </Text>
          <OrderedList spacing={1} pl={4}>
            {projectSteps.map((step, index) => (
              <ListItem key={index} fontSize="sm">
                {step}
              </ListItem>
            ))}
          </OrderedList>
        </VStack>
      )}

      <Divider my={4} borderColor="gray.500" />

      {/* Display project requirements */}
      {projectRequirements.length > 0 && (
        <VStack align="start" spacing={2} mb={4}>
          <Text fontSize="md" fontWeight="bold">
            Requirements:
          </Text>
          <UnorderedList spacing={1} pl={4}>
            {projectRequirements.map((requirement, index) => (
              <ListItem key={index} fontSize="sm">
                {requirement}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      )}

      <Divider my={4} borderColor="gray.500" />

      {/* Display project tips */}
      {projectTips.length > 0 && (
        <VStack align="start" spacing={2} mb={4}>
          <Text fontSize="md" fontWeight="bold">
            Tips:
          </Text>
          <UnorderedList spacing={1} pl={4}>
            {projectTips.map((tip, index) => (
              <ListItem key={index} fontSize="sm">
                {tip}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      )}

      <Divider my={4} borderColor="gray.500" />

      {/* Display project applications */}
      {projectApplications.length > 0 && (
        <VStack align="start" spacing={2} mb={4}>
          <Text fontSize="md" fontWeight="bold">
            Applications:
          </Text>
          <UnorderedList spacing={1} pl={4}>
            {projectApplications.map((application, index) => (
              <ListItem key={index} fontSize="sm">
                {application}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      )}

      <IconButton
        aria-label="Bookmark project"
        icon={<StarIcon />}
        variant={isBookmarked ? "solid" : "outline"}
        colorScheme="yellow"
        onClick={handleBookmarkToggle}
        alignSelf="end"
      />
    </Box>
  );
};

export default ProjectCard;
