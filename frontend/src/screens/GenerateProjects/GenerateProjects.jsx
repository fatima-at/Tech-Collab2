import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Loader, Text } from "../../components";
import { Switch } from "@chakra-ui/react";
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
import { generateProjectWithoutCv } from "../../services/ProjectAiApi";
import { AI_API } from "../../Endpoints";

const GenerateProjects = () => {
  const { authUser } = useAuth();
  const { sessionId: routeSessionId } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchingSessionDataLoading, setFetchingSessionDataLoading] = useState(
    routeSessionId ? true : false
  );
  const [sessionData, setSessionData] = useState({
    sessionId: routeSessionId || null,
    sessionTitle: "",
    includeCV: true,
    selectedFocusAreaOptions: [],
    selectedToolsAndTechnologiesOptions: [],
    selectedComplexityLevel: null,
    selectedDuration: null,
    selectedTeamSize: null,
    selectedExpectedOutcome: null,
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
    if (sessionData.includeCV) formData.append("pdf_b64", authUser.base64Cv);

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
          title: sessionData.sessionTitle,
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
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
        <div className="generate-projects-screen">
          <div className="generate-projects-inputs-box">
            <div className="generate-projects-inputs-container">
              <div className="flex-between">
                <Text type="h6" color="white">
                  Include CV:
                </Text>
                <Switch
                  id="include-cv"
                  isChecked={sessionData.includeCV}
                  onChange={() =>
                    updateSessionData("includeCV", !sessionData.includeCV)
                  }
                  colorScheme="primary"
                  disabled={sessionData.sessionId || loading}
                />
              </div>

              <InputField
                label="Session Title"
                value={sessionData.sessionTitle}
                onChange={(e) =>
                  updateSessionData("sessionTitle", e.target.value)
                }
                placeholder="Enter session title"
                disabled={sessionData.sessionId || loading}
              />

              <SelectField
                label="Focus Area"
                options={focusAreaOptions}
                selectedOptions={sessionData.selectedFocusAreaOptions}
                handleChange={(selected) =>
                  updateSessionData("selectedFocusAreaOptions", selected)
                }
                placeholder="Select focus area options..."
                disabled={sessionData.sessionId || loading}
                isMulti
              />

              <SelectField
                label="Complexity level"
                options={complexityLevelOptions}
                selectedOption={sessionData.selectedComplexityLevel}
                handleChange={(selected) =>
                  updateSessionData("selectedComplexityLevel", selected)
                }
                placeholder="Select complexity level"
                disabled={sessionData.sessionId || loading}
              />

              <SelectField
                label="Tools and Technologies"
                options={toolsAndTechnologies}
                selectedOptions={
                  sessionData.selectedToolsAndTechnologiesOptions
                }
                handleChange={(selected) =>
                  updateSessionData(
                    "selectedToolsAndTechnologiesOptions",
                    selected
                  )
                }
                placeholder="Select tools and technologies..."
                disabled={sessionData.sessionId || loading}
                isMulti
              />

              <SelectField
                label="Duration"
                options={durationOptions}
                selectedOption={sessionData.selectedDuration}
                handleChange={(selected) =>
                  updateSessionData("selectedDuration", selected)
                }
                placeholder="Select project duration"
                disabled={sessionData.sessionId || loading}
              />

              <SelectField
                label="Team Size"
                options={teamSizeOptions}
                selectedOption={sessionData.selectedTeamSize}
                handleChange={(selected) =>
                  updateSessionData("selectedTeamSize", selected)
                }
                placeholder="Select team size"
                disabled={sessionData.sessionId || loading}
              />

              <SelectField
                label="Expected Outcome"
                options={expectedOutcomeOptions}
                selectedOption={sessionData.selectedExpectedOutcome}
                handleChange={(selected) =>
                  updateSessionData("selectedExpectedOutcome", selected)
                }
                placeholder="Select expected outcome"
                disabled={sessionData.sessionId || loading}
              />
            </div>

            <Button
              type="Primary"
              style={{ width: "100%" }}
              onClick={handleGenerateClick}
              loading={loading}
            >
              Generate
            </Button>
          </div>

          <div className="generate-projects-outputs-box">
            {sessionData.generatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateProjects;
