import { Input, Text } from "../../../components";
import { primaryTextColor } from "../../../constants/colors";

const InputField = ({ label, ...props }) => (
  <div className="flex-col-05">
    <Text type="p" color={primaryTextColor}>
      {label}
    </Text>
    <Input {...props} />
  </div>
);

export default InputField;
