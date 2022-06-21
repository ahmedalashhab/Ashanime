import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { setType, setAiring, setSearchQuery } from "../../redux/search-slice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../Login/LogoutButton";

interface props {
  paginate?: (page: number) => void;
}

const Sidebar = ({ paginate }: props) => {
  const [isClickedAll, setIsClickedAll] = useState(false);
  const [isClickedMovie, setIsClickedMovie] = useState(false);
  const [isClickedTV, setIsClickedTV] = useState(false);
  const [isClickedBookmarks, setIsClickedBookmarks] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = window.location;
  const type = useSelector((state: RootState) => state.anime.type);
  const profile = useSelector((state: RootState) => state.google.profileObject);

  useEffect(() => {
    if (type === "") {
      setIsClickedAll(true);
    }
    if (type === "movie") {
      setIsClickedMovie(true);
    }
    if (type === "tv") {
      setIsClickedTV(true);
    }
    if (path.pathname === "/bookmarks") {
      setIsClickedBookmarks(true);
      setIsClickedAll(false);
      setIsClickedMovie(false);
      setIsClickedTV(false);
    }
  }, [path.pathname, type]);

  // Handles the click highlighting of the Home button
  const handleClickAll = () => {
    setIsClickedAll(true);
    setIsClickedMovie(false);
    setIsClickedTV(false);
    setIsClickedBookmarks(false);
    dispatch(setType(""));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1190, behavior: "smooth" });
  };

  //Handles the click highlighting of the movie button
  const handleClickMovie = () => {
    setIsClickedAll(false);
    setIsClickedMovie(true);
    setIsClickedTV(false);
    setIsClickedBookmarks(false);
    dispatch(setType("movie"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1190, behavior: "smooth" });
  };

  // Handles the highlighting of the TV shows button
  const handleClickTV = () => {
    setIsClickedAll(false);
    setIsClickedMovie(false);
    setIsClickedTV(true);
    setIsClickedBookmarks(false);
    dispatch(setType("tv"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1190, behavior: "smooth" });
  };

  // Handles the highlighting of the bookmarks button
  const handleClickBookmarks = () => {
    setIsClickedAll(false);
    setIsClickedMovie(false);
    setIsClickedTV(false);
    dispatch(setSearchQuery(""));
    navigate(`/bookmarks`);
  };

  const bookmarks = useSelector((state: RootState) => state.anime.bookmarks);
  const bookmarksCount = bookmarks.length;
  const bookmarksCountView = bookmarksCount > 0 ? bookmarksCount : "";

  return (
    <div className="mt-10 mx-4 sideBar rounded-3xl fixed drop-shadow-2xl">
      <img alt="logo" className="mx-auto pt-8" src={logo} />
      <div className="flex flex-col mx-auto mt-16 gap-10">
        <div
          className={`mx-auto ${
            isClickedAll && "category-state"
          } category cursor-pointer`}
          onClick={handleClickAll}
        >
          <Link to={"/"}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
                fill="#5A698F"
              />
            </svg>
          </Link>
        </div>
        <div
          className={`mx-auto ${
            isClickedMovie && "category-state"
          } category cursor-pointer`}
          onClick={handleClickMovie}
        >
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
              fill="#5A698F"
            />
          </svg>
        </div>
        <div
          className={`mx-auto ${
            isClickedTV && "category-state"
          } category cursor-pointer`}
          onClick={handleClickTV}
        >
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
              fill="#5A698F"
            />
          </svg>
        </div>
        <div
          className={`mx-auto ${
            isClickedBookmarks && "category-state"
          } category cursor-pointer relative`}
          onClick={handleClickBookmarks}
        >
          <svg width="17" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
              fill="#5A698F"
            />
          </svg>
          {bookmarksCountView && (
            <div className="inline-block flex justify-center items-center bg-redor h-14 w-14 rounded-full mx-auto absolute top-0 right-0 translate-x-2 -translate-y-2 w-4 h-4">
              <p className="outfit-light text-white text-[12px]">
                {bookmarks.length}
              </p>
            </div>
          )}
        </div>
        <img
          className="inline-block h-14 w-14 rounded-full mx-auto mt-52"
          src={profile.picture ? profile.picture : ""}
          alt="profile pic"
        />
        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
      <div className="flex justify-center mt-8">{/*<LogoutButton />*/}</div>
    </div>
  );
};

export default Sidebar;
