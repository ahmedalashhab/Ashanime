import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import {
  animeSearch,
  setHasNextPage,
  setLastPage,
  searchLoadingAction,
  setPageLoadingAction,
  setCurrentPage,
} from "../../redux/search-slice";
import { setSearchQuery, setSearchQueryView } from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface props {
  paginate?: (page: number) => void;
}

const SearchBar = () => {
  const { searchLoading, searchQuery, pageLoading } = useSelector(
    (state: RootState) => state.anime
  );
  const [showInput, setShowInput] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );

  const closeSearchBar = (e: any) => {
    if (showInput && e.target.id === "search-bar") {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  document.addEventListener("mousedown", closeSearchBar);

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
          .get(`https://api.jikan.moe/v4/anime`, {
            params: {
              q: searchQuery,
              sfw: true,
              page: currentPage,
            },
          })
          .then((res) => {
            const { data } = res.data;
            dispatch(searchLoadingAction(false));
            if (data.length === 0 && setCurrentPage) {
              setCurrentPage(1);
            }
            dispatch(animeSearch(data));
            dispatch(setHasNextPage(res.data.pagination.has_next_page));
            dispatch(setLastPage(res.data.pagination.last_visible_page));
          });
      };
      getSearch();
    },
    [currentPage, dispatch, navigate, searchQuery, setCurrentPage, pageLoading]
  );

  // The search loading state is used so that the handleSubmit function does not keep rerunning infinitely.
  useEffect(() => {
    if (searchLoading) {
      handleSubmit();
    }
  }, [currentPage, searchLoading]);

  return (
    <div className="flex">
      <div
        className="cursor-pointer"
        onClick={() => {
          if (showInput) {
            setShowInput(false);
          } else {
            if (!showInput) setShowInput(true);
          }
        }}
        id="search-input"
      >
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#FFF"
          />
        </svg>
      </div>
      <AnimatePresence>
        {showInput && (
          <motion.div
            className="w-full h-1"
            id="search-bar"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
          >
            <form onSubmit={handleSubmit} className="h-1">
              <input
                type="text"
                placeholder="Titles, Movies, Shows"
                id="search-bar"
                onChange={(e) => {
                  dispatch(setSearchQuery(e.target.value));
                  if (e.target.value !== searchQuery) {
                    if (setCurrentPage) {
                      setCurrentPage(1);
                    }
                  }
                }}
                value={searchQuery}
                className="outfit-light text-[24px] appearance-none w-11/12 py-2 ml-4 -my-1 text-white leading-tight outline-none input transition-all ease-in-out duration-200"
              />
              <button type="submit" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
