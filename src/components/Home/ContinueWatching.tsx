import React, {useState, useEffect} from "react";
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
import useWindowResize from "../../hooks/useWindowResize";

const ContinueWatching = () => {
  const [modal, setModal] = useState(false)
  const {windowDimension} = useWindowResize();
  const {winWidth} = windowDimension;
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
const continueWatching = useSelector( (state: RootState) => state.videoState.continueWatching);


//  get continue watching from local storage on load
  useEffect(() => {
    const ContinueWatching = JSON.parse(localStorage.getItem("ContinueWatching") as string) || [];
    dispatch(setContinueWatching(ContinueWatching));
  } , [dispatch]);

  // remove continue watching from local storage by pressing the remove button
  const removeContinueWatching = (animeTitle: string) => {
    const newContinueWatching = [...continueWatching];
    const newContinueWatching2 = newContinueWatching.filter(item => item.animeTitle !== animeTitle);
    dispatch(setContinueWatching(newContinueWatching2));
    localStorage.setItem( "ContinueWatching", JSON.stringify(newContinueWatching2));
  }

  const handleModal = (active: boolean, anime: any) => {
    setModal(active);
    if (anime) {
      setLocalModalData(anime);
    }
  };

  const itemCount = () => {
  if ( winWidth <= 500) {
    return 3
  }
  if  (winWidth > 500 ) {
    return 5
  }
  }

  //revere the order of the continue watching list
  const reverseContinueWatching = () => {
    const newContinueWatching = [...continueWatching];
    return newContinueWatching.reverse();
  }

const spaceBetween = () => {
  if (winWidth <= 500) {
    return 10
  }
  if (winWidth > 500) {
    return 35
  }
}


  return (
    <div className="z-10 lg:ml-0">
      <h3 className="outfit-light text-white text-[32px] relative">
        Continue watching
      </h3>
      <div className="lg:px-5">
        <Swiper
          className="lg:ml-0 continue-height"
          slidesPerView={itemCount()}
          spaceBetween={spaceBetween()}
          modules={[Pagination]}
        >
          {reverseContinueWatching().map((anime) => {
            if (anime.animeImg) {
              return (
                <SwiperSlide className='flex items-center justify-center standard-box-continue'>
                  <div className="standard-box-continue flex justify-center cursor-pointer mt-4 relative" key={anime.animeTitle}>
                    {/*x button on the top right corner of the img */}
                    <div className="absolute z-index-99 lg:top-1 lg:right-1 right-1 top-1">
                      <button className="flex items-center justify-center bg-redor lg:w-8 lg:h-8 w-4 h-4 rounded-full border-0 text-white text-[12px] lg:text-2xl" onClick={() => removeContinueWatching(anime.animeTitle)}>
                        <i className="outfit-medium not-italic"> X </i>
                      </button>
                    </div>
                    <img
                      alt={`thumbnail of ${anime.animeTitle}`}
                      src={anime.animeImg}
                      className="skeleton h-full rounded-xl hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                      onClick={() => handleModal(true, anime)}
                    />
                    <div className="lg:visible invisible  flex justify-center">
                      <p className="outfit-medium lg:mt-2 lg:mx-0 mx-8 text-white hover:text-redor transition-all ease-in-out lg:text-[16px] text-[12px] cursor-pointer text-center">
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