import React from "react";
import {
  VStack,
  Input,
  Button,
  Text,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import generalFieldOptions from "../../../constants/generalFieldOptions";

const BioForm = ({ formInputs, handleInputChange, setCurrentStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.600");

  return (
    <Flex justify="center" align="center" h="100%" width="100%">
      <Box
        maxW="500px"
        width="100%"
        p={6}
        bg={cardBg}
        borderRadius="lg"
        boxShadow="xl"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        mx="auto"
      >
        <Text
          fontSize="2xl"
          color={useColorModeValue("gray.800", "white")}
          textAlign="center"
          mb={6}
          fontWeight="500"
        >
          Tell Us About Yourself
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start" w="100%">
            {/* General Field */}
            <Input
              as="select"
              placeholder="Your general field"
              value={formInputs.generalField}
              onChange={handleInputChange}
              bg={inputBg}
              focusBorderColor="blue.400"
              required
              size="md"
              borderRadius="md"
              name="generalField"
            >
              {generalFieldOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Input>

            {/* Bio */}
            <Input
              placeholder="Your bio here"
              value={formInputs.bio}
              onChange={handleInputChange}
              required
              size="md"
              bg={inputBg}
              focusBorderColor="blue.400"
              as="textarea"
              height="10rem"
              borderRadius="md"
              name="bio"
            />

            {/* Other General Field */}
            {formInputs.generalField === "Other" && (
              <Input
                placeholder="Specify your general field"
                value={formInputs.otherGeneralField}
                onChange={handleInputChange}
                required
                size="md"
                bg={inputBg}
                focusBorderColor="blue.400"
                borderRadius="md"
                name="otherGeneralField"
              />
            )}

            <Input
              placeholder="LinkedIn profile link"
              value={formInputs.linkedinProfileLink}
              onChange={handleInputChange}
              size="md"
              bg={inputBg}
              focusBorderColor="blue.400"
              borderRadius="md"
              name="linkedinProfileLink"
              type="url"
            />

            {/* Next Button */}
            <Button
              type="submit"
              colorScheme="blue"
              bg={buttonBg}
              width="100%"
              mt={4}
              borderRadius="md"
            >
              Next
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default BioForm;
