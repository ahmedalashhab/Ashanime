import React, { useEffect, useState } from "react";
import axios from "axios";

import ModalAnimeList from "../Shared/ModalAnimeList";
import { anime } from "../../types/type";
import Pagination from "../Shared/Pagination";
import { TOP_ANIME } from "../API/Jikan";

const TopAnime = () => {
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

  const [topAnimeList, setTopAnimeList] = useState<anime[]>([]);
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  const getTopAnime = async () => {
    const response = await axios
      .get(`https://api.jikan.moe/v4/${TOP_ANIME}?=${currentPage}`, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        return res.data;
      });
    setTopAnimeList(response.data);
    console.log(response);
  };

  useEffect(() => {
    getTopAnime();
  }, [currentPage]);

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };
  return (
    //    make a grid of top anime
    <div className="mt-8" id="top-anime">
      <div className="outfit-light text-white text-[32px] mb-4">Top Anime</div>
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
