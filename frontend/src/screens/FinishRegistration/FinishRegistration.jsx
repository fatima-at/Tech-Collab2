import React, { useState } from "react";
import "./styles.css";
import BioForm from "./components/BioForm";
import SkillsForm from "./components/SkillsForm";
import CVForm from "./components/CVForm";
import technicalSkillsOptions from "../../constants/technicalSkillsOptions";

const technicalSkills = technicalSkillsOptions.map((option, index) => {
  return {
    id: index,
    name: option,
    isSelected: false,
  };
});

const FinishRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formInputs, setFormInputs] = useState({
    bio: "",
    generalField: "",
    otherGeneralField: "",
    skills: [],
  });

  const [skills, setSkills] = useState(technicalSkills);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      {currentStep === 1 ? (
        <BioForm
          formInputs={formInputs}
          handleInputChange={handleInputChange}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === 2 ? (
        <SkillsForm
          setFormInputs={setFormInputs}
          setCurrentStep={setCurrentStep}
          skills={skills}
          setSkills={setSkills}
        />
      ) : (
        <CVForm formInputs={formInputs} setCurrentStep={setCurrentStep} />
      )}
    </>
  );
};

export default FinishRegistration;
