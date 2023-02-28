import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LibraryItem from "./LibraryItem";
import addLibrary from "../assets/addLibrary.svg";
import "../styles/LibraryList.css";


const LIBRARY_DOMMY_DATA = [
  {
    type: "book",
    title: "novels",
    description: "Classic novels by Jane Austen",
  },
  {
    type: "picture",
    title: "nature",
    description: "Pictures of nature",
  },
  {
    type: "video",
    title: "movies",
    description: "MIDB top 100 movies",
  },
  {
    type: "music",
    title: "Pink Floyd",
    description: "Pink Floyd tracks",
  },
  {
    type: "book",
    title: "novels",
    description: "Classic novels by Jane Austen",
  },
  {
    type: "book",
    title: "novels",
    description: "Classic novels by Jane Austen",
  },
  {
    type: "book",
    title: "novels",
    description: "Classic novels by Jane Austen",
  },
  {
    type: "book",
    title: "novels",
    description: "Classic novels by Jane Austen",
  },
];

const LibraryList = () => {
  return <div className="library-list__container">
    {LIBRARY_DOMMY_DATA.map(item => <LibraryItem type={item.type} title={item.title} description={item.description} />)}
    <div className="add-library__container">
      <img className="add-library__image" src={addLibrary} alt="add"></img>
      <span className="add-library__title">Click to add a library</span>
    </div>
  </div>;
};

export default LibraryList;
