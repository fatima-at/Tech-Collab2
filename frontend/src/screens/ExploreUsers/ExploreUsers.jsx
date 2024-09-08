import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Avatar,
  useColorModeValue,
  useDisclosure,
  VStack,
  Box,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { ScreenContainer, EmptyState, Loader } from "../../components";
import { UserPopup } from "./components/UserPopup";
import { users as recommendedUsers } from "./users"; // Use 'users' for recommended dataset
import { fetchAllUsers } from "../../services/UserApi"; // Simulate API call to fetch all users

const ExploreUsers = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const avatarBorderColor = useColorModeValue("gray.200", "gray.600");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching all users from the API
    const fetchUsers = async () => {
      setUsersLoading(true);
      const response = await fetchAllUsers(); // Replace with actual API call
      setAllUsers(response.data || []); // Assuming response data is in "data" key
      setUsersLoading(false);
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  // Filter all users based on the search query
  const filteredAllUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      {/* Recommended Users Section */}
      <Box mb={6}>
        <Heading as="h1" size="lg" mb={2} color={textColor}>
          Recommended Users Based on Your Profile
        </Heading>
        <Text fontSize="md" color="gray.500" mb={4}>
          These users share similar interests or skills with you.
        </Text>

        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
          {recommendedUsers.map((user) => (
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
      </Box>

      {/* Search Users Section */}
      <Box mb={6}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h2" size="md" color={textColor}>
            Search for Users
          </Heading>
          <Input
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="md"
            width="300px" // Restrict width for better layout
            borderColor="gray.300"
          />
        </Flex>

        {/* Display Search Results */}
        {usersLoading ? (
          <Loader />
        ) : filteredAllUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            message="We couldn't find users matching your search."
          />
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
            {filteredAllUsers.map((user) => (
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
      />
    </ScreenContainer>
  );
};

export default ExploreUsers;
