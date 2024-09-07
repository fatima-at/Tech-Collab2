import { Input, Text } from "../../../components";

const InputField = ({ label, ...props }) => (
  <div className="flex-col-05">
    <Text type="p" color="white">
      {label}
    </Text>
    <Input {...props} />
  </div>
);

export default InputField;
