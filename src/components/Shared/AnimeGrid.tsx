import { motion } from "framer-motion";
import React from "react";
import { anime } from "../../types/type";

const AnimeGrid = ({ animeList, handleModal, handleGridRows }: any) => {
  return (
    <div className={`grid grid-cols-5 ${handleGridRows}`}>
      {animeList.map((anime: anime, i: number) => {
        return (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onClick={() => handleModal(true, anime)}
            className="flex flex-col w-full h-full items-center z-10"
            key={anime.mal_id}
          >
            <div className="standard-box cursor-pointer">
              <img
                alt={`thumbnail of ${anime.title}`}
                src={anime.images.jpg.large_image_url}
                className="skeleton anime-box hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                data-tippy-content={<span>{anime.title}</span>}
              />
            </div>
            <div className="flex gap-3 mt-2">
              <span className="outfit-light text-white text-[13px]">
                Rank: {anime.rank}
              </span>
              {anime.year && (
                <span className="outfit-light text-white text-[13px]">
                  {anime.year}
                </span>
              )}
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
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimeGrid;
