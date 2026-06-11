import { useState } from 'react';
export const useModalManager = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [state, setState] = useState(null);
  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setState(data);
  };
  const closeModal = () => {
    setActiveModal(null);
    setState(null);
  };
  return {
    activeModal,
    openModal,
    closeModal,
    state,
    setState,
  };
};
