import React, { useRef, useState } from "react";
import { Button, Text } from "../../../components";
import { useAuth } from "../../../context";
import { toast } from "react-toastify";
import { AI_API, CRUD_API } from "../../../Endpoints";
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

    try {
      // Convert the selected file (cv) to base64
      const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]); // Get base64 string only
          reader.onerror = (error) => reject(error);
        });

      const pdf_b64 = await fileToBase64(selectedFile);

      // Prepare form data for addUserToVectorDB API
      const vectorFormData = new FormData();
      vectorFormData.append("pdf_b64", pdf_b64);

      // Call the addUserToVectorDB API
      const addUserToVectorDBResponse = await fetch(
        `${AI_API}/add_Student_To_DB`,
        {
          method: "POST",
          body: vectorFormData,
        }
      );
      const { student_ID, skills } = await addUserToVectorDBResponse.json();
      console.log(student_ID, skills);

      if (!student_ID) {
        toast.error("Failed to retrieve student ID. Please try again.");
        setIsLoading(false);
        return;
      }
      // Prepare form data for complete-registration
      const formData = new FormData();
      formData.append("bio", formInputs.bio);
      formData.append(
        "general_field",
        formInputs.generalField === "Other"
          ? formInputs.otherGeneralField
          : formInputs.generalField
      );
      formData.append("cv", selectedFile);
      formData.append("vector_id", student_ID); // Use returned student_ID as vector_id

      // Append skills returned from addUserToVectorDB API
      skills?.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });

      // Call the complete-registration API
      const response = await fetch(`${CRUD_API}/complete-registration`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status) {
        setAuthUser((currentAuthUser) => ({
          ...currentAuthUser,
          registration_completed: true,
        }));
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
