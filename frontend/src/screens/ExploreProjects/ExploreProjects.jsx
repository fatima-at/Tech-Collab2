import React, { useState } from "react";
import "./styles.css";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ScreenContainer } from "../../components";
import { ProjectPopup } from "./components/ProjectPopup";

const projects = [
  {
    title: "AI-Powered Chatbot",
    description:
      "Develop a chatbot that leverages natural language processing (NLP) and machine learning algorithms to provide automated responses and customer support.",
    category: "Artificial Intelligence",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Create a scalable e-commerce platform with features like user authentication, product catalog, shopping cart, and payment gateway integration.",
    category: "Web Development",
  },
  {
    title: "Mobile Health Tracking App",
    description:
      "Build a mobile application that tracks users' health metrics such as steps, heart rate, and sleep patterns, with data visualization and analytics features.",
    category: "Mobile Development",
  },
  {
    title: "Cybersecurity Incident Response System",
    description:
      "Design a system to detect, analyze, and respond to cybersecurity threats in real-time, with logging and alerting capabilities.",
    category: "Cybersecurity",
  },
  {
    title: "IoT-Based Smart Home System",
    description:
      "Develop a smart home system that allows users to control home appliances remotely through a mobile app, integrating IoT sensors and devices.",
    category: "Embedded Systems",
  },
  {
    title: "Blockchain-Based Voting System",
    description:
      "Create a secure, transparent, and tamper-proof voting system using blockchain technology to ensure the integrity of election processes.",
    category: "Blockchain",
  },
  {
    title: "Cloud-Based Data Backup Solution",
    description:
      "Develop a cloud-based service that automatically backs up user data, offering encryption, version control, and easy restoration features.",
    category: "Cloud Computing",
  },
  {
    title: "Machine Learning for Stock Price Prediction",
    description:
      "Implement a machine learning model to predict stock prices using historical data and technical indicators, with a focus on accuracy and reliability.",
    category: "Data Science",
  },
];

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

const ExploreProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const handleToggleBookmark = async () => {
    // Logic to toggle bookmark
    // For demonstration, let's assume all projects are already bookmarked
    setSelectedProject((prevProject) => ({
      ...prevProject,
      is_bookmarked: !prevProject.is_bookmarked,
    }));
  };

  return (
    <ScreenContainer>
      {/* Menu Bar with Category Dropdown */}
      <Box mb={6} display="flex" justifyContent="space-between">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedCategory}
          </MenuButton>
          <MenuList>
            {categories.map((category) => (
              <MenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>

      {/* Projects Grid */}
      <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
        {filteredProjects.map((project) => (
          <GridItem
            key={project.title}
            w="100%"
            p={5}
            borderRadius="lg"
            boxShadow="md"
            bg={bgColor}
            _hover={{ boxShadow: "xl" }}
            cursor="pointer"
            onClick={() => handleProjectClick(project)}
          >
            <VStack align="start" spacing={3}>
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
          </GridItem>
        ))}
      </Grid>

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
