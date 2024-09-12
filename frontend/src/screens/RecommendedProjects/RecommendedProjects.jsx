import React, { useState } from "react";
import "./styles.css";
import useFetch from "../../hooks/useFetch";
import { getRecommendedProjects } from "../../services/ProjectApi";
import { EmptyState, Loader, ScreenContainer } from "../../components";
import { Grid, useDisclosure } from "@chakra-ui/react";
import ProjectCard from "../../components/Custom/ProjectCard/ProjectCard";
import { ProjectPopup } from "../SavedProjects/components/ProjectPopup";

const RecommendedProjects = () => {
  const { data: recommendedProjects, loading: recommendedProjectsLoading } =
    useFetch(() => getRecommendedProjects());

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <ScreenContainer>
      {recommendedProjectsLoading ? (
        <Loader />
      ) : recommendedProjects?.length === 0 ? (
        <EmptyState
          title="No recommended projects yet"
          message="Recommend a project with AI from Explore Projects page."
        />
      ) : (
        <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
          {recommendedProjects?.map((project) => (
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
        isRecommended
      />
    </ScreenContainer>
  );
};

export default RecommendedProjects;
