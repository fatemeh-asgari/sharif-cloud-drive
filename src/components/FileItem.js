import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DownloadLink from "react-download-link";
import "../styles/FileItem.css";
import fileIcon from "../assets/ic_file.png";
import { Link } from "react-router-dom";

const FileItem = ({
  name,
  onClick,
  fileUrl,
  attachmentUrl,
  attachmentName,
  handleDeleteFile,
  type,
}) => {
  const getDataFromURL = (url) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            resolve(data);
          });
      });
    }, 2000);

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
            <Dropdown.Item>
              <div className="download-link__container">
                {type === "book" ? (
                  <DownloadLink
                    label="Download"
                    filename={name}
                    exportFile={() => Promise.resolve(getDataFromURL(fileUrl))}
                  />
                ) : (
                  <Link to={fileUrl} target="_blank" download>
                    Download
                  </Link>
                )}
              </div>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteFile}>Delete</Dropdown.Item>
            <Dropdown.Item>
              <div className="download-link__container">
                {type === "picture" || type === "music" ? (
                  <DownloadLink
                    label="Download attachment"
                    filename={attachmentName}
                    exportFile={() =>
                      Promise.resolve(getDataFromURL(attachmentUrl))
                    }
                  />
                ) : (
                  <Link to={attachmentUrl} target="_blank" download>
                    Download attachment
                  </Link>
                )}
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#">Show properties</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FileItem;
