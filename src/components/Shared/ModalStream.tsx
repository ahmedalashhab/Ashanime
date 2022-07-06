import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PulseLoader from "react-spinners/PulseLoader";

import {
  setModalData,
  setStream,
  setStreamId,
  setEpisodeSelected,
} from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import axios from "axios";
import VideoPlayer from "../videoplayer/VideoPlayer";

interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  modalId: string;
}

export default function ModalStream({ setToggle, toggle, modalId }: props) {
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useAppDispatch();
  const modalData = useSelector((state: RootState) => state.anime.modalData);
  const episodeSelected = useSelector(
    (state: RootState) => state.anime.episodeSelected
  );
  const episodesList = modalData.episodesList;

  const getAnimeDetails = async (modalId: string) => {
    setLoading(true);
    await axios
      .get(`https://gogoanime.herokuapp.com/anime-details/${modalId}`)
      .then(async (response) => {
        const data = response.data;
        dispatch(setModalData(data));
        setLoading(false);
      });
  };

  useEffect(() => {
    const getData = async () => {
      await getAnimeDetails(modalId);
    };
    getData();
  }, [modalId, toggle]);

  // Reverse list of episodes to show from first to last.

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative modal-stream"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setToggle(false);
          dispatch(
            setModalData({
              animeTitle: "",
              type: "",
              releasedDate: "",
              status: "",
              genres: [""],
              otherNames: "",
              synopsis: "",
              animeImg: "",
              totalEpisodes: 0,
              episodesList: [],
            })
          );
          dispatch(setStream({}));
          dispatch(setStreamId(""));
        }}
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
                  <VideoPlayer />
                </div>
                {loading ? (
                  <div
                    className="flex justify-center items-center"
                    style={{ height: 400 }}
                  >
                    <PulseLoader color={"white"} loading={loading} size={10} />
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3 justify-between px-8">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 outfit-medium text-redor"
                    >
                      {modalData.animeTitle}
                    </Dialog.Title>
                    <div>
                      {/*  drop down list for episodes*/}
                      <select
                        className="w-full h-full rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-gray-500 focus:shadow-outline-blue focus:border-blue-300"
                        onChange={(e) => {
                          dispatch(setStreamId(""));
                          dispatch(setStream({}));
                          const episodeId = e.target.value;
                          dispatch(setStreamId(episodeId));
                          // this is a fake toggle to trigger the video to play
                          dispatch(setEpisodeSelected(!episodeSelected));
                        }}
                      >
                        {/*Load drop down list from oldest to newest episode*/}
                        <option>Select an episode</option>
                        {episodesList &&
                          [...episodesList].reverse().map((episode) => {
                            return (
                              <option
                                value={episode.episodeId}
                                key={episode.episodeId}
                              >
                                {episode.episodeId}
                              </option>
                            );
                          })}
                      </select>
                    </div>
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
                )}
                {/*synopsis*/}
                {loading ? (
                  ""
                ) : (
                  <div className="my-4 px-8 overflow-y-auto">
                    <p className="text-white outfit-light text-[12px]">
                      {modalData.synopsis}
                    </p>
                  </div>
                )}
                <div className=" flex px-4 mt-auto pb-6 sm:px-6 flex flex-row justify-between">
                  <div className="flex self-start">
                    <div className="flex">
                      <span className="outfit-medium text-white text-[14px] ">
                        {loading ? "" : "Genres: "}
                        {loading
                          ? ""
                          : modalData?.genres?.map((genre) => genre).join(", ")}
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
