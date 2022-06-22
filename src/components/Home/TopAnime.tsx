import React, { useEffect, useState } from "react";
import axios from "axios";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import ModalAnimeList from "../Shared/ModalAnimeList";
import { anime } from "../../types/type";
import Pagination from "../Shared/Pagination";
import { TOP_ANIME } from "../API/Jikan";
import { setHasNextPage, setLastPage } from "../../redux/search-slice";
import ToggleAiring from "./ToggleAiring";
import { initialDataState } from "../Shared/initialDataState";
import { setUser } from "../../redux/google-slice";
import AnimeGrid from "../Shared/AnimeGrid";

interface props {
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const TopAnime = ({ currentPage, paginate }: props) => {
  const [topAnimeList, setTopAnimeList] = useState<anime[]>([]);
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);

  const animeReducer = useSelector((state: RootState) => state.anime);

  const dispatch = useAppDispatch();

  const type = animeReducer.type;
  const airing = animeReducer.airing;

  const getTopAnime = async (type: string) => {
    return await axios
      .get(`https://api.jikan.moe/v4/${TOP_ANIME}`, {
        params: {
          page: currentPage,
          type: type,
          filter: airing ? "airing" : "",
        },
      })
      .then((response) => {
        dispatch(setHasNextPage(response.data.pagination.has_next_page));
        dispatch(setLastPage(response.data.pagination.last_visible_page));
        setTopAnimeList(response.data.data);
      });
  };

  useEffect(() => {
    getTopAnime(type);
    dispatch(setUser(JSON.parse(localStorage.getItem("user") as string)));
  }, [type, airing, currentPage]);

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };

  const handleTitle = () => {
    if (type === "") {
      return "Top Anime";
    } else if (type === "tv") {
      return "Top TV Shows";
    } else if (type === "movie") {
      return "Top Movies";
    }
  };

  return (
    <div>
      <div className="mt-8" id="top-anime">
        <div className="flex justify-between">
          <h2 className="outfit-light text-white text-[32px] mb-4 z-10">
            {handleTitle()}
          </h2>
          <div>
            {type !== "movie" && (
              <ToggleAiring
                paginate={(pageNumber: number) => paginate(pageNumber)}
              />
            )}
          </div>
        </div>
        {/*make a grid of top anime*/}
        <AnimeGrid animeList={topAnimeList} handleModal={handleModal} />
        <div className="mb-10 mt-5">
          <Pagination
            currentPage={currentPage}
            paginate={(value) => paginate(value)}
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
  );
};

export default TopAnime;
