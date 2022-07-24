import React, { Fragment, useEffect, useState, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
	fetchUserDataById,
	RootState,
	useAppDispatch,
	episodeSelected,
	watchViewOpened,
} from "../../redux/store";
import { useSelector } from "react-redux";
import { setStreamId } from "../../redux/search-slice";
import { episodesList } from "../../types/type";
import continueWatching from "../Home/ContinueWatching";
import { get, child, ref, set, getDatabase } from "firebase/database";
import { db } from "../../firebase/Firebase";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function TESTEpisodeDropdown(modalToggle: any) {
	const dispatch = useAppDispatch();
	const streamId = useSelector((state: RootState) => state.anime.streamId);
	const episodesList = useSelector(
		(state: RootState) => state.anime.modalData.episodesList
	);
	const modalData = useSelector((state: RootState) => state.anime.modalData);
	const animeTitle = useSelector(
		(state: RootState) => state.anime.modalData.animeTitle
	);
	const savedEpisode = useSelector(
		(state: RootState) => state.videoState.savedEpisode
	);
	const savedEpisodes = useSelector(
		(state: RootState) => state.videoState.savedEpisodes
	);
	const email = useSelector(
		(state: RootState) => state.google.profileObject.email
	);
	//remove all characters from email after period
	const emailClean = email.split("@")[0].split(".").join("");

	const [selected, setSelected] = useState<any>(savedEpisode);

	// fetch savedEpisodes from firebase
	useEffect(() => {
		/**
		 * Move this to modal open use effect
		 */
		console.log("getUserdata use effect", emailClean);
		dispatch(fetchUserDataById(emailClean));
		dispatch(watchViewOpened(modalData));
		/**
		 * Keep this here
		 */
		// setSelected(savedEpisode);
		console.log(savedEpisode);
	}, [modalToggle]);

	// send the selected episode to the video player
	useEffect(() => {
		console.log("episode selected use effect");
		dispatch(
			episodeSelected({
				selectedEpisode: selected,
				modalData,
				uid: emailClean,
			})
		);
		console.log(savedEpisode);
	}, [selected]);

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<div className="flex">
					<Listbox.Label className="flex items-center outfit-medium text-white lg:mr-6 text-[12px]">
						Episode:{" "}
					</Listbox.Label>
					<div className="relative flex items-center lg:w-52 w-24">
						<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							<span className="block truncate text-[12px]">
								{streamId}
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute episode-selector mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{episodesList &&
									[...episodesList]
										.reverse()
										.map((episode: episodesList) => (
											<Listbox.Option
												key={episode.episodeNum}
												className={({ active }) =>
													classNames(
														active
															? "text-white bg-indigo-600"
															: "text-gray-900",
														"cursor-default select-none relative py-2 pl-3 pr-9"
													)
												}
												value={episode.episodeId}
											>
												{({ selected, active }) => (
													<>
														<span
															className={classNames(
																selected
																	? "font-semibold"
																	: "font-normal",
																"block truncate"
															)}
														>
															{episode.episodeNum}
														</span>

														{selected ? (
															<span
																className={classNames(
																	active
																		? "text-white"
																		: "text-indigo-600",
																	"absolute inset-y-0 right-0 flex items-center pr-4"
																)}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
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
	);
}
