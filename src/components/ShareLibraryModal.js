import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { shareLibrary } from "../states/operations";
import { notifySuccess } from "../utils/notification";
import "../styles/CreateLibraryModal.css";

const ShareLibraryModal = ({ show, handleClose, libraryId }) => {
  const usernameRef = useRef(null);
  const token = useSelector((state) => state.user.token);

  const handleSubmitForm = async () => {
    const response = await shareLibrary(token, {
      username: usernameRef.current.value,
      library: libraryId,
    });
    if (response && response.id) {
      notifySuccess("Library shared successfully!");
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Share Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>username to share library with:</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              autoFocus
              ref={usernameRef}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitForm}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareLibraryModal;
