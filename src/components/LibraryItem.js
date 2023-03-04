import React from "react";
import "../styles/LibraryItem.css";
import bookIcon from "../assets/ic_book.jpg";
import videoIcon from "../assets/ic_video.jpg";
import pictureIcon from "../assets/ic_picture.PNG";
import musicIcon from "../assets/ic_music.jpg";

const LibraryItem = ({ type, title, description, onClick }) => {
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
    <div className="library-item__container" onClick={() => {onClick(title)}}>
      <img className="library-item__image" src={renderLibraryIcon()} alt="icon"></img>
      <span className="library-item__title">{title}</span>
      <p className="library-item__description">{description}</p>
    </div>
  );
};

export default LibraryItem;
