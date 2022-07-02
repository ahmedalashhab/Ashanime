import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { anime, streamModal, streamSearch } from "../../types/type";
import {
  setBookmarks,
  setHasNextPage,
  setLastPage,
} from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { useNotification } from "../../hooks/useNotification";
import axios from "axios";
import { streamDataState } from "./initialDataState";
import VideoPlayer from "../videoplayer/VideoPlayer";

interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  modalId: string;
}

export default function ModalStream({ setToggle, toggle, modalId }: props) {
  const [modalData, setModalData] = useState<streamModal>(streamDataState);
  const [stream, setStream] = useState<string>("");

  const cancelButtonRef = useRef(null);
  const { notificationHandler } = useNotification();
  const dispatch = useAppDispatch();
  const bookmarks = useSelector((state: RootState) => state.anime.bookmarks);

  const getAnimeDetails = async (modalId: string) => {
    return await axios
      .get(`https://gogoanime.herokuapp.com/anime-details/${modalId}`)
      .then((response) => {
        const data = response.data;
        setModalData(data);
        return data;
      });
  };

  const getAnimeStream = async (episodeId: string) => {
    return await axios
      .get(`https://gogoanime.herokuapp.com/streamsb/watch/${episodeId}`)
      .then((response) => {
        const data = response.data.headers.Referer;
        setStream(data);
        return data;
      });
  };

  const episodesList = modalData.episodesList;

  useEffect(() => {
    const getData = async () => {
      await getAnimeDetails(modalId);
      await getAnimeStream(episodesList[episodesList.length - 1].episodeId);
      console.log(stream);
    };
    getData();
  }, [modalId]);

  // useEffect(() => {
  //   getAnimeStream(modalData.episodesList[-1].episodeId);
  //   console.log(modalData.episodesList[-1].episodeId);
  // }, [modalData.episodesList, stream]);

  //Bookmark anime

  // const addToBookmarks = () => {
  //   dispatch(setBookmarks([...bookmarks, modalId]));
  //   notificationHandler("Added to Watchlist", "Success", true);
  //   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //   setToggle(false); // close modal
  // };
  //
  // const removeFromBookmarks = () => {
  //   const newBookmarks = bookmarks.filter(
  //     (item) => item.mal_id !== modalId.mal_id
  //   );
  //   notificationHandler("Removed from Watchlist", "Success", true);
  //   dispatch(setBookmarks(newBookmarks));
  //   localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  //   setToggle(false); // close modal
  // };

  // // get bookmarks from localStorage
  // useEffect(() => {
  //   const getBookmarks = localStorage.getItem("bookmarks");
  //   if (getBookmarks) {
  //     dispatch(setBookmarks(JSON.parse(getBookmarks)));
  //   } else {
  //     dispatch(setBookmarks([]));
  //   }
  // }, [dispatch]);
  //
  // // check if items are in bookmarks
  // useEffect(() => {
  //   if (bookmarks.length > 0) {
  //     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //   }
  // }, [bookmarks]);

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative modal-stream"
        initialFocus={cancelButtonRef}
        onClose={() => setToggle(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed modal-stream inset-0 overflow-y-auto">
          <div className="h-full w-92 flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="h-5/6 modal-width flex flex-col relative page-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div className="w-92 flex flex-col page-bg pb-4">
                  {/*Checks if video URL is available*/}
                  {stream.length > 1 ? (
                    <VideoPlayer />
                  ) : (
                    <div
                      className="flex justify-center items-center"
                      style={{ height: 400 }}
                    >
                      <span className="text-white outfit-medium ">
                        {/*if no video URL then display below message*/}
                        No trailer available :(
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-6 mt-3 justify-between px-8">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 outfit-medium text-redor"
                  >
                    {modalData.animeTitle}
                  </Dialog.Title>
                  <div className="flex text-right items-center gap-6 content-end">
                    <span className="text-white outfit-light text-[12px] text-right">
                      {modalData.type}
                    </span>
                    <span className="text-white outfit-light text-[12px] text-right">
                      Episodes Aired: {modalData.totalEpisodes}
                    </span>
                    <span className="text-white outfit-light text-[12px] text-right">
                      {modalData.status}
                    </span>
                  </div>
                </div>

                {/*synopsis*/}
                <div className="my-4 px-8 overflow-y-auto">
                  <p className="text-white outfit-light text-[12px]">
                    {modalData.synopsis}
                  </p>
                </div>
                <div className=" flex px-4 mt-auto pb-6 sm:px-6 flex flex-row-reverse justify-between">
                  {/*<button*/}
                  {/*  type="button"*/}
                  {/*  // save the bookmark to localstorage or remove it if it already exists*/}
                  {/*  onClick={*/}
                  {/*    bookmarks.find(*/}
                  {/*      (bookmark) => bookmark.mal_id === modalId.mal_id*/}
                  {/*    )*/}
                  {/*      ? removeFromBookmarks*/}
                  {/*      : addToBookmarks*/}
                  {/*  }*/}
                  {/*  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 redor-button text-base font-medium text-white hover:bg-red-600 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"*/}
                  {/*>*/}
                  {/*  /!*check if item is in bookmarks*!/*/}
                  {/*  {bookmarks.includes(modalId) ? (*/}
                  {/*    <span className="text-white outfit-medium">*/}
                  {/*      Remove from Watchlist*/}
                  {/*    </span>*/}
                  {/*  ) : (*/}
                  {/*    <span className="text-white outfit-medium">*/}
                  {/*      Add to Watchlist*/}
                  {/*    </span>*/}
                  {/*  )}*/}
                  {/*</button>*/}
                  <div className="flex self-end">
                    <div className="flex">
                      <span className="outfit-medium text-white text-[14px] ">
                        Genres:&nbsp;
                        {modalData.genres.map((genre) => genre).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Notification />
        </div>
      </Dialog>
    </Transition.Root>
  );
}
