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
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { addProject } from "../../../services/UserApi";
import { toast } from "react-toastify";

const AddProjectModal = ({ isOpen, onClose, authUser, setAuthUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddProject = async () => {
    setIsSaving(true);
    const newProject = {
      user_id: authUser.id,
      title,
      description,
      status,
      url,
      technologies: technologies.split(",").map((tech) => tech.trim()),
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await addProject(newProject);
      if (response.status === true) {
        setAuthUser((prevUser) => ({
          ...prevUser,
          user_projects: [...prevUser.user_projects, response.data],
        }));
        toast.success("Your project was successfully added.");
        onClose();
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setUrl("");
    setTechnologies("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Select status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Project URL</FormLabel>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Technologies (comma-separated)</FormLabel>
              <Input
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. React, Node.js, etc."
              />
            </FormControl>

            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button
            colorScheme="blue"
            onClick={handleAddProject}
            isLoading={isSaving}
            spinner={<Spinner size="sm" />}
            loadingText="Adding"
          >
            Add
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectModal;
