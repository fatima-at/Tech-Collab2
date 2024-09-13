import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const SelectField = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  isDisabled,
  isMulti = false,
}) => (
  <FormControl isDisabled={isDisabled}>
    <FormLabel>{label}</FormLabel>
    <Select
      placeholder={placeholder}
      value={value || ""} // Ensure that value is set to an empty string when cleared
      onChange={(e) => {
        // For single-select, find the selected option object and pass it
        if (!isMulti) {
          const selectedOption = options.find(
            (option) => option.value === e.target.value
          );
          onChange(selectedOption || null); // Pass the entire object, or null if nothing is selected
        }
      }}
      multiple={isMulti}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
