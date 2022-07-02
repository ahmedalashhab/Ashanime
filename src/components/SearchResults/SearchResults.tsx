import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Pagination from "../Shared/Pagination";
import { streamSearch } from "../../types/type";
import AnimeGridStream from "../Shared/AnimeGridStream";
import { setCurrentPage } from "../../redux/search-slice";
import ModalStream from "../Shared/ModalStream";

const SearchResults = () => {
  const [modalId, setModalId] = useState<string>("");
  const [modal, setModal] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);

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

  const handleModal = (active: boolean, animeId: string) => {
    setModal(active);
    if (animeId) {
      setModalId(animeId);
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
      <Navbar />
      <div className="flex justify-center mt-12">
        <div className="mt-8 mx-12 screen-width" id="top-anime">
          <div className=" ml-4 mb-4">
            <span className="outfit-light text-white text-[32px]">
              {handleSearchTitleStart()}
            </span>
            <span className="outfit-light text-redor text-[32px] ">
              {handleSearchTitleEnd()}
            </span>
          </div>
          <AnimeGridStream
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
          <ModalStream
            setToggle={(boolean: boolean) => {
              return setModal(boolean);
            }}
            modalId={modalId}
            toggle={modal}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
