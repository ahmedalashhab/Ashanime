import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "./AnimeTrailerModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useWindowResize from "../../hooks/useWindowResize";

const AnimeTrailersHome = () => {
  const [animeTrailer, setAnimeTrailer] = useState<any[]>([]);
  const [modalData, setModalData] = useState({
    entry: { title: "", mal_id: 0 },
    trailer: { embed_url: "", images: { large_image_url: "" } },
    title: "",
    url: "",
  });
  const [modal, setModal] = useState<boolean>(false);

  const {windowDimension} = useWindowResize();
  const {winWidth} = windowDimension;

  const itemCount = () => {
    if ( winWidth <= 500) {
      return 2
    }
    if  (winWidth > 500 ) {
      return 3
    }
  }

  const spaceBetween = () => {
    if (winWidth <= 500) {
      return 10
    }
    if (winWidth > 500) {
      return 35
    }
  }


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
      <h3 className="outfit-light text-white text-[32px] relative">
        Upcoming Anime
      </h3>
      <div className="overflow-x-scroll whitespace-nowrap scrollbar overflow-y-hidden lg:h-80 lg:px-5 flex items-center">
        <Swiper
          className="lg:ml-0 flex lg:h-72"
          slidesPerView={itemCount()}
          spaceBetween={spaceBetween()}
          modules={[Pagination]}
          loop={true}
          pagination={{clickable: true}}
        >
          {animeTrailer.map((anime) => {
            if (anime.trailer.images.large_image_url) {
              return (
                // Code acts funny if fragments isn't used here
                <SwiperSlide>
                  <div className="seasonal-box rounded-xl" key={anime.mal_id}>
                    <img
                      alt={`thumbnail of ${anime.title}`}
                      src={anime.trailer.images.medium_image_url}
                      className="rounded-xl seasonal-img-box mb-2 mt-1 cursor-pointer hover:scale-105 overflow-visible transition-all duration-300 ease-in-out"
                      onClick={() => handleModal(true, anime)}
                    />
                    <div className="flex justify-center">
                      <p className="text-white lg:text-[16px] text-[12px] text-ellipsis overflow-x-hidden outfit-medium hover:text-redor transition-all ease-in-out cursor-pointer">
                        {anime.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
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
