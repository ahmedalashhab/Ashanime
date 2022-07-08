import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import ModalAnimeList from "../Shared/ModalAnimeList";
import Navbar from "../Shared/Navbar";
import { anime } from "../../types/type";
import { initialDataState } from "../Shared/initialDataState";
import LocalPagination from "./LocalPagination";
import AnimeGrid from "../Shared/AnimeGrid";
import MobileNav from "../Shared/MobileNav";
import MobileNavTW from "../Shared/MobileNavTW";

const Bookmarks = () => {
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

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

  const handleGridRows = () => {
    //  make a new grid row for every 5 bookmarks
    const gridRows =
      bookmarks.length % 5 === 0
        ? bookmarks.length / 5
        : Math.ceil(bookmarks.length / 5);
    return `grid-rows-${gridRows}`;
  };

  //get current elements
  const indexOfLastBookmark = currentPage * 25;
  const indexOfFirstBookmark = indexOfLastBookmark - 25;
  const currentBookmarks = bookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

  return (
    <div className="">
      <Navbar />
      <MobileNavTW />
      <div className="flex justify-center mt-12">
        <div className="mt-8 lg:w-[1440px] lg:px-8" id="top-anime">
          <div className=" ml-8 mb-4">
            <span className="outfit-light text-white text-[32px]">
              {bookmarks.length > 0
                ? "My Watchlist"
                : "Build your watchlist by checking out some anime!"}
            </span>
          </div>

          <AnimeGrid
            animeList={currentBookmarks}
            handleModal={handleModal}
            handleGridRows={handleGridRows}
          />

          {bookmarks.length > 0 && (
            <div className="mb-10 mt-5">
              <LocalPagination
                currentPage={currentPage}
                paginate={(pageNumber: number) => paginate(pageNumber)}
              />
            </div>
          )}
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
