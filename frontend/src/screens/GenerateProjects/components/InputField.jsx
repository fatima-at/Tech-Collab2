import React from "react";
import { Input } from "../../../components";

import { FormControl, FormLabel } from "@chakra-ui/react";

const InputField = ({ label, ...props }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input {...props} />
  </FormControl>
);

export default InputField;
