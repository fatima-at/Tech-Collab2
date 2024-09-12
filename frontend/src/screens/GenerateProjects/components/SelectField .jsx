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
      value={value}
      onChange={(e) => {
        // For single-select, set the value directly
        if (!isMulti) {
          onChange(e.target.value);
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
