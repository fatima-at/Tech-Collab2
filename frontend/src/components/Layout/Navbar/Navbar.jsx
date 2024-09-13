import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import {
  faUsers,
  faLightbulb,
  faStar,
  faCodeBranch,
  faHistory,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const location = useLocation();
  const fontFamily = "'Poppins', sans-serif"; // Use Poppins or any other special font

  // Mapping routes to page titles and icons
  const pageDetails = {
    "/explore-users": { title: "Explore Users", icon: faUsers },
    "/explore-projects": { title: "Explore Projects", icon: faLightbulb },
    "/recommended-projects": { title: "Recommended Projects", icon: faStar },
    "/generate-projects": { title: "Generate Projects", icon: faCodeBranch },
    "/sessions-history": { title: "Sessions History", icon: faHistory },
    "/saved-projects": { title: "Saved Projects", icon: faBookmark },
    "/profile": { title: "Your Profile", icon: faUsers },
  };

  // Get the current page details based on the route
  const currentPageDetails = pageDetails[location.pathname] || {
    title: "Tech-Collab",
    icon: null,
  };

  return (
    <Box bg={bg} px={6} boxShadow="sm" fontFamily={fontFamily}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Display the current page icon and title */}
        <HStack spacing={3}>
          {currentPageDetails.icon && (
            <Icon
              as={FontAwesomeIcon}
              icon={currentPageDetails.icon}
              boxSize={6}
              color={textColor}
            />
          )}
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {currentPageDetails.title}
          </Text>
        </HStack>

        {/* Right side - Theme Toggle */}
        <IconButton
          size="md"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
