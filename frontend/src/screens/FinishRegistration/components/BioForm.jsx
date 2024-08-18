import React from "react";
import { Button, Input, Text } from "../../../components";
import generalFieldOptions from "../../../constants/generalFieldOptions";

const BioForm = ({ formInputs, handleInputChange, setCurrentStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };
  return (
    <div className="register-box-container">
      <div className="register-box">
        <Text type="h2" color="white" style={{ textAlign: "center" }}>
          Tell Us About Yourself
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            label="General Field"
            name="generalField"
            placeholder="Your general field"
            value={formInputs.generalField}
            onChange={handleInputChange}
            type="select"
            required
            fullWidth
            options={generalFieldOptions}
            optionsValue="name"
          />
          <Input
            label="Bio"
            name="bio"
            placeholder="Your bio here"
            value={formInputs.bio}
            onChange={handleInputChange}
            required
            fullWidth
            type="textarea"
            inputStyle={{ height: "5rem" }}
          />

          {formInputs.generalField === "Other" && (
            <Input
              label="General Field (Other)"
              name="otherGeneralField"
              placeholder="Specify your general field"
              value={formInputs.otherGeneralField}
              onChange={handleInputChange}
              required
              fullWidth
            />
          )}
          <Button
            type="Primary"
            style={{ width: "100%", marginTop: ".5rem" }}
            submit
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BioForm;
