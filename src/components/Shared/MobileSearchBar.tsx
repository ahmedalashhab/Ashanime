import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import {
  animeSearch,
  searchLoadingAction,
  setPageLoadingAction,
  setCurrentPage,
} from "../../redux/search-slice";
import { setSearchQuery, setSearchQueryView } from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MobileSearchBar = () => {
  const { searchLoading, searchQuery, searchQueryView, pageLoading } =
    useSelector((state: RootState) => state.anime);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(
    (state: RootState) => state.anime.currentPage
  );

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

  // The search loading state is used so that the handleSubmit function does not keep rerunning infinitely.
  useEffect(() => {
    if (searchLoading) {
      handleSubmit();
    }
  }, [currentPage, searchLoading]);

  return (
    <div className="flex items-center">
      <div className="w-full h-1" id="search-bar">
        <form onSubmit={handleSubmit} className="h-1 flex items-center">
          <input
            type="text"
            placeholder="Search"
            id="search-bar"
            ref={(input) => input && input.focus()}
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
            className="outfit-light text-[16px] w-11/12 ml-4 -my-1 text-white leading-tight outline-none input transition-all ease-in-out duration-200"
          />
          <button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default MobileSearchBar;
