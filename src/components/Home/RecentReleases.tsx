import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import "swiper/css/navigation";
import {
  animeSearch,
  searchLoadingAction, setCurrentPage,
  setPageLoadingAction,
  setSearchQuery,
  setSearchQueryView
} from "../../redux/search-slice";
import {useAppDispatch} from "../../redux/store";
import useWindowResize from "../../hooks/useWindowResize";


export const RecentReleases = () => {
  const [animeBelt, setAnimeBelt] = useState<any>([])

  const dispatch = useAppDispatch();
  const {windowDimension} = useWindowResize();
  const {winWidth} = windowDimension;

  const getRecent = async () => {
    await axios
      .get("https://gogoanime.herokuapp.com/recent-release")
      .then((res) => {
        const data = res.data;
        setAnimeBelt(data)
      })
      .catch((err) => {
        return console.log(err.status)
      })
  }

  useEffect(() => {
     getRecent()
  }, [])

  const handleClick = (title: string) => {
    dispatch(setSearchQueryView(title));
    dispatch(setPageLoadingAction(false));
    dispatch(searchLoadingAction(true));
    dispatch(setSearchQuery(title));
    const getSearch = async () => {
      await axios
        .get(`https://gogoanime.herokuapp.com/search`, {
          params: {
            keyw: title,
          },
        })
        .then(async (res) => {
          const data = res.data;
          dispatch(searchLoadingAction(false));
          if (data.length === 0 && setCurrentPage) {
            setCurrentPage(1);
          }
          dispatch(animeSearch(data));
        });
    };
    getSearch();
  }

  const itemCount = () => {
    if ( winWidth <= 500) {
      return 3
    }
    if  (winWidth > 500 ) {
      return 5
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

  return (
    <div className="z-10 lg:ml-0 mt-2 lg:mt-0">
      <h3 className="outfit-light text-white text-[32px] relative">
        Recent Releases
      </h3>
      <div className="lg:px-5">
        <Swiper
          className="lg:ml-0 recent-height"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={itemCount()}
          spaceBetween={spaceBetween()}
          navigation={true}
          pagination={{clickable: true}}
          scrollbar={{ draggable: true }}
          loop={true}
        >
          {animeBelt.map((anime: {
            animeTitle: string;
            animeImg: string;
            episodeNum: number;
            subOrDub: string;
            episodeId: string;
            // eslint-disable-next-line array-callback-return
          }) => {
            if (anime.animeImg) {
              return (
                <SwiperSlide className='flex items-center justify-center standard-box-continue'>
                  <div className="standard-box-continue flex justify-center cursor-pointer mt-4 relative" key={anime.animeTitle}>
                    <img
                      alt={`thumbnail of ${anime.animeTitle}`}
                      src={anime.animeImg}
                      className="skeleton h-full rounded-xl hover:scale-105 hover:shadow-2xl overflow-visible transition-all duration-300 ease-in-out"
                      onClick={() => handleClick(anime.animeTitle)}
                    />
                    <div className="  flex flex-col justify-center overflow-ellipsis">
                      <p className='outfit-medium lg:mt-2 lg:mx-0 text-white hover:text-redor transition-all ease-in-out lg:text-[12px] text-[8px] cursor-pointer text-center'>Episode: {anime.episodeNum}</p>
                      <h3 className=" overflow-ellipsis outfit-medium lg:mt-2 lg:mx-0 text-white hover:text-redor transition-all ease-in-out lg:text-[16px] text-[12px] cursor-pointer text-center">
                        {anime.animeTitle}
                      </h3>

                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>)
}