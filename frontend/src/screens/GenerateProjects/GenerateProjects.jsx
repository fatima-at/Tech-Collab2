import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { EmptyState, Loader } from "../../components";
import {
  focusAreaOptions,
  complexityLevelOptions,
  toolsAndTechnologies,
  durationOptions,
  teamSizeOptions,
  expectedOutcomeOptions,
} from "../../constants/generateProjectsOptions";
import {
  createProjectSession,
  getProjectSessionData,
} from "../../services/ProjectSessionApi";
import { toast } from "react-toastify";
import { useAuth } from "../../context";
import { createProject } from "../../services/ProjectApi";
import SelectField from "./components/SelectField ";
import InputField from "./components/InputField";
import { useParams } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";
import { AI_API } from "../../Endpoints";
import {
  Flex,
  Box,
  Heading,
  Text,
  Switch,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SelectOptions from "./components/SelectOptions";
import { FaRocket, FaSyncAlt } from "react-icons/fa";

const GenerateProjects = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const projectsBoxRef = useRef(null);
  const { authUser } = useAuth();
  const { sessionId: routeSessionId } = useParams();
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString(
    "en-GB"
  )} ${now.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })}`;

  const [loading, setLoading] = useState(false);
  const [fetchingSessionDataLoading, setFetchingSessionDataLoading] = useState(
    routeSessionId ? true : false
  );
  const [sessionData, setSessionData] = useState({
    sessionId: routeSessionId || "",
    sessionTitle: `Session ${formattedDate}`,
    includeCV: true,
    selectedFocusAreaOptions: [],
    selectedToolsAndTechnologiesOptions: [],
    selectedComplexityLevel: {},
    selectedDuration: {},
    selectedTeamSize: {},
    selectedExpectedOutcome: {},
    generatedProjects: [],
  });

  const updateSessionData = (key, value) => {
    setSessionData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const generateSessionString = (sessionData) => {
    const {
      selectedFocusAreaOptions,
      selectedToolsAndTechnologiesOptions,
      selectedComplexityLevel,
      selectedDuration,
      selectedTeamSize,
      selectedExpectedOutcome,
    } = sessionData;

    // Create a string for focus areas
    const focusAreas = selectedFocusAreaOptions
      .map((option) => option.label)
      .join(" - ");

    // Create a string for tools and technologies
    const toolsAndTechnologies = selectedToolsAndTechnologiesOptions
      .map((option) => option.label)
      .join(" - ");

    // Construct the full string
    const sessionString = `Focus Area: ${focusAreas}, Complexity Level: ${
      selectedComplexityLevel?.label || "N/A"
    }, Duration: ${selectedDuration?.label || "N/A"}, Team Size: ${
      selectedTeamSize?.label || "N/A"
    }, Expected Outcome: ${
      selectedExpectedOutcome?.label || "N/A"
    }, Tools and Technologies: ${toolsAndTechnologies}`;

    return sessionString;
  };

  const generateProject = async (sessionData) => {
    // Construct the form data
    const formData = new FormData();
    formData.append("preference", generateSessionString(sessionData));
    if (sessionData.includeCV)
      formData.append("student_ID", authUser.vector_id);

    const apiRoute = sessionData.includeCV
      ? "/generate_project_2"
      : "/generate_project_1";

    try {
      const response = await fetch(AI_API + apiRoute, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Error: ${data.message || "Failed to generate project"}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  const handleGenerateClick = async () => {
    setLoading(true);
    const newProject = await generateProject(sessionData);

    const createProjectBody = {
      title: newProject?.Project_Name || "",
      project_description: newProject?.Project_Description || "",
      project_steps: JSON.stringify(newProject?.Project_Steps || []),
      project_requirements: JSON.stringify(
        newProject?.Project_Requirements || []
      ),
      project_tips: JSON.stringify(newProject?.Project_Tips || []),
      project_applications: JSON.stringify(
        newProject?.Project_Applications || []
      ),
    };

    try {
      if (!sessionData.sessionId) {
        const sessionPayload = {
          user_id: authUser.id,
          title: sessionData.sessionTitle || `Session ${formattedDate}`,
          include_cv: sessionData.includeCV,
          focus_area: sessionData.selectedFocusAreaOptions.map(
            (option) => option.value
          ),
          complexity_level: sessionData.selectedComplexityLevel?.value,
          tools_and_technologies:
            sessionData.selectedToolsAndTechnologiesOptions.map(
              (option) => option.value
            ),
          duration: sessionData.selectedDuration?.value,
          team_size: sessionData.selectedTeamSize?.value,
          expected_outcome: sessionData.selectedExpectedOutcome?.value,
        };

        const response = await createProjectSession(sessionPayload);

        if (response.status) {
          updateSessionData("sessionId", response.data.id);
          await createAndAddProject(response.data.id, createProjectBody);
        } else {
          toast.error(response.message);
        }
      } else {
        await createAndAddProject(sessionData.sessionId, createProjectBody);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createAndAddProject = async (sessionId, projectData) => {
    try {
      const response = await createProject(projectData, sessionId);
      if (response.status) {
        updateSessionData("generatedProjects", [
          ...sessionData.generatedProjects,
          response.data,
        ]);
        if (projectsBoxRef.current) {
          projectsBoxRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const clearSessionData = () => {
    setSessionData({
      sessionId: "",
      sessionTitle: `Session ${formattedDate}`,
      includeCV: true,
      selectedFocusAreaOptions: [],
      selectedToolsAndTechnologiesOptions: [],
      selectedComplexityLevel: {},
      selectedDuration: {},
      selectedTeamSize: {},
      selectedExpectedOutcome: {},
      generatedProjects: [],
    });
  };

  // Function to remove sessionId and generated projects
  const startNewSession = () => {
    setSessionData((prevData) => ({
      ...prevData,
      sessionId: "",
      generatedProjects: [],
    }));
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      if (routeSessionId) {
        try {
          const response = await getProjectSessionData(routeSessionId);
          if (response.status) {
            const session = response.data;
            setSessionData({
              sessionId: session.id,
              sessionTitle: session.title,
              includeCV: session.include_cv,
              selectedFocusAreaOptions: session.focus_areas.map((area) => ({
                value: area.name,
                label: area.name,
              })),
              selectedToolsAndTechnologiesOptions:
                session.tools_and_technologies.map((tool) => ({
                  value: tool.name,
                  label: tool.name,
                })),
              selectedComplexityLevel: {
                value: session.complexity_level,
                label: session.complexity_level,
              },
              selectedDuration: {
                value: session.duration,
                label: session.duration,
              },
              selectedTeamSize: {
                value: session.team_size,
                label: session.team_size,
              },
              selectedExpectedOutcome: {
                value: session.expected_outcome,
                label: session.expected_outcome,
              },
              generatedProjects: session.projects,
            });
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Failed to fetch session data");
        } finally {
          setFetchingSessionDataLoading(false);
        }
      }
    };

    fetchSessionData();
  }, [routeSessionId]);

  return (
    <>
      {fetchingSessionDataLoading ? (
        <Loader />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          p={8}
          width="100%"
          overflowY="auto"
        >
          {/* Options Box */}
          <Flex flexDir="column" gap={6} flex={1}>
            <Heading as="h5" size="md" color={textColor}>
              Customize Your Project Preferences
            </Heading>
            <Box
              backgroundColor={cardBg}
              p={6}
              boxShadow="lg"
              borderRadius="md"
              overflowY="auto"
            >
              <VStack spacing={4} align="stretch">
                <Flex justify="space-between" align="center">
                  <Text fontSize="md" color={textColor} fontWeight={500}>
                    Personalize Project with My CV
                  </Text>
                  <Switch
                    id="include-cv"
                    isChecked={sessionData.includeCV}
                    onChange={() =>
                      updateSessionData("includeCV", !sessionData.includeCV)
                    }
                    colorScheme="blue"
                    isDisabled={sessionData.sessionId || loading}
                  />
                </Flex>

                <InputField
                  label="Session Title"
                  value={sessionData.sessionTitle}
                  onChange={(e) =>
                    updateSessionData("sessionTitle", e.target.value)
                  }
                  placeholder="Enter session title"
                  isDisabled={sessionData.sessionId || loading}
                />

                {renderSelectFields(sessionData, updateSessionData, loading)}
              </VStack>
            </Box>

            <Flex gap={4}>
              {/* Conditionally render Clear or Start New Session button */}
              {sessionData.sessionId ? (
                <Button
                  leftIcon={<FaSyncAlt />}
                  colorScheme="yellow"
                  onClick={startNewSession}
                  flex={1}
                >
                  Start New Session
                </Button>
              ) : (
                <Button
                  colorScheme="red"
                  onClick={clearSessionData}
                  isDisabled={loading}
                  flex={1}
                >
                  Clear
                </Button>
              )}
              <Button
                colorScheme="blue"
                size="md"
                onClick={handleGenerateClick}
                isLoading={loading}
                loadingText="Generating..."
                fontWeight="500"
                leftIcon={<FaRocket />}
                flex={1}
              >
                Generate Project
              </Button>
            </Flex>
          </Flex>

          {/* Projects Box */}
          <Flex flexDir="column" gap={6} flex={2}>
            <Heading as="h5" size="md" color={textColor}>
              Generated Projects
            </Heading>

            <Box
              backgroundColor={cardBg}
              p={6}
              boxShadow="lg"
              borderRadius="md"
              overflowY="auto"
              height="100%"
              ref={projectsBoxRef}
            >
              {sessionData.generatedProjects.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {sessionData.generatedProjects
                    ?.slice()
                    ?.reverse()
                    ?.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </VStack>
              ) : (
                <EmptyState
                  title="No Projects Generated Yet"
                  message="Start by selecting your preferences to generate projects."
                />
              )}
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default GenerateProjects;

const renderSelectFields = (sessionData, updateSessionData, loading) => (
  <>
    <SelectOptions
      label="Focus Area"
      options={focusAreaOptions}
      selectedOptions={sessionData.selectedFocusAreaOptions}
      onChange={(selected) =>
        updateSessionData("selectedFocusAreaOptions", selected)
      }
      placeholder="Select focus area..."
      isDisabled={sessionData.sessionId || loading}
    />

    <SelectField
      label="Complexity level"
      options={complexityLevelOptions}
      value={sessionData.selectedComplexityLevel?.value}
      onChange={(selected) =>
        updateSessionData("selectedComplexityLevel", selected)
      }
      placeholder="Select complexity level"
      isDisabled={sessionData.sessionId || loading}
    />

    <SelectOptions
      label="Tools and Technologies"
      options={toolsAndTechnologies}
      selectedOptions={sessionData.selectedToolsAndTechnologiesOptions}
      onChange={(selected) =>
        updateSessionData("selectedToolsAndTechnologiesOptions", selected)
      }
      placeholder="Select tools and technologies..."
      isDisabled={sessionData.sessionId || loading}
    />

    <SelectField
      label="Duration"
      options={durationOptions}
      value={sessionData.selectedDuration?.value}
      onChange={(selected) => updateSessionData("selectedDuration", selected)}
      placeholder="Select project duration"
      isDisabled={sessionData.sessionId || loading}
    />

    <SelectField
      label="Team Size"
      options={teamSizeOptions}
      value={sessionData.selectedTeamSize?.value}
      onChange={(selected) => updateSessionData("selectedTeamSize", selected)}
      placeholder="Select team size"
      isDisabled={sessionData.sessionId || loading}
    />

    <SelectField
      label="Expected Outcome"
      options={expectedOutcomeOptions}
      value={sessionData.selectedExpectedOutcome?.value}
      onChange={(selected) =>
        updateSessionData("selectedExpectedOutcome", selected)
      }
      placeholder="Select expected outcome"
      isDisabled={sessionData.sessionId || loading}
    />
  </>
);
