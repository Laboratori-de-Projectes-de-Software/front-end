import React, { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog className="modal" ref={modalRef} onKeyDown={handleKeyDown}>
      <button
        className="modal__close-button"
        onClick={handleCloseModal}
        aria-label="Close modal"
      >
        <img src="close-button.svg" alt="" width={30} />
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
