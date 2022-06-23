import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { anime } from "../../types/type";
import { setBookmarks } from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { useNotification } from "../../hooks/useNotification";

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
                  {data.trailer.embed_url ? (
                    <iframe
                      title="video player"
                      style={{ height: 400 }}
                      src={data.trailer.embed_url}
                      className="h-full w-full"
                    />
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
                    {data.title}
                  </Dialog.Title>
                  <div className="flex text-right items-center gap-6 content-end">
                    <span className="text-white outfit-light text-[12px] text-right">
                      {data.type}
                    </span>
                    <span className="text-white outfit-light text-[12px] text-right">
                      Score: {data.score}
                    </span>
                    <span className="text-white outfit-light text-[12px] text-right">
                      Episodes Aired: {data.episodes}
                    </span>
                    <span className="text-white outfit-light text-[12px] text-right">
                      {data.status}
                    </span>
                  </div>
                </div>

                {/*synopsis*/}
                <div className="my-4 px-8 overflow-y-auto">
                  <p className="text-white outfit-light text-[12px]">
                    {data.synopsis}
                  </p>
                </div>
                <div className=" flex px-4 mt-auto pb-6 sm:px-6 flex flex-row-reverse justify-between">
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
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 redor-button text-base font-medium text-white hover:bg-red-600 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {/*check if item is in bookmarks*/}
                    {bookmarks.includes(data) ? (
                      <span className="text-white outfit-medium">
                        Remove from Watchlist
                      </span>
                    ) : (
                      <span className="text-white outfit-medium">
                        Add to Watchlist
                      </span>
                    )}
                  </button>
                  <div className="flex self-end">
                    <div className="flex">
                      <span className="outfit-medium text-white text-[14px] ">
                        Genres:&nbsp;
                        {data.genres.map((genre) => genre.name).join(", ")}
                      </span>
                      <span className="ml-8 outfit-medium text-white text-[14px] ">
                        Studio:&nbsp;
                        {data.studios.map((studio) => studio.name).join(", ")}
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
