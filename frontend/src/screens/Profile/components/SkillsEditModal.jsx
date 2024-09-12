import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Input,
  Tag,
  Wrap,
  WrapItem,
  IconButton,
  useColorModeValue,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { editSkills } from "../../../services/UserApi";

const SkillsEditModal = ({ isOpen, onClose, currentSkills, setSkills }) => {
  const [skills, setSkillsState] = useState(currentSkills);
  const [newSkill, setNewSkill] = useState("");
  const [removedSkills, setRemovedSkills] = useState([]);
  const [addedSkills, setAddedSkills] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Color schemes and gradients
  const modalBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.700");
  const tagBg = useColorModeValue("blue.100", "blue.600");
  const tagTextColor = useColorModeValue("gray.800", "white");

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const newSkillObj = { skill: newSkill };
      setSkillsState([...skills, newSkillObj]);
      setAddedSkills([...addedSkills, newSkill]);
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    const removedSkill = skills[index];
    if (addedSkills.includes(removedSkill.skill)) {
      setAddedSkills(
        addedSkills.filter((skill) => skill !== removedSkill.skill)
      );
    } else if (removedSkill.id) {
      // Otherwise, if it's an existing skill, add it to removedSkills
      setRemovedSkills([...removedSkills, removedSkill.id]);
    }
    setSkillsState(skills.filter((_, i) => i !== index));
  };

  // Save updated skills
  const handleSave = async () => {
    setIsSaving(true); // Start loading
    const body = {
      removedSkills,
      skills: addedSkills,
    };

    try {
      const response = await editSkills(body);
      if (response.status === true) {
        const updatedSkills = skills.filter(
          (skill) => !removedSkills.includes(skill.id)
        );
        setSkills(updatedSkills);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update skills:", error);
    } finally {
      setIsSaving(false); // Stop loading after completion
    }
  };

  const handleClose = () => {
    setSkillsState(currentSkills);
    setRemovedSkills([]);
    setAddedSkills([]);
    setNewSkill("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={modalBg} borderRadius="md" boxShadow="2xl">
        <ModalHeader fontSize="lg" fontWeight="medium">
          Edit Skills
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6}>
          <VStack spacing={3} align="start" w="100%">
            <Text fontWeight="medium" fontSize="md" mb={2}>
              Current Skills
            </Text>
            <Wrap spacing={2}>
              {skills.map((skill, index) => (
                <WrapItem key={index}>
                  <Tag
                    size="md"
                    bg={tagBg}
                    color={tagTextColor}
                    borderRadius="md"
                    py={1}
                    px={3}
                  >
                    {skill.skill}
                    <IconButton
                      size="xs"
                      icon={<FaTrash />}
                      onClick={() => handleRemoveSkill(index)}
                      variant="ghost"
                      colorScheme="gray"
                      ml={2}
                    />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

            {/* Input for new skill */}
            <Input
              placeholder="Add new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="filled"
              size="md"
              bg={inputBg}
              focusBorderColor="gray.500"
              mt={4}
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
              colorScheme="gray"
              onClick={handleAddSkill}
              mt={2}
            >
              Add Skill
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}
            isLoading={isSaving}
            spinner={<Spinner size="sm" />}
            loadingText="Saving"
            isDisabled={
              (removedSkills.length === 0 && addedSkills.length === 0) ||
              isSaving
            }
          >
            Save
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SkillsEditModal;
