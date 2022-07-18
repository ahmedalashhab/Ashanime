import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../Shared/Navbar";
import MobileNavTW from "../Shared/MobileNavTW";
import AnimeGridStream from "../Shared/AnimeGridStream";
import GenreDropDown from "./GenreDropDown";
import {useSelector} from "react-redux";
import {RootState,useAppDispatch} from "../../redux/store";
import ModalStreamTW from "../Shared/ModalStreamTW";
import {setModalData} from "../../redux/search-slice";
import Pagination from "../Shared/Pagination";
import {useNotification} from "../../hooks/useNotification";



const Genres = () => {
  const [animeList, setAnimeList] = useState([]);
  const [modalId, setModalId] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const genre = useSelector((state: RootState) => state.anime.genre);
  const dispatch = useAppDispatch()
  const { notificationHandler } = useNotification();


  localStorage.removeItem("type")

  const paginate = (pageNumber: number) => {
    console.log(pageNumber);
    return setCurrentPage(pageNumber);

  };

  const getAnime = async (genre: string) => {
    return await axios
      .get(`https://gogoanime.herokuapp.com/genre/${genre}`, {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        const { data }= response;
        if (data.length > 0) {
          setAnimeList(data);
        } else {
          notificationHandler("No results found for this page", "Error", true);
        }
      });
  };

  //get anime whenever the page changes
  useEffect(() => {
    getAnime(genre);
  }, [currentPage, genre]);



  const handleModal = (active: boolean, data: string) => {
    setModal(active);
    if (data) {
      setModalId(data);
    }
  }

  const elementCount = animeList.length;


  const handleGridRows = () => {
    //  make a new grid row for every 5 elements
    const gridRows =
      [...animeList].length % 5 === 0
        ? [...animeList].length / 5
        : Math.ceil([...animeList].length / 5);
    return `grid-rows-${gridRows}`;
  };


  return (
    <section>
      <Navbar/>
      <MobileNavTW />
      <div className="flex justify-center mt-12">
        <div className="mt-8 lg:w-[1440px] lg:px-8" >
          <div className='flex items-center justify-between mb-4 mx-6'>
          <h2 className="flex items-center outfit-light text-white text-[32px] z-10" id='top-anime'>
            Genre: {genre}
          </h2>
          <GenreDropDown paginate={(value: number) => paginate(value)}/>
          </div>
          <AnimeGridStream
            animeList={animeList}
            handleModal={handleModal}
            handleGridRows={handleGridRows}
          />
          <ModalStreamTW
            setToggle={(boolean: boolean) => {
              if (!boolean) {
                dispatch(setModalData({} as any));
              }
              setModal(boolean);
            }}
            modalId={modalId}
            toggle={modal}
          />
        </div>
      </div>
      <div className="mb-10 mt-5">
        <Pagination
          currentPage={currentPage}
          paginate={(value) => paginate(value)}
          elementCount={elementCount}
        />
      </div>

    </section>
  )
}

export default Genres;