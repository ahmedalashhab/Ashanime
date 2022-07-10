import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { anime } from "../../types/type";
import {
  animeSearch,
  searchLoadingAction,
  setBookmarks,
  setCurrentPage,
  setPageLoadingAction,
  setSearchQuery,
  setSearchQueryView,
} from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { useNotification } from "../../hooks/useNotification";
import axios from "axios";

interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  data: anime;
}

export default function ModalAnimeList({ setToggle, toggle, data }: props) {
  const cancelButtonRef = useRef(null);
  const { notificationHandler } = useNotification();
  const dispatch = useAppDispatch();
  const bookmarks = useSelector((state: RootState) => state.anime.bookmarks);

  const addToBookmarks = () => {
    dispatch(setBookmarks([...bookmarks, data]));
    notificationHandler("Added to Watchlist", "Success", true);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setToggle(false); // close modal
  };

  const removeFromBookmarks = () => {
    const newBookmarks = bookmarks.filter(
      (item) => item.mal_id !== data.mal_id
    );
    notificationHandler("Removed from Watchlist", "Success", true);
    dispatch(setBookmarks(newBookmarks));
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setToggle(false); // close modal
  };

  // get bookmarks from localStorage
  useEffect(() => {
    const getBookmarks = localStorage.getItem("bookmarks");
    if (getBookmarks) {
      dispatch(setBookmarks(JSON.parse(getBookmarks)));
    } else {
      dispatch(setBookmarks([]));
    }
  }, [dispatch]);

  // check if items are in bookmarks
  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  // Search for the anime when clicking the button
  const handleWatchOnClick = useCallback(() => {
    dispatch(setSearchQueryView(data.title));
    dispatch(setPageLoadingAction(false));
    dispatch(searchLoadingAction(true));
    dispatch(setSearchQuery(data.title));
    const getSearch = async () => {
      await axios
        .get(`https://gogoanime.herokuapp.com/search`, {
          params: {
            keyw: data.title,
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
  }, [dispatch, data.title]);

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="h-full w-92 flex lg:items-center sm:items-center justify-center min-h-full lg:p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="h-2/3 lg:h-5/6 mt-14 lg:mt-0 modal-width flex flex-col relative page-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div className="flex flex-col page-bg lg:pb-4">
                  {/*Checks if video URL is available*/}
                  {data.trailer.embed_url ? (
                    <iframe
                      title="video player"
                      src={data.trailer.embed_url}
                      className="modal-height modal-width "
                    />
                  ) : (
                    <div className="flex justify-center items-center h-56 lg:h-96 w-full">
                      <span className="text-white outfit-medium ">
                        {/*if no video URL then display below message*/}
                        No trailer available :(
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center lg:gap-6 gap-2 lg:-mt-4 mt-2 px-8">
                  <Dialog.Title
                    as="h3"
                    className="lg:text-lg mr-4 lg:mr-0 text-[14px] flex justify-center text-center lg:leading-10 outfit-medium text-redor"
                  >
                    {data.title}
                  </Dialog.Title>
                </div>
                <div className="flex justify-center items-center gap-6 px-8">
                  <p className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                    {data.type}
                  </p>
                  <p className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                    Score: {data.score}
                  </p>
                  <p className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                    Episodes Aired: {data.episodes}
                  </p>
                  <p className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                    {data.status}
                  </p>
                </div>

                {/*synopsis*/}
                <div className="my-4 px-8 overflow-y-auto">
                  <p className="text-white outfit-light lg:text-[12px] text-[10px]">
                    {data.synopsis}
                  </p>
                </div>
                <div className=" flex px-4 mt-auto lg:pb-6 pb-4 sm:px-6 flex flex-row-reverse justify-between gap-6">
                  <button
                    type="button"
                    onClick={handleWatchOnClick}
                    className="w-24 lg:w-44 lg:py-2 py-0 lg:text-[16px] text-[10px]  inline-flex justify-center items-center rounded-md border border-transparent shadow-sm lg:px-2 px-4 py-2 redor-button outfit-medium text-white hover:bg-red-600 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Watch Now
                  </button>
                  <button
                    type="button"
                    // save the bookmark to localstorage or remove it if it already exists
                    onClick={
                      bookmarks.find(
                        (bookmark) => bookmark.mal_id === data.mal_id
                      )
                        ? removeFromBookmarks
                        : addToBookmarks
                    }
                    className="w-24 lg:w-44 lg:py-2 py-0  inline-flex justify-center items-center rounded-md border border-transparent shadow-sm lg:px-2 px-4 py-2 redor-button outfit-medium text-white hover:bg-red-600 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {/*check if item is in bookmarks*/}
                    {bookmarks.includes(data) ? (
                      <p className="text-white outfit-medium lg:text-[16px] text-[10px]">
                        Remove from Watchlist
                      </p>
                    ) : (
                      <p className="text-white outfit-medium lg:text-[16px] text-[10px]">
                        Add to Watchlist
                      </p>
                    )}
                  </button>
                  <div className="flex self-end">
                    <div className="flex items-center">
                      <p className="outfit-medium text-white lg:text-[14px] text-[8px] ">
                        Genres:&nbsp;
                        {data.genres.map((genre) => genre.name).join(", ")}
                      </p>
                      <p className="ml-8 outfit-medium text-white lg:text-[14px] text-[8px] ">
                        Studio:&nbsp;
                        {data.studios.map((studio) => studio.name).join(", ")}
                      </p>
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
