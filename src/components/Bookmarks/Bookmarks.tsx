import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import ModalAnimeList from "../Shared/ModalAnimeList";
import Sidebar from "../Shared/Sidebar";
import SearchBar from "../Shared/SearchBar";
import { anime } from "../../types/type";
import { initialDataState } from "../Shared/initialDataState";
import LocalPagination from "./LocalPagination";

const Bookmarks = () => {
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bookmarks = useSelector((state: RootState) => state.anime.bookmarks);

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  //get current elements
  const indexOfLastBookmark = currentPage * 25;
  const indexOfFirstBookmark = indexOfLastBookmark - 25;
  const currentBookmarks = bookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

  return (
    <div>
      <Sidebar />
      <div className="flex justify-center ">
        <div className="flex flex-col screen-width ml-44 mt-16">
          <SearchBar
            setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 ml-40 screen-width" id="top-anime">
          <div className=" ml-4 mb-4">
            <span className="outfit-light text-white text-[32px]">
              Your watchlist
            </span>
          </div>
          <div className="grid grid-cols-5 grid-rows-5">
            {currentBookmarks.map((anime: anime) => {
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
            <LocalPagination
              currentPage={currentPage}
              paginate={(pageNumber: number) => paginate(pageNumber)}
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

export default Bookmarks;
