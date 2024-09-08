import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Avatar,
  VStack,
  Link,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon

export const UserPopup = ({ isOpen, onClose, selectedUser }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const modalBgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.700, gray.900)"
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        bgGradient={modalBgGradient}
        borderRadius="lg"
        boxShadow="2xl"
      >
        <ModalHeader fontSize="2xl" fontWeight="bold">
          {selectedUser?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={6} w="100%">
            {/* Profile Picture and General Info */}
            <Flex alignItems="center" w="100%">
              <Avatar
                name={selectedUser?.name}
                src={selectedUser?.profile_picture}
                size="xl"
              />
              <VStack align="start" ml={5} spacing={2}>
                <Text fontSize="lg" fontWeight="600" color={textColor}>
                  {selectedUser?.general_field}
                </Text>
                <Text fontSize="md" fontWeight="400" color="gray.500">
                  {selectedUser?.bio ? selectedUser.bio : "No bio available."}
                </Text>
                {/* LinkedIn Button */}
                {selectedUser?.linkedin_profile && (
                  <Link href={selectedUser.linkedin_profile} isExternal>
                    <Button
                      leftIcon={<FaLinkedin />}
                      colorScheme="linkedin"
                      size="sm"
                    >
                      LinkedIn
                    </Button>
                  </Link>
                )}
              </VStack>
            </Flex>

            {/* Followers */}
            <Text fontSize="lg" fontWeight="500" color={textColor}>
              Followers: {selectedUser?.followers?.length || 0}
            </Text>

            {/* Projects */}
            {selectedUser?.userProjects?.length > 0 && (
              <VStack align="start" spacing={4} w="100%">
                <Text fontSize="lg" fontWeight="500" color={textColor}>
                  Projects:
                </Text>
                {selectedUser.userProjects.map((project, index) => (
                  <Box
                    key={project.id}
                    w="100%"
                    bg={cardBg}
                    p={6}
                    borderRadius="lg"
                    boxShadow="lg"
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.02)" }}
                  >
                    <VStack align="start" spacing={3}>
                      {/* Project Title */}
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="100%"
                      >
                        <Text fontSize="xl" fontWeight="600" color={textColor}>
                          {project.title}
                        </Text>
                      </Flex>

                      {/* Project Description */}
                      <Text fontSize="md" fontWeight="400" color="gray.500">
                        {project.description}
                      </Text>

                      {/* Project URL */}
                      {project.url && (
                        <Link href={project.url} isExternal color="blue.500">
                          Visit Project
                        </Link>
                      )}

                      {/* Technologies */}
                      <Text fontSize="sm" fontWeight="400" color="gray.500">
                        Technologies: {project.technologies.join(", ")}
                      </Text>

                      {/* Project Dates */}
                      <Text fontSize="sm" fontWeight="400" color="gray.500">
                        {`Status: ${project.status}, Start: ${new Date(
                          project.start_date
                        ).toLocaleDateString()}, End: ${
                          project.end_date
                            ? new Date(project.end_date).toLocaleDateString()
                            : "Ongoing"
                        }`}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
