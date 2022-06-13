import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

//TODO - add a backdrop to the modal

interface data {
  entry: { title: string; mal_id: number };
  trailer: { embed_url: string };
}
interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  data: data;
}

const Modal = ({ setToggle, data, toggle }: props) => {
  const cancelButtonRef = useRef(null);
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

        <div className="fixed z-10 inset-0 flex justify-center overflow-y-auto">
          <div className="h-full w-5/6 flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="discover-modal-width flex flex-col relative page-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div className="w-5/6 flex flex-col page-bg">
                  {/*Checks if video URL is available*/}
                  {data.trailer.embed_url ? (
                    <iframe
                      title="video player"
                      style={{ height: 600, width: 1060 }}
                      src={data.trailer.embed_url}
                      className="h-full w-full"
                    />
                  ) : (
                    <div
                      className="flex justify-center items-center"
                      style={{ height: 600, width: 1060 }}
                    >
                      <span className="text-white outfit-medium ">
                        {/*if no video URL then display below message*/}
                        No trailer available :(
                      </span>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
