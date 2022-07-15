import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import AnimeGridStream from "../Shared/AnimeGridStream";
import {
	animeSearch,
	setCurrentPage,
	setModalData,
	setStream,
	setStreamId,
} from "../../redux/search-slice";
import ModalStreamTW from "../Shared/ModalStreamTW";
import MobileNavTW from "../Shared/MobileNavTW";

const SearchResults = () => {
	const [modalId, setModalId] = useState<string>("");
	const [modal, setModal] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCurrentPage(1));
		return () => {
			dispatch(animeSearch([]));
		};
	}, []);

	const animeReducer = useSelector((state: RootState) => state.anime);
	const searchResults = animeReducer.searchResults;
	const searchQueryView = animeReducer.searchQueryView;

	const handleSearchTitleStart = () => {
		return `Search results for`;
	};

	const handleSearchTitleEnd = () => {
		return ` ${searchQueryView}`;
	};

	const handleModal = (active: boolean, animeId: string) => {
		setModal(active);
		if (animeId) {
			setModalId(animeId);
		}
	};

	const handleGridRows = () => {
		//  make a new grid row for every 5 bookmarks
		const gridRows =
			searchResults.length % 5 === 0
				? searchResults.length / 5
				: Math.ceil(searchResults.length / 5);
		return `grid-rows-${gridRows}`;
	};

	return (
		<div>
			<Navbar />
			<MobileNavTW />
			<div className="flex justify-center mt-12">
				<div className="mt-8 lg:mx-12 mx-4 screen-width" id="top-anime">
					<div className=" ml-4 mb-4">
						<span className="outfit-light text-white text-[32px]">
							{handleSearchTitleStart()}
						</span>
						<span className="outfit-light text-redor text-[32px] ">
							{handleSearchTitleEnd()}
						</span>
					</div>
					<AnimeGridStream
						animeList={searchResults}
						handleModal={handleModal}
						handleGridRows={handleGridRows}
					/>
					<div className="mb-10 mt-5"></div>
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
		</div>
	);
};

export default SearchResults;
