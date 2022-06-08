import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { anime } from "../../types/type";

interface props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  data: anime;
}

export default function Modal({ setToggle, toggle, data }: props) {
  const cancelButtonRef = useRef(null);

  console.log({ modal: data });

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
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative page-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="flex flex-col page-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 outfit-medium text-white"
                    >
                      {data.title}
                    </Dialog.Title>
                  </div>
                  {/* TODO: Fix Gintama null embed path*/}
                  <iframe title="video player" src={data.trailer.embed_url} />
                </div>
                <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 redor-button text-base font-medium text-white hover:bg-red-600 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add to Watchlist
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
