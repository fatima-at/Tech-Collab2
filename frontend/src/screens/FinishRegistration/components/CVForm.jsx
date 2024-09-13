import React, { useRef, useState } from "react";
import { useAuth } from "../../../context";
import { toast } from "react-toastify";
import { CRUD_API } from "../../../Endpoints";
import { TOKEN_KEY } from "../../../context/AuthContext";
import {
  VStack,
  Text,
  Button,
  Input,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

const CVForm = ({ setCurrentStep, setFormInputs }) => {
  const { setAuthUser } = useAuth();
  const token = localStorage.getItem(TOKEN_KEY);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const buttonBg = useColorModeValue("blue.500", "blue.600");

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare form data for complete-registration
      const formData = new FormData();
      formData.append("cv", selectedFile);

      // Call the complete-registration API
      const response = await fetch(`${CRUD_API}/upload-cv`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (responseData.status) {
        setAuthUser((currentAuthUser) => ({
          ...currentAuthUser,
          vector_id: responseData?.data?.student_ID,
          cv: responseData?.user?.cv,
        }));
        setFormInputs((current) => {
          return {
            ...current,
            bio: responseData?.data?.summary || "",
            skills: responseData?.data?.skills || [],
          };
        });
        localStorage.setItem("vector_data", JSON.stringify(responseData.data));
        setCurrentStep(2);
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" h="100vh" width="100%">
      <Box
        maxW="500px"
        width="100%"
        p={6}
        bg={cardBg}
        borderRadius="lg"
        boxShadow="xl"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Text
          fontSize="2xl"
          color={useColorModeValue("gray.800", "white")}
          textAlign="center"
          mb={4}
          fontWeight="500"
        >
          Upload Your CV
        </Text>
        <Text
          fontSize="md"
          color={useColorModeValue("gray.600", "gray.300")}
          textAlign="center"
          mb={6}
        >
          Please upload your CV in PDF format. The file size should not exceed
          5MB.
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="center" w="100%">
            {/* Upload Button */}
            <Button
              onClick={handleUploadButtonClick}
              type="button"
              colorScheme="blue"
              bg={buttonBg}
              borderRadius="md"
            >
              Upload
            </Button>

            {/* Hidden File Input */}
            <Input
              type="file"
              ref={fileInputRef}
              display="none"
              onChange={handleFileChange}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              bg={buttonBg}
              width="100%"
              borderRadius="md"
              mt={4}
              isDisabled={!selectedFile}
              isLoading={isLoading}
            >
              Next
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CVForm;
