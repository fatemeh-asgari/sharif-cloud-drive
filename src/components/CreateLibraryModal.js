import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createLibrary } from "../states/operations";
import addIcon from "../assets/add.png";
import { notifySuccess } from "../utils/notification";
import "../styles/CreateLibraryModal.css";

const CreateLibraryModal = ({ show, handleClose, updateLibraries }) => {
  const libraryNameRef = useRef(null);
  const libraryDescriptionRef = useRef(null);
  const typeRef = useRef(null);
  const propertyRefsList = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [properyCounter, setProperyCounter] = useState(1);
  const token = useSelector((state) => state.user.token);


  const handleSubmitForm = async () => {
    let properties = [];
    for (let i = 0; i < properyCounter; i++) {
      properties.push(propertyRefsList[i].current.value);
    }
    const response = await createLibrary({
      name: libraryNameRef.current.value,
      description: libraryDescriptionRef.current.value,
      type: typeRef.current.value,
      file_attributes: properties,
    }, token);
    if (response && response.id) {
      notifySuccess("Library created successfully!");
    }
    handleClose();
    setProperyCounter(1);
    await updateLibraries();
  };

  const renderExtraPropertyInputs = () => {
    const properties = [];
    for (let i = 1; i < properyCounter; i++) {
      properties.push(
        <Form.Group className="mb-3" key={i}>
          <Form.Label>Property name</Form.Label>
          <Form.Control
            type="text"
            placeholder="property"
            ref={propertyRefsList[i]}
          />
        </Form.Group>
      );
    }
    return properties;
  };

  const addPropertyCounter = () => {
    setProperyCounter(properyCounter + 1);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Library name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              autoFocus
              ref={libraryNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              ref={libraryDescriptionRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Library type</Form.Label>
            <Form.Select ref={typeRef}>
              <option>Choose content type</option>
              <option value="video">video</option>
              <option value="picture">picture</option>
              <option value="music">music</option>
              <option value="book">book</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="separator" />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Property name</Form.Label>
            <Form.Control
              type="text"
              placeholder="property"
              ref={propertyRefsList[0]}
            />
          </Form.Group>
          {renderExtraPropertyInputs()}
          <div className="add-property-icon__container">
            <img src={addIcon} alt="add" onClick={addPropertyCounter} />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitForm}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateLibraryModal;
