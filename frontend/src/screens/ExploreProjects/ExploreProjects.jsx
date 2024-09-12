import React, { useEffect, useState } from "react";
import {
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
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import { ScreenContainer } from "../../components";
import { ProjectPopup } from "./components/ProjectPopup";
import { projects } from "./projects";
import { IoMdBulb } from "react-icons/io";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../../components/Custom/ProjectCard/ProjectCard";
import { useAuth } from "../../context";
import { toast } from "react-toastify";
import { AI_API } from "../../Endpoints";
import { RecommendedProjectPopup } from "./components/RecommendedProjectPopup";
import { createStandAloneProject } from "../../services/ProjectApi";

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

const ExploreProjects = () => {
  const { authUser } = useAuth();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [recommendedProject, setRecommendedProject] = useState({});
  const [recommendingProjectLoading, setRecommendingProjectLoading] =
    useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRecommendedProjectOpen,
    onOpen: onRecommendedProjectOpen,
    onClose: onRecommendedProjectClose,
  } = useDisclosure();
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [recommendedProjectsLoading, setRecommendedProjectsLoading] =
    useState(true);

  const bgColor = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
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

  const fetchRecommendedProjects = async () => {
    if (!recommendedProjectsLoading) setRecommendedProjectsLoading(true);
    try {
      const formData = new FormData();
      formData.append("student_ID", authUser.vector_id);
      formData.append("preference", " ");
      const recommendProjectsResponse = await fetch(
        `${AI_API}/recommend_project_1`,
        {
          method: "POST",
          body: formData,
        }
      );
      const recommendedProjectsValue = await recommendProjectsResponse.json();
      setRecommendedProjects(recommendedProjectsValue);
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setRecommendedProjectsLoading(false);
    }
  };

  const handleRecommendProject = async () => {
    setRecommendingProjectLoading(true);
    try {
      const formData = new FormData();
      formData.append("student_ID", authUser.vector_id);
      const recommendProjectResponse = await fetch(
        `${AI_API}/recommend_project_2`,
        {
          method: "POST",
          body: formData,
        }
      );
      const recommendedProjectValue = await recommendProjectResponse.json();
      setRecommendedProject(recommendedProjectValue);
      const createProjectBody = {
        title: recommendedProjectValue?.Project_Name || "",
        project_description: recommendedProjectValue?.Project_Description || "",
        project_steps: JSON.stringify(
          recommendedProjectValue?.Project_Steps || []
        ),
        project_requirements: JSON.stringify(
          recommendedProjectValue?.Project_Requirements || []
        ),
        project_tips: JSON.stringify(
          recommendedProjectValue?.Project_Tips || []
        ),
        project_applications: JSON.stringify(
          recommendedProjectValue?.Project_Applications || []
        ),
      };
      await createStandAloneProject(createProjectBody);
      onRecommendedProjectOpen();
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setRecommendingProjectLoading(false);
    }
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

  useEffect(() => {
    fetchRecommendedProjects();
  }, []);

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
            _hover={
              !recommendingProjectLoading
                ? {
                    bgGradient: "linear(to-r, cyan.500, teal.400)",
                    transform: "scale(1.025)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                  }
                : {}
            }
            isLoading={recommendingProjectLoading}
            spinner={<Spinner size="sm" />}
            loadingText="Analyzing Preferences..."
            onClick={handleRecommendProject}
          >
            Recommend with AI
          </Button>
        </Flex>
        <Slider {...sliderSettings}>
          {recommendedProjectsLoading
            ? Array(3)
                .fill("")
                .map((_, index) => (
                  <Box key={index} p={3} cursor="pointer">
                    <VStack bg={bgColor} borderRadius="md" boxShadow="md" p={5}>
                      <Skeleton height="20px" width="80%" />
                      <Skeleton height="15px" width="60%" />
                      <Skeleton height="12px" width="90%" noOfLines={2} />
                    </VStack>
                  </Box>
                ))
            : recommendedProjects.map((project) => (
                <Box key={project.ID} p={3} cursor="pointer">
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
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color={textColor}
                      textAlign="center"
                    >
                      {project.title}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      Category: {project.category}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
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
      <RecommendedProjectPopup
        isOpen={isRecommendedProjectOpen}
        onClose={onRecommendedProjectClose}
        recommendedProject={recommendedProject}
      />
    </ScreenContainer>
  );
};

export default ExploreProjects;
