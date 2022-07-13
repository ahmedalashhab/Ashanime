
import React, {Fragment, useEffect, useState, useRef} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {setStreamId} from "../../redux/search-slice";
import {episodesList} from "../../types/type";
import {setSavedAnimeTitle, setSavedEpisode} from "../../redux/videoState-slice";




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
const [selected, setSelected] = useState<any>(null);


  const dispatch = useAppDispatch();
  const streamId = useSelector((state: RootState) => state.anime.streamId);
  const episodesList = useSelector((state: RootState) => state.anime.modalData.episodesList);
  const modalData = useSelector((state: RootState) => state.anime.modalData);
  const savedEpisode = useSelector((state: RootState) => state.videoState.savedEpisode);
  const animeTitle = useSelector(
    (state: RootState) => state.anime.modalData.animeTitle
  );
  const episodeSelected = useSelector(
    (state: RootState) => state.anime.episodeSelected
  );




  useEffect(() => {
    if (selected) {
      dispatch(setStreamId(selected));
      dispatch(setSavedEpisode(selected))
      localStorage.setItem("streamId", JSON.stringify(selected));
      localStorage.setItem("savedAnimeTitle", JSON.stringify(animeTitle))
    }

  }
  , [selected])

  const savedAnimeTitle = JSON.parse(localStorage.getItem("savedAnimeTitle") as string);


  //set to local storage
  useEffect(() => {
    if (animeTitle && animeTitle.length > 3 && episodeSelected) {
      dispatch(setSavedAnimeTitle(animeTitle));
     }
    //  save savedEpisode to local storage
    if (streamId !== null && streamId !== "") {
      localStorage.setItem("savedEpisode", JSON.stringify(streamId))}

  }, [episodeSelected, animeTitle, streamId, dispatch])

  // get from local storage
  useEffect(() => {
    if ( savedAnimeTitle === modalData.animeTitle) {

      const savedEpisode = JSON.parse(localStorage.getItem("savedEpisode") as string);
      dispatch(setStreamId(savedEpisode));
      setSelected(savedEpisode);
    }

    return () => {
      setSelected(null)
    }

  }, [savedAnimeTitle, dispatch, modalData])

  console.log(selected)

  return (
    <Listbox value={selected}
             onChange={setSelected}>
      {({ open }) => (
        <div className='flex'>
          <Listbox.Label className="flex items-center outfit-medium text-white lg:mr-6 text-[12px]">Episode: </Listbox.Label>
          <div className="relative flex items-center lg:w-52 w-24">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate text-[12px]">{streamId}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {[...episodesList].reverse().map((episode: episodesList ) => (
                  <Listbox.Option
                    key={episode.episodeNum}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={episode.episodeId}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {episode.episodeNum}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}