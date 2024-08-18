import React, { useState } from "react";
import "./styles.css";
import { Button, Text } from "../../components";
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

const GenerateProjects = () => {
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
  const [selectedComplexityLevel, setSelectedComplexityLevel] = useState({});
  const [selectedDuration, setSelectedDuration] = useState({});
  const [selectedTeamSize, setSelectedTeamSize] = useState({});
  const [selectedExpectedOutcome, setSelectedExpectedOutcome] = useState({});
  const [generatedProjects, setGeneratedProjects] = useState([]);

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

  const generateProject = () => {
    setGeneratedProjects((current) => {
      return [
        ...current,
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      ];
    });
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
            />
          </div>
        </div>
        <Button
          type="Primary"
          style={{ width: "100%" }}
          onClick={generateProject}
        >
          Generate
        </Button>
      </div>
      <div className="generate-projects-outputs-box">
        {generatedProjects?.map((project) => (
          <div className="generate-projects-project-card">{project}</div>
        ))}
      </div>
    </div>
  );
};

export default GenerateProjects;
