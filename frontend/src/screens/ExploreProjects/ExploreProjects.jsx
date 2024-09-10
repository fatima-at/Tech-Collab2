import React, { useState } from "react";
import {
  GridItem,
  Grid,
  Text,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Input,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import { ScreenContainer } from "../../components";
import { ProjectPopup } from "./components/ProjectPopup";
import { projects, recommendedProjects } from "./projects";
import { IoMdBulb } from "react-icons/io";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRobot } from "react-icons/fa";
import ProjectCard from "../../components/Custom/ProjectCard/ProjectCard";

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

const ExploreProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("teal.400", "teal.500");
  const buttonHoverBg = useColorModeValue("teal.500", "teal.600");
  const buttonTextColor = useColorModeValue("white", "gray.100");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === category)
      );
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) &&
          (selectedCategory === "All" || project.category === selectedCategory)
      )
    );
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const handleToggleBookmark = async () => {
    // Logic to toggle bookmark
    setSelectedProject((prevProject) => ({
      ...prevProject,
      is_bookmarked: !prevProject.is_bookmarked,
    }));
  };

  // Settings for react-slick carousel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Display 3 projects at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 projects on medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 project on small screens
        },
      },
    ],
  };

  return (
    <ScreenContainer>
      {/* Recommended Projects Section */}
      <Box mb={6}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
            Recommended Projects
          </Text>

          <Button
            size="lg"
            leftIcon={<IoMdBulb />}
            bgGradient="linear(to-r, teal.400, cyan.500)"
            color={buttonTextColor}
            borderRadius="md"
            boxShadow="0 4px 14px rgba(0, 0, 0, 0.1)"
            transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
            _hover={{
              bgGradient: "linear(to-r, cyan.500, teal.400)",
              transform: "scale(1.025)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            Recommend with AI
          </Button>
        </Flex>
        <Slider {...sliderSettings}>
          {recommendedProjects.map((project) => (
            <Box key={project.title} p={3} cursor="pointer">
              <VStack
                bg={bgColor}
                borderRadius="md"
                boxShadow="md"
                transition="all 0.3s ease-in-out"
                _hover={{
                  boxShadow: "lg",
                  transform: "scale(1.05)",
                  bg: cardHoverBg,
                }}
                onClick={() => handleProjectClick(project)}
                p={5}
              >
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  {project.title}
                </Text>
                <Text fontSize="md" color="gray.500">
                  Category: {project.category}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {project.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* All Projects Section */}
      <Box mb={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
          All Projects
        </Text>

        {/* Search Bar and Category Filter */}
        <Flex justifyContent="center" alignItems="center" mb={6} gap={4}>
          {/* Search Input */}
          <Input
            placeholder="Search projects by title..."
            value={searchQuery}
            onChange={handleSearch}
            size="md"
            maxW="400px" // Increased max width for better appearance
            borderColor="gray.300"
            boxShadow="sm"
          />

          {/* Category Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="white" // Different background color for contrast
              color="gray.700"
              _hover={{ bg: "gray.100" }}
              _focus={{ boxShadow: "outline" }}
            >
              {selectedCategory}
            </MenuButton>
            <MenuList bg="white" boxShadow="lg">
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  _hover={{ bg: "gray.200" }} // Hover effect for items
                >
                  {category}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        {/* Projects Grid */}
        <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              subtitle={project.category}
              handleProjectClick={() => handleProjectClick(project)}
            />
          ))}
        </Grid>
      </Box>

      {/* Project Popup */}
      <ProjectPopup
        isOpen={isOpen}
        onClose={onClose}
        selectedProject={selectedProject}
        handleToggleBookmark={handleToggleBookmark}
      />
    </ScreenContainer>
  );
};

export default ExploreProjects;
