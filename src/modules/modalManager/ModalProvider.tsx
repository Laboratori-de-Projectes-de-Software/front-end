import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
    modal: "",
    leagueId: 0,
    openModal: (modalName: string, leagueId: number) => {},
    closeModal: () => { }
})

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<string>("");
    const [leagueId, setLeagueId] = useState<number>(0);

    const openModal = (modalName: string, leagueId: number) => {
        console.log("open modal", modalName, leagueId)
        setModal(modalName);
        if (modalName === "add-bot") {
            setLeagueId(leagueId);
        }
    }

    const closeModal = () => {
        setModal("");
    }

    return (
        <ModalContext.Provider value={{ modal, leagueId, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}