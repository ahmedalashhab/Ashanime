import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./AnimeTrailerModal";

const AnimeTrailersHome = () => {
  const [animeTrailer, setAnimeTrailer] = useState<any[]>([]);
  const [modalData, setModalData] = useState({
    entry: { title: "", mal_id: 0 },
    trailer: { embed_url: "", images: { large_image_url: "" } },
    title: "",
    url: "",
  });
  const [modal, setModal] = useState<any>(false);

  // const getAnimeTrailer = async () => {
  //   await axios
  //     .get("https://api.jikan.moe/v4/watch/promos/popular")
  //     .then((res) => {
  //       const { data } = res.data;
  //       setAnimeTrailer(data);
  //     })
  //     .catch((err) => {
  //       return console.log(err.status);
  //     });
  // };

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
    <div className="mt-8 overflow-visible ">
      <div className="outfit-light text-white text-[32px] mb-4 ">Discover</div>
      <div className="overflow-x-scroll whitespace-nowrap scrollbar overflow-y-hidden">
        {animeTrailer.map((anime) => {
          return (
            <>
              {!anime.trailer.images.large_image_url ? null : (
                <div className="seasonal-box rounded-xl" key={anime.mal_id}>
                  <img
                    alt={`thumbnail of ${anime.title}`}
                    src={anime.trailer.images.large_image_url}
                    /*TODO fix the overflow on all sides*/
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
