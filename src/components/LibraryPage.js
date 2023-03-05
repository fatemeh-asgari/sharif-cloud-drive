import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import FileItem from "./FileItem";
import CreateFileModal from "./CreateFileModal";
import { logoutUser, fetchFiles } from "../states/operations";
import { logout } from "../states/userSlice";
import { cancelSelectLibrary, saveFiles } from "../states/librarySlice";
import avatar from "../assets/person.svg";
import back from "../assets/ic_back_black.svg";
import addFile from "../assets/add_file.svg";
import "../styles/LibraryPage.css";

// const FILES_DOMMY_DATA = [
//   {
//     id: 1,
//     library: 1,
//     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
//     description: "A PDF file",
//     attributes: null,
//     attachment_fields: null,
//     file_name: "Sprint2_Review_oz55B5a.pdf",
//   },
//   {
//     id: 2,
//     library: 1,
//     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
//     description: "A PDF file",
//     attributes: null,
//     attachment_fields: null,
//     file_name: "Sprint2_Review_oz55B5a.pdf",
//   },
//   {
//     id: 3,
//     library: 1,
//     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
//     description: "A PDF file",
//     attributes: null,
//     attachment_fields: null,
//     file_name: "Sprint2_Review_oz55B5a.pdf",
//   },
//   {
//     id: 4,
//     library: 1,
//     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
//     description: "A PDF file",
//     attributes: null,
//     attachment_fields: null,
//     file_name: "Sprint2_Review_oz55B5a.pdf",
//   },
//   {
//     id: 5,
//     library: 1,
//     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
//     description: "A PDF file",
//     attributes: null,
//     attachment_fields: null,
//     file_name: "Sprint2_Review_oz55B5a.pdf",
//   },
// ];

const LibraryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedLibrary = useSelector((state) => state.library.selectedLibrary);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const token = useSelector((state) => state.user.token);
  const libraryFiles = useSelector((state) => state.library.libraryFiles);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);

  const handleCloseCreateFileModal = () => setShowCreateFileModal(false);

  const handleShowCreateFileModal = () => setShowCreateFileModal(true);

  const handleLogout = async () => {
    const responseText = await logoutUser(token);
    if (responseText !== null && responseText === '"done"') {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleBack = () => {
    dispatch(cancelSelectLibrary());
    navigate("/home");
  };

  const getFiles = async () => {
    const responseData = await fetchFiles(token, selectedLibrary.id);
    if (responseData) {
      dispatch(saveFiles(responseData));
    }
  };

  // const downloadEmployeeData = () => {
  // 	fetch('https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp')
  // 		.then(response => {
  // 			response.blob().then(blob => {
  // 				let url = window.URL.createObjectURL(blob);
  // 				let a = document.createElement('a');
  // 				a.href = url;
  // 				a.download = 'employees.json';
  // 				a.click();
  // 			});
  // 			//window.location.href = response.url;
  // 	});
  // }

  useEffect(() => {
    const getFiles = async () => {
      const responseData = await fetchFiles(token, selectedLibrary.id);
      if (responseData) {
        dispatch(saveFiles(responseData));
      }
    };
    getFiles();
  },[dispatch, token]);

  return (
    <>
      <nav className="navbar navbar-expand-lg home-navbar-light fixed-top">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle d-flex align-items-center avatar__container"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  src={avatar}
                  className="rounded-circle"
                  height="30"
                  alt="avatar"
                />
              </div>
              {isProfileOpen && (
                <div className="profile__container">
                  <div className="profile-name__container">{`${firstName} ${lastName}`}</div>
                  <button className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="library-page-back-icon__container">
        <img
          className="library-page-back-icon"
          src={back}
          alt="back"
          onClick={handleBack}
        ></img>
      </div>
      <div className="library-page-files__container">
        {libraryFiles &&
          libraryFiles.map((item) => (
            <FileItem
              key={item.id}
              name={item.file_name}
              description={item.description}
            />
          ))}
        <div
          className="add-file__container"
          onClick={handleShowCreateFileModal}
        >
          <img className="add-file__image" src={addFile} alt="add"></img>
          <span className="add-file__title">Click to add a file</span>
        </div>
      </div>
      <CreateFileModal
        show={showCreateFileModal}
        handleClose={handleCloseCreateFileModal}
        updateFiles={getFiles}
      />

      {/* <Link to="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" target="_blank" download>Download</Link> */}
    </>
  );
};

export default LibraryPage;
