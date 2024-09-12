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
} from "@chakra-ui/react";

export function ProjectPopup({ isOpen, onClose, selectedProject }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedProject?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={3}>
            <Text fontSize="md" color="gray.500">
              Category: {selectedProject?.category}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {selectedProject?.description || "No description available."}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
