import Login from "../forms/login/Login"
import Register from "../forms/register/Register"
import Modal from "../shared/modal/Modal"
import { useModal } from "./ModalProvider"

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
        </>
    )
}

export default ModalManager;