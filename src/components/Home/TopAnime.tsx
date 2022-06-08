import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "./Modal";
import { anime } from "../../types/type";

const TopAnime = () => {
  const initialDataState = {
    year: 0,
    mal_id: 0,
    type: "",
    score: 0,
    title: "",
    trailer: { embed_url: "" },
    images: { webp: { large_image_url: "" } },
    synopsis: "",
  };
  const [topAnimeList, setTopAnimeList] = useState<anime[]>([]);
  const [modalData, setModalData] = useState<anime>(initialDataState);
  const [modal, setModal] = useState(false);

  const getTopAnime = async () => {
    const response = await axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((res) => {
        return res.data;
      });
    setTopAnimeList(response.data);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  const handleModal = (active: boolean, data: anime) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };
  return (
    //    make a grid of top anime
    <div className="mt-8">
      <div className="outfit-light text-white text-[32px] mb-4">Top Anime</div>
      <div className="grid gap-5 grid-cols-5 grid-rows-5">
        {topAnimeList.map((anime: anime) => {
          return (
            <div
              onClick={() => handleModal(true, anime)}
              className="flex flex-col w-fit"
              key={anime.mal_id}
            >
              <div className="standard-box cursor-pointer">
                <img
                  alt={`thumbnail of ${anime.title}`}
                  src={anime.images.webp.large_image_url}
                  className="anime-box"
                />
              </div>
              <div className="flex gap-3">
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
              <span
                className="outfit-medium text-white text-[16px] w-48 cursor-pointer"
                onClick={() => handleModal(true, anime)}
              >
                {anime.title}
              </span>
            </div>
          );
        })}
      </div>
      <Modal
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
