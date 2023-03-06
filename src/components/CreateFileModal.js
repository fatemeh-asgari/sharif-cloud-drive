import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createFile, createAttachment } from "../states/operations";
import { notifySuccess } from "../utils/notification";

const CreateFileModal = ({ show, handleClose, updateFiles }) => {
  const propertyRefsList = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [file, setFile] = useState();
  const [attachment, setAttachment] = useState();

  const token = useSelector((state) => state.user.token);
  const selectedLibrary = useSelector((state) => state.library.selectedLibrary);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleAttachmentChange = (e) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
    }
  };

  const getAcceptableFileFormats = () => {
    const libraryType = selectedLibrary.type;
    switch (libraryType) {
      case "video":
        return "video/*";
      case "book":
        return ".pdf";
      case "music":
        return "audio/*";
      case "picture":
        return "image/*";
      default:
        return "";
    }
  };

  const getAcceptableAttachmentFormats = () => {
    const libraryType = selectedLibrary.type;
    switch (libraryType) {
      case "video":
        return ".srt";
      case "book":
        return ".mp3";
      case "music":
        return ".txt";
      case "picture":
        return ".txt";
      default:
        return "";
    }
  };

  const handleSubmitForm = async () => {
    const formData = new FormData();
    let attributes = {};
    for (let i=0; i < selectedLibrary.file_attributes.length; i++) {
      attributes[selectedLibrary.file_attributes[i]] = propertyRefsList[i].current.value;
    }
    const json = JSON.stringify(attributes)
    formData.append("attributes", json);
    formData.append("library", selectedLibrary.id);
    formData.append("file", file);
    const response = await createFile(formData, token);
    if (response && response.id) {
      console.log(response.id);
      const attachmentFormData = new FormData();
      attachmentFormData.append("library_file", response.id);
      attachmentFormData.append("file", attachment);
      const createAttachmentResponse = await createAttachment(attachmentFormData, token);
      if (createAttachmentResponse && createAttachmentResponse.id) {
        notifySuccess("Library created successfully!");
        handleClose();
        await updateFiles()
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select file:</Form.Label>
            <Form.Control
              type="file"
              autoFocus
              onChange={handleFileChange}
              accept={getAcceptableFileFormats()}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select attachment:</Form.Label>
            <Form.Control
              type="file"
              onChange={handleAttachmentChange}
              accept={getAcceptableAttachmentFormats()}
            />
          </Form.Group>
          {selectedLibrary.file_attributes && selectedLibrary.file_attributes.map((attribute, idx) => (
            <Form.Group className="mb-3" key={idx}>
              <Form.Label>{attribute}</Form.Label>
              <Form.Control type="text" ref={propertyRefsList[idx]} />
            </Form.Group>
          ))}
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

export default CreateFileModal;
