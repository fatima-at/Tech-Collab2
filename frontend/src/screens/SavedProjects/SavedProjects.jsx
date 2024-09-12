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
  useDisclosure,
} from "@chakra-ui/react";
import { ProjectPopup } from "./components/ProjectPopup";
import ProjectCard from "../../components/Custom/ProjectCard/ProjectCard";

const SavedProjects = () => {
  const {
    data: savedProjects,
    loading: savedProjectsLoading,
    setData: setSavedProjects,
  } = useFetch(() => getBookmarkedProjects());

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
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.project_description}
              subtitle={project.project_session?.title}
              handleProjectClick={() => handleProjectClick(project)}
            />
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
