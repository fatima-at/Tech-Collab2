import React, { useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export function ProjectPopup({
  isOpen,
  onClose,
  selectedProject,
  handleToggleBookmark,
}) {
  const [loading, setLoading] = useState(false);

  // Parse the stringified arrays
  const projectSteps = selectedProject?.project_steps
    ? JSON.parse(selectedProject.project_steps)
    : [];
  const projectRequirements = selectedProject?.project_requirements
    ? JSON.parse(selectedProject.project_requirements)
    : [];
  const projectTips = selectedProject?.project_tips
    ? JSON.parse(selectedProject.project_tips)
    : [];
  const projectApplications = selectedProject?.project_applications
    ? JSON.parse(selectedProject.project_applications)
    : [];

  const handleBookmarkClick = async () => {
    setLoading(true);
    try {
      await handleToggleBookmark();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>{selectedProject?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md" color="gray.500">
            Session: {selectedProject?.project_session?.title}
          </Text>
          <Text mt={4}>
            {selectedProject?.project_description ||
              "No description available."}
          </Text>

          {/* Display project steps */}
          {projectSteps.length > 0 && (
            <VStack align="start" spacing={2} mt={4}>
              <Text fontSize="md" fontWeight="bold">
                Steps:
              </Text>
              <UnorderedList spacing={1} pl={4}>
                {projectSteps.map((step, index) => (
                  <ListItem key={index} fontSize="sm">
                    {step}
                  </ListItem>
                ))}
              </UnorderedList>
            </VStack>
          )}

          {/* Display project requirements */}
          {projectRequirements.length > 0 && (
            <VStack align="start" spacing={2} mt={4}>
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

          {/* Display project tips */}
          {projectTips.length > 0 && (
            <VStack align="start" spacing={2} mt={4}>
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

          {/* Display project applications */}
          {projectApplications.length > 0 && (
            <VStack align="start" spacing={2} mt={4}>
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
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={selectedProject?.is_bookmarked ? "red" : "green"}
            onClick={handleBookmarkClick}
            isLoading={loading}
            disabled={loading}
          >
            {selectedProject?.is_bookmarked
              ? "Remove Bookmark"
              : "Add Bookmark"}
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
