import React from "react";
import Text from "../Text";
import { logoEmblem } from "../../../assets";
import "./styles.css";
import { useColorModeValue } from "@chakra-ui/react";

const LogoHeader = () => {
  return (
    <div className="logo-header">
      <div className="logo-header-logo-container">
        <img src={logoEmblem} alt="" />
        <Text type="h5" color={useColorModeValue("gray.200", "gray.700")}>
          Tech-Collab
        </Text>
      </div>
    </div>
  );
};

export default LogoHeader;
