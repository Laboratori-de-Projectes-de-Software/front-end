import React from "react";
import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <dialog className="modal" open={true}>
      <button className="modal__close-button" onClick={onClose}>
        <img src="close-button.svg" alt="" width={30}/>
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
