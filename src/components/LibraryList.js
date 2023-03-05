import React, { useState } from "react";
import LibraryItem from "./LibraryItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateLibraryModal from "./CreateLibraryModal";
import { fetchLibraries } from "../states/operations";
import { saveLibraries, selectLibrary } from "../states/librarySlice";
import addLibrary from "../assets/addLibrary.svg";
import "../styles/LibraryList.css";

// const LIBRARY_DOMMY_DATA = [
//   {
//     id: 1,
//     type: "book",
//     name: "novels",
//     description: "Classic novels by Jane Austen",
//   },
//   {
//     type: "picture",
//     title: "nature",
//     description: "Pictures of nature",
//   },
//   {
//     type: "video",
//     title: "movies",
//     description: "MIDB top 100 movies",
//   },
//   {
//     type: "music",
//     title: "Pink Floyd",
//     description: "Pink Floyd tracks",
//   },
//   {
//     type: "book",
//     title: "novels",
//     description: "Classic novels by Jane Austen",
//   },
//   {
//     type: "book",
//     title: "novels",
//     description: "Classic novels by Jane Austen",
//   },
//   {
//     type: "book",
//     title: "novels",
//     description: "Classic novels by Jane Austen",
//   },
//   {
//     type: "book",
//     title: "novels",
//     description: "Classic novels by Jane Austen",
//   },
// ];

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
