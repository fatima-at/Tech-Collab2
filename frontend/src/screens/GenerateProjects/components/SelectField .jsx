import { Text } from "../../../components";
import ReactSelect from "../../../components/UI/ReactSelect";
import { primaryTextColor } from "../../../constants/colors";

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
    <Text type="p" color={primaryTextColor}>
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
