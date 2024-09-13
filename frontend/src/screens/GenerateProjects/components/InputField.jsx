import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({ label, ...props }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input {...props} />
  </FormControl>
);

export default InputField;
