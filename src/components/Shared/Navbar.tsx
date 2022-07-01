import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { setType, setAiring, setSearchQuery } from "../../redux/search-slice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../Login/LogoutButton";
import SearchBar from "../Shared/SearchBar";

interface props {
  paginate?: (page: number) => void;
}

const Navbar = ({ paginate }: props) => {
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.google.profileObject);

  // Handles the click highlighting of the Home button
  const handleClickAll = () => {
    dispatch(setType(""));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1020, behavior: "smooth" });
  };

  //Handles the click highlighting of the movie button
  const handleClickMovie = () => {
    dispatch(setType("movie"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1020, behavior: "smooth" });
  };

  // Handles the highlighting of the TV shows button
  const handleClickTV = () => {
    dispatch(setType("tv"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 1020, behavior: "smooth" });
  };

  // Handles the highlighting of the bookmarks button
  const handleClickBookmarks = () => {
    dispatch(setSearchQuery(""));
    navigate(`/bookmarks`);
  };

  useEffect(() => {
    // change nav background to black when scrolling
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <div
      className={`flex justify-center items-center bg-none dark-gradient-nav sticky-nav ${
        scrolled ? "scrolled-nav" : ""
      }`}
    >
      <div className="flex justify-between pt-4 px-12 screen-width">
        <div className="flex gap-8">
          <div>
            <img alt="logo" className="mx-auto" src={logo} />
          </div>
          <div onClick={handleClickAll} title="All Anime">
            <Link
              className="outfit-medium text-concrete hover:text-white transition-colors duration-200"
              to={"/"}
            >
              All Anime
            </Link>
          </div>
          <div onClick={handleClickMovie} title="Anime Movies">
            <span className="outfit-medium text-concrete hover:text-white transition-colors duration-200 cursor-pointer">
              Anime Movies
            </span>
          </div>
          <div onClick={handleClickTV} title="Anime Shows">
            <span className="outfit-medium text-concrete hover:text-white transition-colors duration-200 cursor-pointer">
              Anime Shows
            </span>
          </div>
          <div onClick={handleClickBookmarks} title="Watchlist">
            <span className="outfit-medium text-concrete hover:text-white transition-colors duration-200 cursor-pointer">
              My Watchlist
            </span>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="">
            <SearchBar />
          </div>
          <img
            className="inline-block h-7 w-7 rounded-full mx-auto"
            src={profile.picture ? profile.picture : ""}
            alt="profile pic"
          />
          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">{/*<LogoutButton />*/}</div>
    </div>
  );
};

export default Navbar;
