import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./AnimeTrailerModal";
import { motion } from "framer-motion";

const AnimeTrailersHome = () => {
  const [animeTrailer, setAnimeTrailer] = useState<any[]>([]);
  const [modalData, setModalData] = useState({
    entry: { title: "", mal_id: 0 },
    trailer: { embed_url: "", images: { large_image_url: "" } },
    title: "",
    url: "",
  });
  const [modal, setModal] = useState<boolean>(false);

  const getAnimeTrailer = async () => {
    await axios
      .get("https://api.jikan.moe/v4/top/anime", {
        params: {
          filter: "upcoming",
        },
      })
      .then((res) => {
        const { data } = res.data;
        setAnimeTrailer(data);
      })
      .catch((err) => {
        return console.log(err.status);
      });
  };

  useEffect(() => {
    getAnimeTrailer();
  }, []);

  const handleModal = (active: boolean, data: any) => {
    setModal(active);
    if (data) {
      setModalData(data);
    }
  };

  return (
    <div className="z-10 lg:ml-0">
      <h3 className="outfit-light text-white text-[32px] mb-4 relative">
        Upcoming Anime
      </h3>
      <div className="overflow-x-scroll whitespace-nowrap scrollbar overflow-y-hidden lg:h-80 flex items-center">
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="lg:ml-0"
        >
          {animeTrailer.map((anime) => {
            return (
              // Code acts funny if fragments isn't used here
              <>
                {!anime.trailer.images.large_image_url ? null : (
                  <div className="seasonal-box rounded-xl" key={anime.mal_id}>
                    <img
                      alt={`thumbnail of ${anime.title}`}
                      src={anime.trailer.images.large_image_url}
                      className="rounded-xl seasonal-img-box mb-2 cursor-pointer hover:scale-105 overflow-visible transition-all duration-300 ease-in-out"
                      onClick={() => handleModal(true, anime)}
                    />
                    <div className="flex justify-center">
                      <span className="text-white outfit-medium hover:text-redor transition-all ease-in-out cursor-pointer">
                        {anime.title}
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </motion.div>
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

export default AnimeTrailersHome;
