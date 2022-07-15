import React, {useState, useEffect} from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {setModalData} from "../../redux/search-slice";
import {setContinueWatching} from "../../redux/videoState-slice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {streamModal} from "../../types/type";
import {Pagination} from "swiper";
import LocalModalStream from "./LocalModalStream";

const ContinueWatching = () => {
  const [modal, setModal] = useState(false)
  const [localModalData, setLocalModalData] = useState<streamModal>({
    animeImg: "",
    animeTitle: "",
    episodesList: [],
    genres: [""],
    otherNames: "",
    releasedDate: "",
    status: "",
    synopsis: "",
    totalEpisodes: 0,
    type: ""
  })

  const dispatch = useAppDispatch();
  const streamId = useSelector((state: RootState) => state.anime.streamId);
const continueWatching = useSelector( (state: RootState) => state.videoState.continueWatching);
  const modalData = useSelector((state: RootState) => state.anime.modalData);
  const savedEpisode = useSelector((state: RootState) => state.videoState.savedEpisode);


//  get continue watching from local storage on load
  useEffect(() => {
    const ContinueWatching = JSON.parse(localStorage.getItem("ContinueWatching") as string) || [];
    dispatch(setContinueWatching(ContinueWatching));
  } , [dispatch]);

  const handleModal = (active: boolean, anime: any) => {
    setModal(active);
    if (anime) {
      setLocalModalData(anime);
    }
  };

  const itemCount = () => {
   const length = continueWatching.length;
  if (length <= 5) {
    return length
  }
  else {
    return 5}
  }



  return (
    <div className="z-10 lg:ml-0">
      <h3 className="outfit-light text-white text-[32px] relative">
        Continue watching
      </h3>
      <div className="overflow-x-scroll whitespace-nowrap scrollbar overflow-y-hidden lg:h-80 lg:p-5 flex items-center">
        <Swiper
          className="lg:ml-0 flex"
          slidesPerView={itemCount()}
          spaceBetween={10}
          modules={[Pagination]}
        >
          {continueWatching.map((anime) => {
            if (anime.animeImg) {
              return (
                <SwiperSlide>
                  <div className="standard-box cursor-pointer" key={anime.animeTitle}>
                    <img
                      alt={`thumbnail of ${anime.animeTitle}`}
                      src={anime.animeImg}
                      className="skeleton anime-box hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                      onClick={() => handleModal(true, anime)}
                    />
                    <div className="flex justify-center">
                      <p className="text-white lg:text-[16px] text-[10px] text-ellipsis overflow-x-hidden outfit-medium hover:text-redor transition-all ease-in-out cursor-pointer">
                        {anime.animeTitle}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
      <LocalModalStream
        setToggle={(boolean: boolean) => {
          if (!boolean) {
            dispatch(setModalData({} as streamModal));
          }
          setModal(boolean);
        }}
        toggle={modal}
       data={localModalData}/>
    </div>)





}

export default ContinueWatching;