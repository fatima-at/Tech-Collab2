import {
  VStack,
  Input,
  Tag,
  Wrap,
  WrapItem,
  IconButton,
  Button,
  useColorModeValue,
  Box,
  HStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../context";
import { CRUD_API } from "../../../Endpoints";
import { TOKEN_KEY } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const SkillsForm = ({ formInputs, setFormInputs, setCurrentStep }) => {
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem(TOKEN_KEY);
  const { setAuthUser } = useAuth();

  // Color schemes and gradients
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const tagBg = useColorModeValue("blue.100", "blue.600");
  const tagTextColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("blue.500", "blue.600");

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormInputs({
        ...formInputs,
        skills: [...formInputs.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    setFormInputs({
      ...formInputs,
      skills: formInputs.skills.filter((_, i) => i !== index),
    });
  };

  const handleFinish = async () => {
    setLoading(true);
    const formData = new FormData();
    formInputs?.skills?.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });
    formData.append("bio", formInputs.bio);
    formData.append("linkedin_profile", formInputs.linkedinProfileLink);
    formData.append(
      "general_field",
      formInputs.generalField === "Other"
        ? formInputs.otherGeneralField
        : formInputs.generalField
    );
    try {
      const response = await fetch(`${CRUD_API}/complete-registration`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status) {
        const responseData = await response.json();
        localStorage.removeItem("vector_data");
        setAuthUser(responseData.user);
      } else {
        toast.error("An error occurred.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
      >
        <Text
          fontSize="2xl"
          color={useColorModeValue("gray.800", "white")}
          textAlign="center"
          mb={6}
          fontWeight="500"
        >
          Edit Your Skills
        </Text>

        <VStack spacing={4} align="start" w="100%">
          {/* Display Current Skills */}
          <Text fontSize="lg" fontWeight="500">
            Current Skills
          </Text>
          {formInputs.skills.length > 0 ? (
            <Wrap spacing={2} mb={4}>
              {formInputs.skills.map((skill, index) => (
                <WrapItem key={index}>
                  <Tag
                    size="md"
                    bg={tagBg}
                    color={tagTextColor}
                    borderRadius="full"
                    py={1}
                    px={3}
                    boxShadow="sm"
                  >
                    {skill}
                    <IconButton
                      size="xs"
                      icon={<FaTrash />}
                      onClick={() => handleRemoveSkill(index)}
                      variant="ghost"
                      color="black"
                      ml={2}
                    />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          ) : (
            <Text fontSize="sm" color="gray.500">
              No skills added yet.
            </Text>
          )}

          {/* Add New Skill */}
          <HStack w="100%" spacing={3}>
            <Input
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="outline"
              bg={inputBg}
              focusBorderColor="blue.400"
              size="sm"
              borderRadius="md"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button
              leftIcon={<FaPlus />}
              size="sm"
              colorScheme="blue"
              bg={buttonBg}
              onClick={handleAddSkill}
              px={4}
              borderRadius="md"
              isDisabled={!newSkill.trim()}
            >
              Add
            </Button>
          </HStack>
        </VStack>

        {/* Footer Buttons */}
        <HStack justify="space-between" mt={6}>
          <Button
            size="sm"
            onClick={() => {
              setCurrentStep(2);
            }}
            variant="outline"
            colorScheme="gray"
            borderRadius="md"
          >
            Back
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleFinish}
            borderRadius="md"
            isLoading={loading}
          >
            Finish
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default SkillsForm;
