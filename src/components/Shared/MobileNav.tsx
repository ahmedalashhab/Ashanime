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
import { AnimatePresence, motion } from "framer-motion";

interface props {
  paginate?: (page: number) => void;
}

const MobileNav = ({ paginate }: props) => {
  const [scrolled, setScrolled] = useState(false);
  const [navToggle, setNavToggle] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.google.profileObject);

  // Handles logo click
  const handleLogoClick = () => {
    navigate("/home");
    //  Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handles the click highlighting of the Home button
  const handleClickAll = () => {
    dispatch(setType(""));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    setNavToggle(false);
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 750, behavior: "smooth" });
  };

  //Handles the click highlighting of the movie button
  const handleClickMovie = () => {
    dispatch(setType("movie"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    setNavToggle(false);
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 750, behavior: "smooth" });
  };

  // Handles the highlighting of the TV shows button
  const handleClickTV = () => {
    dispatch(setType("tv"));
    dispatch(setAiring(false));
    dispatch(setSearchQuery(""));
    setNavToggle(false);
    if (paginate) {
      paginate(1);
    }
    navigate("/home");
    window.scroll({ top: 750, behavior: "smooth" });
  };

  // Handles the highlighting of the bookmarks button
  const handleClickBookmarks = () => {
    dispatch(setSearchQuery(""));
    navigate(`/bookmarks`);
  };

  useEffect(() => {
    // change nav background to black when scrolling
    window.addEventListener("scroll", () => {
      window.scrollY > 25 ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  return (
    <section>
      <div
        className={`lg:invisible w-screen flex flex-col  justify-center items-center bg-whole-page transition-all sticky-nav ${
          scrolled ? "scrolled-nav" : ""
        }`}
      >
        <div className="flex justify-between items-center py-4 px-4 w-full">
          <div
            onClick={() => {
              setNavToggle(!navToggle);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          {/*<div className="cursor-pointer" onClick={handleLogoClick}>*/}
          {/*  <img alt="logo" className="mx-auto" src={logo} />*/}
          {/*</div>*/}

          <div className="flex gap-12">
            <div className="">
              <SearchBar />
            </div>
            {/*<img*/}
            {/*  className="inline-block h-8 w-8 rounded-full mx-auto"*/}
            {/*  src={profile.picture ? profile.picture : ""}*/}
            {/*  alt="profile pic"*/}
            {/*/>*/}
            <div className="flex justify-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-14 bg-whole-page rounded-br-2xl z-index-100"
      >
        <div className="w-full px-4 ">
          {navToggle ? (
            // make the nav transition animation
            <AnimatePresence>
              <motion.div
                initial={{
                  opacity: 0,
                  x: -100,
                  scale: 0.9,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col gap-8 pr-4 pb-4 "
              >
                <div onClick={handleClickAll} title="All Anime">
                  <Link
                    className="outfit-medium text-concrete text-[24px] "
                    to={"/"}
                  >
                    Top Anime
                  </Link>
                </div>
                <div onClick={handleClickMovie} title="Anime Movies">
                  <span className="outfit-medium text-concrete text-[24px] ">
                    Top Movies
                  </span>
                </div>
                <div onClick={handleClickTV} title="Anime Shows">
                  <span className="outfit-medium text-concrete text-[24px]">
                    Top Shows
                  </span>
                </div>
                <div onClick={handleClickBookmarks} title="Watchlist">
                  <span className="outfit-medium text-concrete text-[24px]">
                    My Watchlist
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            ""
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default MobileNav;
