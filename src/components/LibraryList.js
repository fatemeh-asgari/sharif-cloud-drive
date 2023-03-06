import React, { useState } from "react";
import LibraryItem from "./LibraryItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateLibraryModal from "./CreateLibraryModal";
import { fetchLibraries, deleteLibrary } from "../states/operations";
import { saveLibraries, selectLibrary } from "../states/librarySlice";
import addLibrary from "../assets/addLibrary.svg";
import "../styles/LibraryList.css";

const LibraryList = () => {
  const [showCreateLibraryModal, setShowCreateLibraryModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const libraries = useSelector((state) => state.library.libraries);
  const token = useSelector((state) => state.user.token);

  const handleCloseCreateLibraryModal = () => setShowCreateLibraryModal(false);

  const handleShowCreateLibraryModal = () => setShowCreateLibraryModal(true);

  const getLibraries = async () => {
    const responseData = await fetchLibraries(token);
    if (responseData) {
      dispatch(saveLibraries(responseData));
    }
  };

  const handleClickOnLibrary = (name) => {
    for (const library of libraries) {
      if (library.name === name) {
        dispatch(selectLibrary(library));
        navigate("/library");
        return;
      }
    }
  };

  const handleDeleteLibrary = async (token, id) => {
    const response = await deleteLibrary(token, id);
    if (response === "done") {
      await getLibraries();
    }
  };

  return (
    <>
      <div className="library-list__container">
        {libraries &&
          libraries.map((item) => (
            <LibraryItem
              type={item.type}
              title={item.name}
              description={item.description}
              onClick={handleClickOnLibrary}
              id={item.id}
              handleDeleteLibrary={() => handleDeleteLibrary(token, item.id)}
            />
          ))}
        <div
          className="add-library__container"
          onClick={handleShowCreateLibraryModal}
        >
          <img className="add-library__image" src={addLibrary} alt="add"></img>
          <span className="add-library__title">Click to add a library</span>
        </div>
      </div>

      <CreateLibraryModal
        show={showCreateLibraryModal}
        handleClose={handleCloseCreateLibraryModal}
        updateLibraries={getLibraries}
      />
    </>
  );
};

export default LibraryList;
