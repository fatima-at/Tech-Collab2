import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
  ModalCloseButton,
} from "@chakra-ui/react";

const LogoutPopup = ({ isOpen, onClose, handleSubmit }) => {
  const modalBg = useColorModeValue("white", "gray.800");
  const [loading, setLoading] = useState(false);

  const handlePrimaryButtonClick = async () => {
    setLoading(true);
    await handleSubmit();
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={modalBg} borderRadius="lg" p={4}>
        {/* Close button */}
        <ModalHeader fontSize="lg" fontWeight="500">
          Logout
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="center">
            {/* Title */}
            {/* <Text fontSize="xl" fontWeight="bold">
              Logout
            </Text> */}

            <Text fontSize="md" color="gray.400" textAlign="center">
              Are you sure you want to logout of your account?
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4} w="100%" justify="flex-end">
            {/* Cancel Button */}
            <Button variant="outline" onClick={onClose} colorScheme="gray">
              Cancel
            </Button>

            {/* Primary Action Button */}
            <Button
              colorScheme="red"
              onClick={handlePrimaryButtonClick}
              isLoading={loading}
              loadingText="Logging out..."
              spinner={<Spinner size="sm" />}
            >
              Logout
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutPopup;
