import React, { useState } from "react";
import "./styles.css";
import useFetch from "../../hooks/useFetch";
import {
  getBookmarkedProjects,
  toggleBookmarkProject,
} from "../../services/ProjectApi";
import { EmptyState, Loader, ScreenContainer } from "../../components";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ProjectPopup } from "./components/ProjectPopup";

const SavedProjects = () => {
  const {
    data: savedProjects,
    loading: savedProjectsLoading,
    setData: setSavedProjects,
  } = useFetch(() => getBookmarkedProjects());

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const handleToggleBookmark = async () => {
    if (selectedProject) {
      try {
        const response = await toggleBookmarkProject(selectedProject.id);
        if (response.status) {
          const updatedProject = {
            ...selectedProject,
            is_bookmarked: !selectedProject.is_bookmarked,
          };
          setSelectedProject(updatedProject);
          setSavedProjects((prevProjects) => {
            if (updatedProject.is_bookmarked) {
              return [...prevProjects, updatedProject];
            } else {
              return prevProjects.filter(
                (project) => project.id !== updatedProject.id
              );
            }
          });
        } else {
          console.error("Failed to toggle bookmark");
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
      }
    }
  };

  return (
    <ScreenContainer>
      {savedProjectsLoading ? (
        <Loader />
      ) : savedProjects?.length === 0 ? (
        <EmptyState
          title="No saved projects yet"
          message="Bookmark your favorite projects to see them here."
        />
      ) : (
        <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
          {savedProjects?.map((project) => (
            <GridItem
              key={project.id}
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
                  Session: {project?.project_session?.title}
                </Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}

      <ProjectPopup
        isOpen={isOpen}
        onClose={onClose}
        selectedProject={selectedProject}
        handleToggleBookmark={handleToggleBookmark}
      />
    </ScreenContainer>
  );
};

export default SavedProjects;
