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
} from "@chakra-ui/react";

export function ProjectPopup({
  isOpen,
  onClose,
  selectedProject,
  handleToggleBookmark,
}) {
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    setLoading(true);
    try {
      await handleToggleBookmark();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedProject?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md" color="gray.500">
            Session: {selectedProject?.project_session?.title}
          </Text>
          <Text mt={4}>
            {selectedProject?.description || "No description available."}
          </Text>
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
