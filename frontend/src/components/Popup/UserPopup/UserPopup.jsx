import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
  Skeleton,
} from "@chakra-ui/react";
import { FaLinkedin, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { followUser, unfollowUser } from "../../../services/UserApi";
import useFetchSelectedUser from "./hooks/useFetchSelectedUser";
import { useAuth } from "../../../context";

export const UserPopup = ({
  isOpen,
  onClose,
  selectedUser,
}) => {
  const { authUser, setAuthUser } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const modalBgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.700, gray.900)"
  );

  const { userLoading, userData, fetchSelectedUser } = useFetchSelectedUser(
    selectedUser?.id
  );
  const followIcon = selectedUser?.is_following ? (
    <FaUserMinus />
  ) : (
    <FaUserPlus />
  );

  const [isFollowingLoading, setIsFollowingLoading] = useState(false); // Loading state for the button

  const handleFollowToggle = async () => {
    setIsFollowingLoading(true); // Start loading
    const body = {
      followee_id: selectedUser?.id,
    };

    try {
      let updatedAuthUser;
      if (
        authUser.following?.some(
          (followingUser) => followingUser.id === selectedUser?.id
        )
      ) {
        // Unfollow the user
        const response = await unfollowUser(body);
        if (response.status) {
          // Update authUser's following array by removing the ?'s ID
          updatedAuthUser = {
            ...authUser,
            following: authUser.following.filter(
              (followee) => followee.id !== selectedUser?.id
            ),
          };
        }
      } else {
        // Follow the user
        const response = await followUser(body);
        if (response.status) {
          // Update authUser's following array by adding the selectedUser's ID
          updatedAuthUser = {
            ...authUser,
            following: [...authUser.following, selectedUser],
          };
        }
      }

      // Update the state with the updated user
      setAuthUser(updatedAuthUser); // Update authUser state
    } catch (error) {
      console.error("Error toggling follow status:", error);
    } finally {
      setIsFollowingLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (selectedUser?.id) fetchSelectedUser(); // Fetch the selected user when the component mounts
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
              colorScheme={
                authUser.following?.some(
                  (followingUser) => followingUser?.id === selectedUser?.id
                )
                  ? "red"
                  : "blue"
              }
              leftIcon={followIcon}
              isLoading={isFollowingLoading} // Add loading state
              size="sm"
              borderRadius="md"
              alignSelf="center"
              mt={2}
              boxShadow="lg"
              px={4}
            >
              {authUser.following?.some(
                (followingUser) => followingUser?.id === selectedUser?.id
              )
                ? "Unfollow"
                : "Follow"}
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4} w="100%">
            {/* Profile Picture and General Info */}
            <Flex alignItems="flex-start" w="100%" gap={6}>
              <Avatar
                name={selectedUser?.name}
                src={selectedUser?.profile_picture}
                size="2xl"
                boxShadow="lg"
              />
              <VStack align="start" spacing={2} w="100%">
                <Text fontSize="lg" fontWeight="600" color={textColor}>
                  {selectedUser?.general_field}
                </Text>
                <Text fontSize="md" fontWeight="400" color="gray.500">
                  {selectedUser?.bio ? selectedUser.bio : "No bio available."}
                </Text>
                {/* LinkedIn Button */}
                {selectedUser?.linkedin_profile && (
                  <Link href={selectedUser?.linkedin_profile} isExternal>
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

            {/* Followers */}
            <Text fontSize="lg" fontWeight="500" color={textColor} mt={4}>
              Followers: {selectedUser?.followers_count || 0}
            </Text>

            {/* Skills Section */}
            {userLoading ? (
              <VStack align="start" spacing={4} w="100%" mt={6}>
                <Skeleton height="20px" width="150px" />
                <Wrap>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <WrapItem key={index}>
                      <Skeleton height="32px" width="80px" borderRadius="md" />
                    </WrapItem>
                  ))}
                </Wrap>
              </VStack>
            ) : (
              userData?.skills?.length > 0 && (
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
              )
            )}

            {/* Projects Section */}
            {userLoading ? (
              <VStack align="start" spacing={4} w="100%" mt={6}>
                <Skeleton height="20px" width="150px" />
                <Skeleton height="150px" width="100%" borderRadius="lg" />
                <Skeleton height="150px" width="100%" borderRadius="lg" />
              </VStack>
            ) : (
              userData?.user_projects?.length > 0 && (
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
                          <Link href={project.url} isExternal color="blue.500">
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
                              ? new Date(project.end_date).toLocaleDateString()
                              : "Ongoing"
                          }`}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              )
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
