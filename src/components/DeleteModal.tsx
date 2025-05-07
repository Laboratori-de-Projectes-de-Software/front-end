import React from 'react';
import {Button, Modal } from 'react-bootstrap';

function DeleteModal({show, handleClose, handleDeleteLeague}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="custom-secondary">
                <Modal.Title>Borrar liga</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-secondary">¿Estás seguro de que quieres borrar esta liga?</Modal.Body>
            <Modal.Footer className="custom-secondary">
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary custom-action" onClick={handleDeleteLeague}>
                    Si, borrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;