import React, { useState } from "react";
import "./styles.css";
import { Button, Input, Text } from "../../components";
import { Switch } from "@chakra-ui/react";
import Select from "react-select";
import { primaryColor } from "../../constants/colors";
import ReactSelect from "../../components/UI/ReactSelect";
import {
  focusAreaOptions,
  complexityLevelOptions,
  toolsAndTechnologies,
  durationOptions,
  teamSizeOptions,
  expectedOutcomeOptions,
} from "../../constants/generateProjectsOptions";
import { createSession } from "../../services/ProjectSessionApi";
import { toast } from "react-toastify";
import { useAuth } from "../../context";
import { createProject } from "../../services/ProjectApi";

const GenerateProjects = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [includeCV, setIncludeCV] = useState(true);
  const handleToggleIncludeCVSwitch = () => {
    setIncludeCV((current) => {
      return !current;
    });
  };
  const [selectedFocusAreaOptions, setSelectedFocusAreaOptions] = useState([]);
  const [
    selectedToolsAndTechnologiesOptions,
    setSelectedToolsAndTechnologiesOptions,
  ] = useState([]);
  const [selectedComplexityLevel, setSelectedComplexityLevel] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTeamSize, setSelectedTeamSize] = useState(null);
  const [selectedExpectedOutcome, setSelectedExpectedOutcome] = useState(null);
  const [generatedProjects, setGeneratedProjects] = useState([]);
  const [sessionTitle, setSessionTitle] = useState("");

  const handleFocusAreaOptionsChange = (selected) => {
    setSelectedFocusAreaOptions(selected);
  };
  const handleToolsAndTechnologiesOptionsChange = (selected) => {
    setSelectedToolsAndTechnologiesOptions(selected);
  };
  const handleComplexityLevelChange = (selected) => {
    setSelectedComplexityLevel(selected);
  };
  const handleDurationChange = (selected) => {
    setSelectedDuration(selected);
  };

  const handleTeamSizeChange = (selected) => {
    setSelectedTeamSize(selected);
  };

  const handleExpectedOutcomeChange = (selected) => {
    setSelectedExpectedOutcome(selected);
  };

  const handleSessionTitleChange = (e) => {
    setSessionTitle(e.target.value);
  };

  const generateProject = async () => {
    setLoading(true);
    const newProject =
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem";
    const createProjectBody = {
      title: newProject,
    };
    if (!sessionId) {
      const body = {
        user_id: authUser.id,
        title: sessionTitle,
        include_cv: includeCV,
        focus_area: selectedFocusAreaOptions.map((option) => option.value),
        complexity_level: selectedComplexityLevel.value,
        tools_and_technologies: selectedToolsAndTechnologiesOptions.map(
          (option) => option.value
        ),
        duration: selectedDuration.value,
        team_size: selectedTeamSize.value,
        expected_outcome: selectedExpectedOutcome.value,
      };
      try {
        const response = await createSession(body);
        if (response.status) {
          setSessionId(response.data.id);
          try {
            const createProjectResponse = await createProject(
              createProjectBody,
              response.data.id
            );
            if (createProjectResponse.status) {
              setGeneratedProjects((current) => {
                return [...current, newProject];
              });
            } else {
              toast.error(createProjectResponse.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const createProjectResponse = await createProject(
          createProjectBody,
          sessionId
        );
        if (createProjectResponse.status) {
          setGeneratedProjects((current) => {
            return [...current, newProject];
          });
        } else {
          toast.error(createProjectResponse.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="generate-projects-screen">
      <div className="generate-projects-inputs-box">
        <div className="generate-projects-inputs-container">
          <div className="flex-between">
            <Text type="h6" color="white">
              Include CV:
            </Text>
            <Switch
              id="include-cv"
              isChecked={includeCV}
              onChange={handleToggleIncludeCVSwitch}
              colorScheme="primary"
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Session Title
            </Text>
            <Input
              placeholder="Enter session title"
              onChange={handleSessionTitleChange}
              value={sessionTitle}
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Focus Area
            </Text>
            <ReactSelect
              options={focusAreaOptions}
              selectedOptions={selectedFocusAreaOptions}
              isMulti
              handleChange={handleFocusAreaOptionsChange}
              placeholder="Select focus area options..."
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Complexity level
            </Text>
            <ReactSelect
              options={complexityLevelOptions}
              selectedOption={selectedComplexityLevel}
              handleChange={handleComplexityLevelChange}
              placeholder="Select complexity level"
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Tools and Technologies
            </Text>
            <ReactSelect
              options={toolsAndTechnologies}
              selectedOptions={selectedToolsAndTechnologiesOptions}
              isMulti
              handleChange={handleToolsAndTechnologiesOptionsChange}
              placeholder="Select tools and technologies..."
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Duration
            </Text>
            <ReactSelect
              options={durationOptions}
              selectedOption={selectedDuration}
              handleChange={handleDurationChange}
              placeholder="Select project duration"
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Team Size
            </Text>
            <ReactSelect
              options={teamSizeOptions}
              selectedOption={selectedTeamSize}
              handleChange={handleTeamSizeChange}
              placeholder="Select team size"
              disabled={sessionId}
            />
          </div>
          <div className="flex-col-05">
            <Text type="p" color="white">
              Expected Outcome
            </Text>
            <ReactSelect
              options={expectedOutcomeOptions}
              selectedOption={selectedExpectedOutcome}
              handleChange={handleExpectedOutcomeChange}
              placeholder="Select expected outcome"
              disabled={sessionId}
            />
          </div>
        </div>
        <Button
          type="Primary"
          style={{ width: "100%" }}
          onClick={generateProject}
          loading={loading}
        >
          Generate
        </Button>
      </div>
      <div className="generate-projects-outputs-box">
        {generatedProjects?.map((project, index) => (
          <div className="generate-projects-project-card" key={index}>
            {project}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateProjects;
