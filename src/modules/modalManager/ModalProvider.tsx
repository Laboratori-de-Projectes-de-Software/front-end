import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
    modal: "",
    openModal: (modalName: string) => {},
    closeModal: () => { }
})

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<string>("");

    const openModal = (modalName: string) => {
        setModal(modalName);
    }

    const closeModal = () => {
        setModal("");
    }

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}