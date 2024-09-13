import React, { useEffect, useState } from "react";
import {
  GridItem,
  Grid,
  Text,
  Avatar,
  useColorModeValue,
  useDisclosure,
  VStack,
  Box,
  Input,
  Heading,
  Flex,
  Center,
  SkeletonCircle,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { ScreenContainer, EmptyState, Loader } from "../../components";
import { getUsersByVectorID, searchUsers } from "../../services/UserApi";
import { UserPopup } from "../../components/Popup/UserPopup/UserPopup";
import { toast } from "react-toastify";
import { getMatchingUsers } from "../../services/UserAiApi";
import { useAuth } from "../../context";

const ExploreUsers = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const avatarBorderColor = useColorModeValue("gray.200", "gray.600");

  const { authUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [recommendedUsersLoading, setRecommenededUsersLoading] = useState(true);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  // Settings for react-slick carousel with custom arrows and 5 slides
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Display 5 users at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 users on medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 users on small screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 user on very small screens
        },
      },
    ],
  };

  const updateUsers = (updatedUser) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const fetchRecommendedUsers = async () => {
    if (!recommendedUsersLoading) setRecommenededUsersLoading(true);
    try {
      // Call the Match_S2S API to get vector user IDs
      const matchResponse = await getMatchingUsers(authUser.vector_id);

      // Call getUsersByVectorID API with the retrieved vector IDs
      const body = {
        vector_ids: matchResponse,
      };
      const response = await getUsersByVectorID(body);

      if (response.status) {
        setRecommendedUsers(response.data);
      } else {
        toast.error("Error fetching users", response.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setRecommenededUsersLoading(false);
    }
  };

  // Debouncing search query
  useEffect(() => {
    const controller = new AbortController(); // To handle request cancellation if needed
    const signal = controller.signal;

    if (searchQuery) {
      setUsersLoading(true);

      // Debounce the search request by 500ms
      const delayDebounceFn = setTimeout(async () => {
        try {
          const response = await searchUsers(searchQuery, signal);
          setAllUsers(response.data || []);
        } catch (error) {
          console.error("Error searching users:", error);
        } finally {
          setUsersLoading(false);
        }
      }, 500);

      return () => {
        clearTimeout(delayDebounceFn);
        controller.abort();
      };
    } else {
      setAllUsers([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchRecommendedUsers();
  }, []);

  return (
    <ScreenContainer>
      {/* Recommended Users Section */}
      <Box mb={6} position="relative">
        <Heading fontSize="2xl" fontWeight="bold" mb={2} color={textColor}>
          Recommended Users Based on Your Profile
        </Heading>
        <Text fontSize="md" color="gray.500" mb={4}>
          These users share similar interests or skills with you.
        </Text>

        <Slider {...settings}>
          {recommendedUsersLoading
            ? Array(5)
                .fill("")
                .map((_, index) => (
                  <Box key={index} p={3}>
                    <VStack bg={cardBg} borderRadius="md" boxShadow="md" p={5}>
                      <SkeletonCircle size="50px" />
                      <Skeleton height="20px" width="80%" />
                      <Skeleton height="15px" width="60%" />
                      <Skeleton height="12px" width="90%" noOfLines={2} />
                    </VStack>
                  </Box>
                ))
            : recommendedUsers
                ?.filter((user) => user.id !== authUser.id)
                ?.map((user) => (
                  <Box key={user.id} p={3} cursor="pointer">
                    <VStack
                      bg={cardBg}
                      borderRadius="md"
                      boxShadow="md"
                      transition="all 0.3s ease-in-out"
                      _hover={{
                        boxShadow: "lg",
                        transform: "scale(1.05)",
                        bg: cardHoverBg,
                      }}
                      onClick={() => handleUserClick(user)}
                      p={5}
                    >
                      <Avatar
                        name={user.name}
                        src={user.profile_picture}
                        size="md"
                        border="2px solid"
                        borderColor={avatarBorderColor}
                      />
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color={textColor}
                        textAlign="center"
                      >
                        {user.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        {user.general_field}
                      </Text>
                      <Text
                        fontSize="xs"
                        color={textColor}
                        textAlign="center"
                        noOfLines={2}
                      >
                        {user.bio ? user.bio : "No bio available"}
                      </Text>
                    </VStack>
                  </Box>
                ))}
        </Slider>
      </Box>

      {/* Search Users Section */}
      <Box mb={6} mt={12}>
        <Flex direction="column" alignItems="center" mb={4}>
          <Input
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="md"
            width={{ base: "100%", sm: "400px", md: "500px" }}
            borderColor="gray.300"
            borderRadius="md"
            boxShadow="sm"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </Flex>

        {/* Only display users if the search query is not empty */}
        {searchQuery === "" ? (
          <Center h="100%">
            <VStack spacing={3}>
              <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                Search for users
              </Text>
              <Text fontSize="sm" color="gray.500">
                Start typing a name to find users.
              </Text>
            </VStack>
          </Center>
        ) : usersLoading ? (
          <Flex justifyContent="center" alignItems="center" mt={6}>
            <Spinner size="lg" />
          </Flex>
        ) : allUsers?.length === 0 ? (
          <EmptyState
            title="No users found"
            message="We couldn't find users matching your search."
          />
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
            {allUsers
              ?.filter((user) => user.id !== authUser.id)
              ?.map((user) => (
                <GridItem
                  key={user.id}
                  bg={cardBg}
                  p={3}
                  borderRadius="md"
                  boxShadow="md"
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    boxShadow: "lg",
                    transform: "scale(1.05)",
                    bg: cardHoverBg,
                  }}
                  onClick={() => handleUserClick(user)}
                  cursor="pointer"
                >
                  <VStack align="center" spacing={2}>
                    <Avatar
                      name={user.name}
                      src={user.profile_picture}
                      size="md"
                      border="2px solid"
                      borderColor={avatarBorderColor}
                    />
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color={textColor}
                      textAlign="center"
                    >
                      {user.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      {user.general_field}
                    </Text>
                    <Text
                      fontSize="xs"
                      color={textColor}
                      textAlign="center"
                      noOfLines={2}
                    >
                      {user.bio ? user.bio : "No bio available"}
                    </Text>
                  </VStack>
                </GridItem>
              ))}
          </Grid>
        )}
      </Box>

      {/* User Popup */}
      <UserPopup
        isOpen={isOpen}
        onClose={onClose}
        selectedUser={selectedUser}
        updateUsers={updateUsers}
        setSelectedUser={setSelectedUser}
      />
    </ScreenContainer>
  );
};

export default ExploreUsers;
