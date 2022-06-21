import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import SearchBar from "../Shared/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Pagination from "../Shared/Pagination";
import ModalAnimeList from "../Shared/ModalAnimeList";
import { anime } from "../../types/type";
import { initialDataState } from "../Shared/initialDataState";
import AnimeGrid from "../Shared/AnimeGrid";

const SearchResults = () => {
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const animeReducer = useSelector((state: RootState) => state.anime);
  const searchResults = animeReducer.searchResults;
  const searchQueryView = animeReducer.searchQueryView;

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
    return setCurrentPage(pageNumber);
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
