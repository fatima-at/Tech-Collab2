import React, { useEffect, useState } from "react";
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
  Wrap,
  WrapItem,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../../context";
import { followUser, getUser, unfollowUser } from "../../../services/UserApi";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Loaders/Loader";
import useFetchSelectedUser from "./hooks/useFetchSelectedUser";

export const UserPopup = ({
  isOpen,
  onClose,
  selectedUser,
  updateUsers,
  setSelectedUser,
}) => {
  console.log(selectedUser);
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonGradient = useColorModeValue(
    "linear(to-r, blue.400, teal.400)",
    "linear(to-r, teal.500, blue.500)"
  );
  const modalBgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.700, gray.900)"
  );

  const { userLoading, userData, fetchSelectedUser } = useFetchSelectedUser(
    selectedUser?.id
  );
  const followButtonColor = selectedUser?.is_following ? "red.400" : "blue.400";
  const followIcon = selectedUser?.is_following ? (
    <FaUserMinus />
  ) : (
    <FaUserPlus />
  );

  const handleFollowToggle = async () => {
    const body = {
      followee_id: selectedUser?.id,
    };
    try {
      let updatedUser;
      if (selectedUser.is_following) {
        // Unfollow the user
        const response = await unfollowUser(body);
        if (response.status) {
          updatedUser = {
            ...selectedUser,
            is_following: false,
            followers_count: selectedUser.followers_count - 1,
          };
        }
      } else {
        // Follow the user
        const response = await followUser(body);
        if (response.status) {
          updatedUser = {
            ...selectedUser,
            is_following: true,
            followers_count: selectedUser.followers_count + 1,
          };
        }
      }

      // Update the state with the updated user
      updateUsers(updatedUser);
      setSelectedUser(updatedUser);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  useEffect(() => {
    fetchSelectedUser(); // Fetch the selected user when the component mounts
  }, [selectedUser?.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        bgGradient={modalBgGradient}
        borderRadius="lg"
        boxShadow="2xl"
        p={6}
      >
        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
          <Flex flexDirection="column">
            {selectedUser?.name}
            <Button
              onClick={handleFollowToggle}
              colorScheme={selectedUser?.is_following ? "red" : "blue"}
              leftIcon={followIcon} // Different icon for follow/unfollow
              size="sm" // Smaller button
              borderRadius="md"
              alignSelf="center" // Centered under the user's name
              mt={2}
              boxShadow="lg"
              px={4} // Reduced padding for a tighter look
              _hover={{ bg: followButtonColor }}
            >
              {selectedUser?.is_following ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4} w="100%">
            {/* Profile Picture and General Info */}
            <Flex alignItems="flex-start" justify="space-between" w="100%">
              <Flex alignItems="center" gap={4}>
                <Avatar
                  name={selectedUser?.name}
                  src={selectedUser?.profile_picture}
                  size="xl"
                  boxShadow="lg"
                />
                <VStack align="start" spacing={2}>
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
                        mt={2}
                      >
                        LinkedIn
                      </Button>
                    </Link>
                  )}
                </VStack>
              </Flex>
            </Flex>
            {/* Followers */}
            <Text fontSize="lg" fontWeight="500" color={textColor} mt={4}>
              Followers: {selectedUser?.followers_count || 0}
            </Text>
            {userLoading ? (
              <Loader />
            ) : (
              <>
                {/* Skills Section */}
                {userData?.skills?.length > 0 && (
                  <VStack align="start" spacing={4} w="100%" mt={6}>
                    <Text fontSize="lg" fontWeight="500" color={textColor}>
                      Skills:
                    </Text>
                    <Wrap>
                      {userData.skills.map((skill, index) => (
                        <WrapItem key={index}>
                          <Tag size="md" colorScheme="blue">
                            {skill.skill}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </VStack>
                )}

                {/* Projects Section */}
                {userData?.user_projects?.length > 0 && (
                  <VStack align="start" spacing={4} w="100%" mt={6}>
                    <Text fontSize="lg" fontWeight="500" color={textColor}>
                      Projects:
                    </Text>
                    {userData?.user_projects?.map((project) => (
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
                            <Text
                              fontSize="xl"
                              fontWeight="600"
                              color={textColor}
                            >
                              {project.title}
                            </Text>
                          </Flex>

                          {/* Project Description */}
                          <Text fontSize="md" fontWeight="400" color="gray.500">
                            {project.description}
                          </Text>

                          {/* Project URL */}
                          {project.url && (
                            <Link
                              href={project.url}
                              isExternal
                              color="blue.500"
                            >
                              Visit Project
                            </Link>
                          )}

                          {/* Technologies */}
                          <Text fontSize="sm" fontWeight="400" color="gray.500">
                            {project.technologies
                              ? project.technologies.split(", ").join(", ")
                              : "N/A"}
                          </Text>

                          {/* Project Dates */}
                          <Text fontSize="sm" fontWeight="400" color="gray.500">
                            {`Status: ${project.status}, Start: ${new Date(
                              project.start_date
                            ).toLocaleDateString()}, End: ${
                              project.end_date
                                ? new Date(
                                    project.end_date
                                  ).toLocaleDateString()
                                : "Ongoing"
                            }`}
                          </Text>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
