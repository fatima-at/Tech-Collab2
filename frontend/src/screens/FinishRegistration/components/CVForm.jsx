import React, { useRef, useState } from "react";
import { Button, Text } from "../../../components";
import { useAuth } from "../../../context";
import { toast } from "react-toastify";
import { CRUD_API } from "../../../Endpoints";
import { TOKEN_KEY } from "../../../context/AuthContext";

const CVForm = ({ formInputs, setCurrentStep }) => {
  const { setAuthUser } = useAuth();
  const token = localStorage.getItem(TOKEN_KEY);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const goBack = () => {
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("bio", formInputs.bio);
    formData.append(
      "general_field",
      formInputs.generalField === "Other"
        ? formInputs.otherGeneralField
        : formInputs.generalField
    );
    formData.append("cv", selectedFile);

    // Append skills as individual entries
    formInputs.skills?.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill.name);
    });
    try {
      const response = await fetch(`${CRUD_API}/complete-registration`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status) {
        setAuthUser((currentAuthUser) => {
          return { ...currentAuthUser, registration_completed: true };
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-box-container">
      <div className="register-box">
        <Text type="h2" color="white" style={{ textAlign: "center" }}>
          Upload Your CV
        </Text>
        <Text type="p" color="white" style={{ textAlign: "center" }}>
          Please upload your CV in PDF format. The file size should not exceed
          5MB.
        </Text>
        <form onSubmit={handleSubmit}>
          <button
            className="finish-registration-cv-button"
            onClick={handleUploadButtonClick}
            type="button"
          >
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
              disabled={!selectedFile}
              loading={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVForm;
