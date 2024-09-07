import React from "react";
import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { ScreenContainer } from "../../components";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Passionate software developer with experience in building scalable web applications and working with modern technologies.",
  general_field: "Web Development",
  profile_picture: "https://via.placeholder.com/150", // Replace with actual URL
  cv: "https://example.com/cv.pdf", // Replace with actual URL
  skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
};

const getInitials = (name) => {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials.toUpperCase();
};

const Profile = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <ScreenContainer>
      <Box
        maxW="900px"
        mx="auto"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
      >
        {/* Profile Header */}
        <HStack spacing={6} alignItems="center" mb={6}>
          <Avatar size="2xl" src={user.profile_picture}>
            {!user.profile_picture && getInitials(user.name)}
          </Avatar>
          <VStack align="start" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {user.name}
            </Text>
            <Text fontSize="md" color="gray.500">
              {user.email}
            </Text>
            <Text fontSize="md" color={textColor}>
              {user.general_field}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.bio}
            </Text>
          </VStack>
        </HStack>

        {/* CV Section */}
        {user.cv && (
          <Box mb={6}>
            <Button
              as="a"
              href={user.cv}
              target="_blank"
              leftIcon={<DownloadIcon />}
              colorScheme="teal"
            >
              Download CV
            </Button>
          </Box>
        )}

        {/* Skills Section */}
        <Box mb={6}>
          <Text fontSize="xl" fontWeight="bold" mb={2} color={textColor}>
            Skills
          </Text>
          <SimpleGrid columns={[2, 3, 4]} spacing={3}>
            {user.skills.map((skill, index) => (
              <Badge
                key={index}
                px={3}
                py={1}
                borderRadius="full"
                colorScheme="teal"
                fontSize="sm"
              >
                {skill}
              </Badge>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Profile;
