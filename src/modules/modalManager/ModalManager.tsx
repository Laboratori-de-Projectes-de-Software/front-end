import NewLeague from "@modules/forms/new-league/NewLeague"
import Login from "../forms/login/Login"
import Register from "../forms/register/Register"
import Modal from "../shared/modal/Modal"
import { useModal } from "./ModalProvider"
import AddBot from "@modules/forms/add-bot/AddBot"

const ModalManager = () => {

    const { modal, closeModal } = useModal();

    return (
        <>
            <Modal onClose={closeModal} isOpen={modal === 'login'}>
                <Login />
            </Modal>

            <Modal onClose={closeModal} isOpen={modal === 'register'}>
                <Register />
            </Modal>

            <Modal onClose={closeModal} isOpen={modal === 'new-league'}>
                <NewLeague />
            </Modal>

            <Modal onClose={closeModal} isOpen={modal === 'add-bot'}>
                <AddBot />
            </Modal>
        </>
    )
}

export default ModalManager;