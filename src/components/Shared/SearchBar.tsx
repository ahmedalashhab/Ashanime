import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  animeSearch,
  setHasNextPage,
  setLastPage,
} from "../../redux/search-slice";
import { setSearchQuery } from "../../redux/search-slice";
import { useAppDispatch } from "../../redux/store";

interface props {
  currentPage: { currentPage: number };
  paginate: ((arg: number) => void) | number;
}

const SearchBar = ({ currentPage, paginate }: props) => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleSubmit();
  }, [currentPage.currentPage]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    dispatch(setSearchQuery(search));
    e?.preventDefault();
    const getSearch = async () => {
      await axios
        .get(`https://api.jikan.moe/v4/anime`, {
          params: {
            q: search,
            sfw: true,
            page: currentPage.currentPage,
          },
        })
        .then((res) => {
          const { data } = res.data;
          const response = res.data;
          console.log(response);
          return (
            dispatch(animeSearch(data)),
            dispatch(setHasNextPage(response.pagination.has_next_page)),
            dispatch(setLastPage(response.pagination.last_visible_page))
          );
        });
    };
    getSearch();
    paginate(1);
  };

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
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="outfit-light text-[24px] page-bg appearance-none w-11/12 py-2 ml-4 -my-1 text-white leading-tight outline-none input transition-all ease-in-out duration-200"
        />
        <button type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
