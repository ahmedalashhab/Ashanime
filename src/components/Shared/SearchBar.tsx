import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  animeSearch,
  setHasNextPage,
  setLastPage,
  searchLoadingAction,
  setPageLoadingAction,
} from "../../redux/search-slice";
import { setSearchQuery, setSearchQueryView } from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface props {
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  paginate?: (page: number) => void;
}

const SearchBar = ({ currentPage, setCurrentPage }: props) => {
  const { searchLoading, searchQuery, pageLoading } = useSelector(
    (state: RootState) => state.anime
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  // TODO: add a loading animation to results.
  useEffect(() => {
    if (searchLoading) {
      handleSubmit();
    }
  }, [currentPage, handleSubmit, searchLoading]);

  return (
    <div className="flex">
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
          fill="#FFF"
        />
      </svg>
      <form onSubmit={handleSubmit} className="w-11/12">
        <input
          type="text"
          placeholder="Search for movies or TV series"
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            if (e.target.value !== searchQuery) {
              if (setCurrentPage) {
                setCurrentPage(1);
              }
            }
          }}
          value={searchQuery}
          className="outfit-light text-[24px] page-bg appearance-none w-11/12 py-2 ml-4 -my-1 text-white leading-tight outline-none input transition-all ease-in-out duration-200"
        />
        <button type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
