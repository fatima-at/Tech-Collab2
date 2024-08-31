import React from "react";
import Select from "react-select";
import { primaryColor } from "../../../constants/colors";

const ReactSelect = ({
  isMulti,
  options,
  selectedOptions,
  handleChange,
  placeholder,
  selectedOption,
  disabled,
}) => {
  return (
    <>
      {isMulti ? (
        <Select
          isDisabled={disabled}
          isMulti
          value={selectedOptions}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          closeMenuOnSelect={false}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "gray.300",
              boxShadow: "none",
              "&:hover": {
                borderColor: "gray.400",
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: primaryColor,
              color: "white",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: "white",
              ":hover": {
                backgroundColor: primaryColor,
                color: "white",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? primaryColor
                : state.isFocused
                ? "#f0f0f0"
                : "white",
              color: state.isSelected ? "white" : "black",
              "&:active": {
                backgroundColor: primaryColor,
              },
            }),
          }}
        />
      ) : (
        <Select
          isDisabled={disabled}
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? primaryColor : "gray.300",
              boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : "none",
              "&:hover": {
                borderColor: "gray.400",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? primaryColor
                : state.isFocused
                ? "#f0f0f0"
                : "white",
              color: state.isSelected ? "white" : "black",
              "&:active": {
                backgroundColor: primaryColor,
              },
            }),
            dropdownIndicator: (base, state) => ({
              ...base,
              color: state.isFocused ? primaryColor : "gray",
              "&:hover": {
                color: primaryColor,
              },
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: "gray.300",
            }),
          }}
        />
      )}
    </>
  );
};

export default ReactSelect;
