import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AttributesModal = ({ show, handleClose, attributes }) => {
  const renderAttributes = () => {
    const formItems = [];
    for (const key in attributes) {
      formItems.push(
        <Form.Group className="mb-3">
          <Form.Label>{key}:</Form.Label>
          <Form.Control type="text" readOnly placeholder={attributes[key]} />
        </Form.Group>
      );
    }
    return formItems;
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>File attributes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{renderAttributes()}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttributesModal;
