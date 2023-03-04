import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/FileItem.css";
import fileIcon from "../assets/ic_file.png";

const FileItem = ({ name, onClick }) => {
  return (
    <div className="file-item__container" onClick={onClick}>
      <img className="file-item__image" src={fileIcon} alt="icon"></img>
      <span className="file-item__title">{name}</span>
      <div className="file-item-options__container">
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-basic"
            size="sm"
          >
            more
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Download</Dropdown.Item>
            <Dropdown.Item href="#">Delete</Dropdown.Item>
            <Dropdown.Item href="#">Download attachment</Dropdown.Item>
            <Dropdown.Item href="#">Show properties</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FileItem;
