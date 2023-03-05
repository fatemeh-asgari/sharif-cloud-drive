import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ShareLibraryModal from "./ShareLibraryModal";
import "../styles/LibraryItem.css";
import bookIcon from "../assets/ic_book.jpg";
import videoIcon from "../assets/ic_video.jpg";
import pictureIcon from "../assets/ic_picture.PNG";
import musicIcon from "../assets/ic_music.jpg";

const LibraryItem = ({ type, title, description, onClick, id, handleDeleteLibrary }) => {
  const [showShareLibraryModal, setShowShareLibraryModal] = useState(false);

  const handleCloseShareLibraryModal = () => setShowShareLibraryModal(false);

  const handleShowShareLibraryModal = () => setShowShareLibraryModal(true);

  const renderLibraryIcon = () => {
    switch (type) {
      case "book":
        return bookIcon;
      case "video":
        return videoIcon;
      case "picture":
        return pictureIcon;
      case "music":
        return musicIcon;
      default:
        return videoIcon;
    }
  };

  return (
    <div
      className="library-item__container"
      onClick={() => {
        onClick(title);
      }}
    >
      <img
        className="library-item__image"
        src={renderLibraryIcon()}
        alt="icon"
      ></img>
      <span className="library-item__title">{title}</span>
      <p className="library-item__description">{description}</p>
      <div
        className="library-item-options__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-basic"
            size="sm"
          >
            more
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShowShareLibraryModal}>
              Share
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteLibrary}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ShareLibraryModal
          show={showShareLibraryModal}
          handleClose={handleCloseShareLibraryModal}
          libraryId={id}
        />
      </div>
    </div>
  );
};

export default LibraryItem;
