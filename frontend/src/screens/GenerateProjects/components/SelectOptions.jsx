import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  useDisclosure,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const SelectOptions = ({
  label,
  options,
  selectedOptions,
  onChange,
  placeholder,
  isDisabled,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempSelectedOptions, setTempSelectedOptions] = useState(
    selectedOptions || []
  );
  const [customOptions, setCustomOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [newOption, setNewOption] = useState("");
  const buttonsContainerRef = useRef(null);

  const toggleOption = (option) => {
    if (
      tempSelectedOptions.some((selected) => selected.value === option.value)
    ) {
      setTempSelectedOptions((prev) =>
        prev.filter((selected) => selected.value !== option.value)
      );
    } else {
      setTempSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleSave = () => {
    onChange(tempSelectedOptions);
    onClose();
  };

  const handleAddNewOption = () => {
    if (!newOption.trim()) {
      toast.error("Option cannot be empty.");
      return;
    }

    if (customOptions.some((option) => option.value === newOption.trim())) {
      toast.error("Option already exists.");
      return;
    }

    const newOptionObject = { value: newOption, label: newOption };
    const updatedOptions = [...customOptions, newOptionObject];
    setCustomOptions(updatedOptions);
    setTempSelectedOptions((prev) => [...prev, newOptionObject]);
    setFilteredOptions(updatedOptions); // Update filtered options to include the new option
    setNewOption("");

    // Scroll to the bottom of the buttons container when a new option is added
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.scrollTop =
        buttonsContainerRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewOption();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewOption(value);

    // Filter options based on input
    const filtered = customOptions.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text fontWeight="500">{label}</Text>
        <IconButton
          size="sm"
          icon={<EditIcon />}
          onClick={onOpen}
          aria-label="Edit"
          isDisabled={isDisabled}
        />
      </Flex>

      {/* Display selected options as badges */}
      <Flex mt={2} wrap="wrap" gap={2}>
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <Badge key={option.value} colorScheme="blue" px={2} py={1}>
              {option.label}
            </Badge>
          ))
        ) : (
          <Text color="gray.500">{placeholder || "No options selected"}</Text>
        )}
      </Flex>

      {/* Popup (Modal) for selecting options */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader position="sticky" top="0" bg={bg} zIndex="1">
            Select {label}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody p={4}>
            {/* Scrollable button section */}
            <Box maxH="300px" overflowY="auto" p={2} ref={buttonsContainerRef}>
              <Flex wrap="wrap" gap={2}>
                {filteredOptions.map((option) => (
                  <Button
                    key={option.value}
                    size="sm"
                    width="fit-content"
                    fontWeight="normal"
                    variant={
                      tempSelectedOptions.some(
                        (selected) => selected.value === option.value
                      )
                        ? "solid"
                        : "outline"
                    }
                    colorScheme="blue"
                    onClick={() => toggleOption(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </Flex>
            </Box>
          </ModalBody>

          {/* Improved Footer Layout */}
          <Flex
            direction="column"
            p={4}
            position="sticky"
            bottom="0"
            bg={bg}
            zIndex="1"
            w="100%"
            gap={4}
          >
            <Flex align="center" gap={2} width="100%">
              <Input
                placeholder="Add or search options"
                value={newOption}
                onChange={handleInputChange} // Filter options as user types
                onKeyDown={handleKeyDown} // Handle enter key press
                flex="1"
              />
              <Button
                colorScheme="blue"
                size="sm"
                fontWeight="normal"
                leftIcon={<AddIcon />}
                onClick={handleAddNewOption}
              >
                Add
              </Button>
            </Flex>

            <Button
              colorScheme="blue"
              size="sm"
              fontWeight="normal"
              leftIcon={<CheckIcon />}
              onClick={handleSave}
              alignSelf="flex-end"
            >
              Save
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SelectOptions;
