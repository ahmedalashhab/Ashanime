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
    console.log(currentPage);
  }, [currentPage, type, airing]);

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
    <div className="mt-8" id="top-anime">
      <div className="flex justify-between">
        <h2 className="outfit-light text-white text-[32px] mb-4">
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
      <div className="grid grid-cols-5 grid-rows-5">
        {topAnimeList.map((anime: anime) => {
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
  );
};

export default TopAnime;
