import React from "react";
import PropTypes from "prop-types";

const Text = ({ type, color = "black", children, style }) => {
  const getTextElement = () => {
    switch (type) {
      case "h1":
        return <h1 style={{ color, ...style }}>{children}</h1>;
      case "h2":
        return <h2 style={{ color, ...style }}>{children}</h2>;
      case "h3":
        return <h3 style={{ color, ...style }}>{children}</h3>;
      case "h4":
        return <h4 style={{ color, ...style }}>{children}</h4>;
      case "h5":
        return <h5 style={{ color, ...style }}>{children}</h5>;
      case "h6":
        return <h6 style={{ color, ...style }}>{children}</h6>;
      case "p":
        return <p style={{ color, ...style }}>{children}</p>;
      case "small":
        return <small style={{ color, ...style }}>{children}</small>;
      default:
        return <p style={{ color, ...style }}>{children}</p>;
    }
  };

  return getTextElement();
};

Text.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "small"])
    .isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;
