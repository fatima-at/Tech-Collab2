import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Text from "../../UI/Text";
import Button from "../../UI/Button";

const Popup = ({
  onClose,
  title,
  description,
  primaryButtonText,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const variants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const handlePrimaryButtonClick = async () => {
    setLoading(true);
    await handleSubmit();
    setLoading(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-overlay"></div>
      <motion.div
        className="popup-box"
        initial={variants.hidden}
        animate={variants.visible}
        exit={variants.hidden}
        transition={{ duration: 0.25 }}
      >
        <div className="popup-header">
          <FontAwesomeIcon
            icon={faXmark}
            style={{ cursor: "pointer" }}
            onClick={onClose}
            color="white"
          />
        </div>
        <div className="popup-body">
          <Text type="h5" color="white">
            {title}
          </Text>
          {description && (
            <Text type="p" color="white">
              {description}
            </Text>
          )}
        </div>
        <div className="popup-footer">
          <Button type="Secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="Primary"
            style={{ background: "#EB5757" }}
            onClick={handlePrimaryButtonClick}
            loading={loading}
          >
            {primaryButtonText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
