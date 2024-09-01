import { Text } from "../../../components";
import ReactSelect from "../../../components/UI/ReactSelect";

const SelectField = ({
  label,
  options,
  selectedOption,
  selectedOptions,
  handleChange,
  placeholder,
  disabled,
  isMulti = false,
}) => (
  <div className="flex-col-05">
    <Text type="p" color="white">
      {label}
    </Text>
    <ReactSelect
      options={options}
      selectedOptions={selectedOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      isMulti={isMulti}
    />
  </div>
);

export default SelectField;
