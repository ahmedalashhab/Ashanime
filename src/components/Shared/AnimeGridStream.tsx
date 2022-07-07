import { motion } from "framer-motion";
import React from "react";
import { streamSearch } from "../../types/type";

const AnimeGrid = ({ animeList, handleModal, handleGridRows }: any) => {
  return (
    <div className={`grid lg:grid-cols-5 grid-cols-2 ${handleGridRows}`}>
      {animeList.map((anime: streamSearch, i: number) => {
        return (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onClick={() => handleModal(true, anime.animeId)}
            className="flex flex-col w-full h-full items-center z-10"
            key={anime.animeId}
          >
            <div className="standard-box cursor-pointer">
              <img
                alt={`thumbnail of ${anime.animeTitle}`}
                src={anime.animeImg}
                className="skeleton anime-box hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                data-tippy-content={<span>{anime.animeTitle}</span>}
              />
            </div>
            <div className="flex gap-3 mt-2">
              {anime.status && (
                <span className="outfit-light text-white lg:text-[13px] text-[8px]">
                  {anime.status}
                </span>
              )}
            </div>
            <div className="w-52 flex justify-center">
              <span
                className="outfit-medium lg:mb-4 mb-8 lg:mx-0 mx-8 text-white hover:text-redor transition-all ease-in-out lg:text-[16px] text-[12px] cursor-pointer text-center"
                onClick={() => handleModal(true, anime)}
              >
                {anime.animeTitle}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimeGrid;
