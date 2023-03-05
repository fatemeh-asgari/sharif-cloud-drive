import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, fetchLibraries } from "../states/operations";
import { logout } from "../states/userSlice";
import { saveLibraries } from "../states/librarySlice";
import avatar from "../assets/person.svg";
import "../styles/Home.css";
import LibraryList from "./LibraryList";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const token = useSelector((state) => state.user.token);

  const handleLogout = async () => {
    const responseText = await logoutUser(token);
    if (responseText !== null && responseText === "\"done\"") {
      dispatch(logout());
      navigate("/");
    }
  };

  useEffect( () => {
    const getLibraries = async () => {
      const responseData = await fetchLibraries(token);
      if (responseData) {
        dispatch(saveLibraries(responseData));
      }
    };
    if (token){
      getLibraries();
    } 
  }, [dispatch, token])

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
              <img src={avatar} className="rounded-circle" height="30" alt="avatar"
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
    <div className="libraries__container">
      <LibraryList />
    </div>
    </>
    
  );
};

export default Home;
