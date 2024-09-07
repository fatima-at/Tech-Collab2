import { useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const openModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpened(true);
  };

  return { isModalOpened, closeModal, openModal };
};

export default useModal;
