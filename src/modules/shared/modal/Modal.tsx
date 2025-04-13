import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const modalWrapper = document.querySelector(".modal-wrapper") as HTMLElement;

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

  return createPortal(
    <dialog className="modal" ref={modalRef} onKeyDown={handleKeyDown}>
      <button
        className="modal__close-button"
        onClick={handleCloseModal}
        aria-label="Close modal"
      >
        <img src="svg/close-button.svg" alt="" width={30} />
      </button>
      {children}
    </dialog>, modalWrapper
  );
};

export default Modal;
