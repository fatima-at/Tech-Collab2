import React, { useState } from "react";
import { Button, Input, Text } from "../../../components";
import technicalSkillsOptions from "../../../constants/technicalSkillsOptions";
import { primaryColor } from "../../../constants/colors";

const SkillsForm = ({ setFormInputs, setCurrentStep, skills, setSkills }) => {
  const [skillInput, setSkillInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormInputs((currentValue) => {
      return {
        ...currentValue,
        skills: skills?.filter((skill) => skill.isSelected),
      };
    });
    setCurrentStep(3);
  };

  const goBack = () => {
    setFormInputs((currentValue) => {
      return {
        ...currentValue,
        skills: skills?.filter((skill) => skill.isSelected),
      };
    });
    setCurrentStep(1);
  };

  const toggleSkillSelection = (skillId) => {
    setSkills((currentSkills) => {
      const newSkills = currentSkills.map((skill) => {
        if (skill.id === skillId)
          return { ...skill, isSelected: !skill.isSelected };
        else return skill;
      });
      return newSkills;
    });
  };

  const addSkill = (skillName) => {
    setSkills((currentSkills) => {
      return [
        { name: skillName, id: currentSkills.length + 1, isSelected: true },
        ...currentSkills,
      ];
    });
    setSkillInput("");
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(skillInput.toLowerCase())
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      if (skillInput.trim() && filteredSkills?.length === 0) {
        addSkill(skillInput);
      }
    }
  };

  return (
    <div className="register-box-container">
      <div className="register-box">
        <Text type="h2" color="white" style={{ textAlign: "center" }}>
          Select Your Technical Skills
        </Text>
        <form onSubmit={handleSubmit}>
          <div className="finish-registration-skills-input-container">
            <Input
              name="skillInput"
              placeholder="Search..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
            />
            {filteredSkills?.length === 0 && (
              <button onClick={() => addSkill(skillInput)}>
                ⏎ / Create '{skillInput}'
              </button>
            )}
          </div>
          <div className="finish-registration-non-selected-skills">
            {filteredSkills?.map((skill) => (
              <div
                style={skill.isSelected ? { background: primaryColor } : {}}
                onClick={() => toggleSkillSelection(skill.id)}
                key={skill.id}
              >
                {skill.name}
              </div>
            ))}
          </div>
          <div className="flex-1">
            <Button
              type="Secondary"
              style={{ width: "100%", marginTop: ".5rem" }}
              onClick={goBack}
            >
              Back
            </Button>
            <Button
              type="Primary"
              style={{ width: "100%", marginTop: ".5rem" }}
              submit
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
