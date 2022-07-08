import { Fragment, useCallback } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  setType,
  setAiring,
  setSearchQuery,
  setCurrentPage,
  setSearchQueryView,
  setPageLoadingAction,
  searchLoadingAction,
  animeSearch,
} from "../../redux/search-slice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../Login/LogoutButton";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface props {
  paginate?: (page: number) => void;
}

export default function MobileNavTW({ paginate }: props) {
  const [scrolled, setScrolled] = useState(false);
  const [navToggle, setNavToggle] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.google.profileObject);
  const { searchLoading, searchQuery, searchQueryView, pageLoading } =
    useSelector((state: RootState) => state.anime);
  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );

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

  // FETCHES FROM API

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      dispatch(setSearchQueryView(searchQuery));
      if (searchQuery === "") {
        return alert("Please input a search term");
      }
      dispatch(setPageLoadingAction(false));
      dispatch(searchLoadingAction(true));
      dispatch(setSearchQuery(searchQuery));
      if (pageLoading === false) navigate(`/search-results`);
      const getSearch = async () => {
        await axios
          .get(`https://gogoanime.herokuapp.com/search`, {
            params: {
              keyw: searchQuery,
              page: currentPage,
            },
          })
          .then(async (res) => {
            const data = res.data;
            dispatch(searchLoadingAction(false));
            if (data.length === 0 && setCurrentPage) {
              setCurrentPage(1);
            }
            dispatch(animeSearch(data));
          });
      };
      getSearch();
    },
    [currentPage, dispatch, navigate, searchQuery, setCurrentPage, pageLoading]
  );

  useEffect(() => {
    // change nav background to black when scrolling
    window.addEventListener("scroll", () => {
      window.scrollY > 25 ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  useEffect(() => {
    if (searchLoading) {
      handleSubmit();
    }
  }, [currentPage, searchLoading]);

  return (
    <Disclosure as="nav" className="lg:invisible bg-whole-page sticky-nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link
                      onClick={handleClickAll}
                      to={"/"}
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Top All Anime
                    </Link>
                    <div
                      onClick={handleClickTV}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Top Anime Shows
                    </div>
                    <div
                      onClick={handleClickMovie}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Top Anime Movies
                    </div>
                    <div
                      onClick={handleClickBookmarks}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Watchlist
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <form onSubmit={handleSubmit} className="">
                      <input
                        id="search"
                        name="search"
                        className="w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        // ref={(input) => input && input.focus()}
                        onChange={(e) => {
                          dispatch(setSearchQuery(e.target.value));
                          // sets the page to 1 when searching something new
                          if (searchQueryView !== searchQuery) {
                            if (setCurrentPage) {
                              dispatch(setCurrentPage(1));
                            }
                          }
                        }}
                        value={searchQuery}
                      />
                      <button type="submit" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="div"
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/home" onClick={handleClickAll}>
                  Top All Anime
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleClickTV}
              >
                Top Anime Shows
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleClickMovie}
              >
                Top Anime Movies
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleClickBookmarks}
              >
                My Watchlist
              </Disclosure.Button>
            </div>
            <div className="pl-3 pb-3 border-t border-gray-700">
              <div className="mt-3 px-2 space-y-1">
                <LogoutButton />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
