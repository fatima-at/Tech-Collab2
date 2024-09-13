import React, { useEffect, useState } from "react";
import "./styles.css";
import BioForm from "./components/BioForm";
import SkillsForm from "./components/SkillsForm";
import CVForm from "./components/CVForm";
import { useAuth } from "../../context";

const FinishRegistration = () => {
  const { authUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(authUser?.vector_id ? 2 : 1);
  const [formInputs, setFormInputs] = useState({
    bio: "",
    generalField: "",
    otherGeneralField: "",
    skills: [],
    linkedinProfileLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    let vectorData = null;

    try {
      const data = localStorage.getItem("vector_data");
      vectorData = data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing vector_data from localStorage:", error);
      vectorData = null; // or handle error appropriately
    }
    if (vectorData) {
      let initialSkills = [];
      let initialBio = "";
      if (vectorData?.skills?.length > 0) {
        initialSkills = vectorData.skills;
      }
      if (vectorData?.summary) {
        initialBio = vectorData.summary;
      }
      if (vectorData?.skills?.length > 0 || vectorData?.summary)
        setFormInputs((currentFormInputs) => {
          return {
            ...currentFormInputs,
            skills: initialSkills,
            bio: initialBio,
          };
        });
    }
  }, []);

  return (
    <>
      {currentStep === 1 ? (
        <CVForm setCurrentStep={setCurrentStep} setFormInputs={setFormInputs} />
      ) : currentStep === 2 ? (
        <BioForm
          formInputs={formInputs}
          handleInputChange={handleInputChange}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <SkillsForm
          setFormInputs={setFormInputs}
          setCurrentStep={setCurrentStep}
          formInputs={formInputs}
        />
      )}
    </>
  );
};

export default FinishRegistration;
