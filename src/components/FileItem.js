import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DownloadLink from "react-download-link";
import AttributesModal from "./AttributesModal";
import "../styles/FileItem.css";
import fileIcon from "../assets/ic_file.png";

const FileItem = ({
  name,
  onClick,
  fileUrl,
  attachmentUrl,
  attachmentName,
  handleDeleteFile,
  type,
  attributes,
}) => {
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  const handleCloseAttributesModal = () => setShowAttributesModal(false);

  const handleShowAttributesModal = () => setShowAttributesModal(true);

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
    <>
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
              {type === "book" ? (
                <Dropdown.Item>
                  <div className="download-link__container">
                    <DownloadLink
                      label="Download"
                      filename={name}
                      exportFile={() =>
                        Promise.resolve(getDataFromURL(fileUrl))
                      }
                    />
                  </div>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item href={fileUrl}>Download</Dropdown.Item>
              )}
              <Dropdown.Item onClick={handleDeleteFile}>Delete</Dropdown.Item>
              {type === "picture" || type === "music" ? (
                <Dropdown.Item>
                  <div className="download-link__container">
                    <DownloadLink
                      label="Download attachment"
                      filename={attachmentName}
                      exportFile={() =>
                        Promise.resolve(getDataFromURL(attachmentUrl))
                      }
                    />
                  </div>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item href={attachmentUrl}>
                  Download attachment
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={handleShowAttributesModal}>
                Show attributes
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <AttributesModal
        show={showAttributesModal}
        handleClose={handleCloseAttributesModal}
        attributes={attributes}
      />
    </>
  );
};

export default FileItem;
