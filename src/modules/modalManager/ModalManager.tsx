import NewLeague from "@modules/forms/new-league/NewLeague"
import Login from "../forms/login/Login"
import Register from "../forms/register/Register"
import Modal from "../shared/modal/Modal"
import { useModal } from "./ModalProvider"
import AddBot from "@modules/forms/add-bot/AddBot"

const ModalManager = () => {

    const { modal, closeModal, leagueId } = useModal();

    return (
        <>
            {modal === 'login' &&
                <Modal onClose={closeModal}>
                    <Login />
                </Modal>
            }
            {modal === 'register' && <Modal onClose={closeModal}>
                <Register />
            </Modal>}

            {modal === 'new-league' &&
                <Modal onClose={closeModal}>
                    <NewLeague />
                </Modal>
            }
            {modal === 'add-bot' &&
                <Modal onClose={closeModal}>
                    <AddBot leagueId={leagueId}/>
                </Modal>
            }
        </>
    )
}

export default ModalManager;