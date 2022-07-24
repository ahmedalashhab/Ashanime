import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PulseLoader from "react-spinners/PulseLoader";

import {
  setModalData,
  setStreamId,
  setEpisodeSelected,

} from "../../redux/search-slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import VideoPlayer from "../videoplayer/VideoPlayer";
import {streamModal} from "../../types/type";
import TESTEpisodeDropdown from "../Shared/TESTEpisodeDropdown";

interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  data: streamModal
}

export default function LocalModalStream({ setToggle, toggle, data }: props) {
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useAppDispatch();
  const modalData = useSelector((state: RootState) => state.anime.modalData);


  useEffect(() => {
    dispatch(setModalData(data));
  }, [toggle]);

  const handleOnClose = () => {
    setToggle(false);
    dispatch(setStreamId(""));

  }



  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative modal-stream"
        initialFocus={cancelButtonRef}
        onClose={handleOnClose}
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
          <div className="h-full w-92  lg:mt-0 flex lg:items-center sm:items-center justify-center min-h-full lg:p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="h-2/3 lg:h-5/6 lg:mt-0 modal-width flex flex-col relative page-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div className="w-92 flex flex-col page-bg lg:pb-4">
                  <VideoPlayer />
                </div>
                {loading ? (
                  <div className="flex justify-center items-center lg:h-96 h-52 w-full">
                    <PulseLoader color={"white"} loading={loading} size={10} />
                  </div>
                ) : (
                  <div>
                    <div className=" lg:gap-6 gap-2 lg:mt-3  mt-2 lg:px-8 px-4">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center lg:text-lg lg:mr-0 text-[12px] lg:text-left  lg:leading-6 outfit-medium text-redor"
                      >
                        {data.animeTitle}
                      </Dialog.Title>
                    </div>
                    <div className="flex mt-2 justify-between lg:px-8 px-4">
                      <div className="">
                        {/*  drop down list for episodes*/}

                        <TESTEpisodeDropdown/>
                      </div>
                      <div className="flex text-right items-center gap-2">
                        <span className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                          {data.type}
                        </span>
                        <span className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                          Episodes Aired: {data.totalEpisodes}
                        </span>
                        <span className="text-white outfit-light lg:text-[12px] text-[10px] text-center">
                          {data.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/*synopsis*/}
                {loading ? (
                  ""
                ) : (
                  <div className="my-4 lg:px-8 px-4 overflow-y-auto">
                    <p className="text-white outfit-light lg:text-[12px] text-[10px]">
                      {data.synopsis}
                    </p>
                  </div>
                )}
                <div className=" flex lg:px-4 mt-auto lg:pb-6 pb-4 sm:px-6 flex justify-between gap-6">
                  <div className="flex self-start">
                    <span className="outfit-medium text-white lg:text-[14px] text-[10px] px-4 text-left ">
                      {loading ? "" : "Genres: "}
                      {loading
                        ? ""
                        : data?.genres?.map((genre) => genre).join(", ")}
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
