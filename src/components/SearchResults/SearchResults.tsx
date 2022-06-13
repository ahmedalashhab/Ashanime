import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import SearchBar from "../Shared/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Pagination from "../Shared/Pagination";
import ModalAnimeList from "../Shared/ModalAnimeList";
import { anime } from "../../types/type";
const SearchResults = () => {
  const initialDataState: anime = {
    year: 0,
    mal_id: 0,
    type: "",
    score: 0,
    title: "",
    trailer: { embed_url: "" },
    images: {
      jpg: { large_image_url: "" },
      webp: { large_image_url: "" },
    },
    synopsis: "",
    episodes: 0,
    status: "",
    demographics: [
      {
        mal_id: 0,
        type: "",
        name: "",
        url: "",
      },
    ],
    genres: [
      {
        mal_id: 0,
        type: "",
        name: "",
        url: "",
      },
    ],
  };

  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const animeReducer = useSelector((state: RootState) => state.anime);
  const searchResults = animeReducer.searchResults;
  const searchQuery = animeReducer.searchQuery;

  const handleSearchTitle = () => {
    if (searchQuery === "") {
      return;
    } else {
      return `Search results for "${searchQuery}"`;
    }
  };

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Sidebar />
      <div className="flex justify-center ">
        <div className="flex flex-col screen-width ml-44 mt-16">
          <SearchBar
            currentPage={currentPage}
            paginate={(pageNumber: number) => paginate(pageNumber)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 ml-40 screen-width" id="top-anime">
          <div className="outfit-light text-white text-[32px] ml-4 mb-4">
            {handleSearchTitle()}
          </div>
          <div className="grid grid-cols-5 grid-rows-5">
            {searchResults.map((anime: anime) => {
              return (
                <div
                  onClick={() => handleModal(true, anime)}
                  className="flex flex-col w-full h-full items-center"
                  key={anime.mal_id}
                >
                  <div className="standard-box cursor-pointer">
                    <img
                      alt={`thumbnail of ${anime.title}`}
                      src={anime.images.jpg.large_image_url}
                      className="anime-box hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="outfit-light text-white text-[13px]">
                      {anime.year}
                    </span>
                    <span className="outfit-light text-white text-[13px]">
                      {anime.type}
                    </span>
                    <span className="flex outfit-light text-white text-[13px] items-center">
                      Score: {anime.score}
                    </span>
                  </div>
                  <div className="w-52 flex justify-center">
                    <span
                      className="outfit-medium mb-4 text-white hover:text-redor transition-all ease-in-out text-[16px] cursor-pointer text-center"
                      onClick={() => handleModal(true, anime)}
                    >
                      {anime.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-10 mt-5">
            <Pagination
              currentPage={currentPage}
              paginate={(pageNumber) => paginate(pageNumber)}
            />
          </div>
          <ModalAnimeList
            setToggle={(boolean: boolean) => {
              return setModal(boolean);
            }}
            data={modalData}
            toggle={modal}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
