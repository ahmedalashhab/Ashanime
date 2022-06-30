import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Pagination from "../Shared/Pagination";
import ModalAnimeList from "../Shared/ModalAnimeList";
import { anime } from "../../types/type";
import { initialDataState } from "../Shared/initialDataState";
import AnimeGrid from "../Shared/AnimeGrid";
import { setCurrentPage } from "../../redux/search-slice";

const SearchResults = () => {
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);

  const dispatch = useAppDispatch();

  const animeReducer = useSelector((state: RootState) => state.anime);
  const searchResults = animeReducer.searchResults;
  const searchQueryView = animeReducer.searchQueryView;
  const currentPage = animeReducer.currentPage;

  const handleSearchTitleStart = () => {
    return `Search results for`;
  };

  const handleSearchTitleEnd = () => {
    return ` ${searchQueryView}`;
  };

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };

  const paginate = (pageNumber: number) => {
    return dispatch(setCurrentPage(pageNumber));
  };

  const handleGridRows = () => {
    //  make a new grid row for every 5 bookmarks
    const gridRows =
      searchResults.length % 5 === 0
        ? searchResults.length / 5
        : Math.ceil(searchResults.length / 5);
    return `grid-rows-${gridRows}`;
  };

  return (
    <div>
      <Sidebar />
      <div className="flex justify-center">
        <div className="mt-8 mx-12 screen-width" id="top-anime">
          <div className=" ml-4 mb-4">
            <span className="outfit-light text-white text-[32px]">
              {handleSearchTitleStart()}
            </span>
            <span className="outfit-light text-redor text-[32px] ">
              {handleSearchTitleEnd()}
            </span>
          </div>
          <AnimeGrid
            animeList={searchResults}
            handleModal={handleModal}
            handleGridRows={handleGridRows}
          />
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
