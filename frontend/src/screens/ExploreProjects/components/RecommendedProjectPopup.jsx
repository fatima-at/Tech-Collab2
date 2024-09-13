import React from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Confetti from "react-confetti";

export function RecommendedProjectPopup({
  isOpen,
  onClose,
  recommendedProject,
}) {
  // Parse the stringified arrays
  const projectSteps = recommendedProject?.Project_Steps || [];
  const projectRequirements = recommendedProject?.Project_Requirements || [];
  const projectTips = recommendedProject?.Project_Tips || [];
  const projectApplications = recommendedProject?.Project_Applications || [];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        {isOpen && (
          <Confetti numberOfPieces={1400} gravity={0.05} recycle={false} />
        )}
        <ModalContent maxW="800px">
          <ModalHeader>{recommendedProject?.Project_Name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mt={4}>
              {recommendedProject?.Project_Description ||
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
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
