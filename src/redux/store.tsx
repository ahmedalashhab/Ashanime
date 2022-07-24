import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import animeReducer, { setStreamId } from "./search-slice";
import { useDispatch } from "react-redux";
import { Buffer } from "buffer";
import notificationReducer from "./notification-slice";
import googleReducer from "./google-slice";
import videoReducer, {
	setContinueWatching,
	setSavedEpisodes,
	setSavedEpisode,
} from "./videoState-slice";
import {
	getUserDataById,
	saveCurrentWatchEpisode,
	updateWatchHistory,
} from "../backend/users";

const encodeBase64 = (data: string) => {
	if (!data) return "undefined";
	return Buffer.from(data).toString("base64");
};

const decodeBase64 = (data: string) => {
	return Buffer.from(data, "base64").toString("ascii");
};

export const store = configureStore({
	reducer: {
		anime: animeReducer,
		notification: notificationReducer,
		google: googleReducer,
		videoState: videoReducer,
	},
});

export const fetchUserDataById = createAsyncThunk(
	"users/fetchById",
	async (userId: string, thunkAPI) => {
		/**
		 * Read the user database
		 */
		const userData = await getUserDataById(userId);
		console.log("GET BUSER DATA aojdivnsijnvijsndvsv", userId, userData);
		thunkAPI.dispatch(setSavedEpisodes(userData.savedEpisodes || []));
		thunkAPI.dispatch(setSavedEpisode(userData.savedEpisode || ""));
	}
);

async function writeContinueWatching(userId: string, newContinueWatching: any) {
	return await saveCurrentWatchEpisode(userId, newContinueWatching);
}

async function updateBackendSavedEpisodes(
	userId: string,
	updateBackendSavedEpisodes: any
) {
	console.log(
		"updateBackendSavedEpisodes",
		updateBackendSavedEpisodes,
		userId
	);
	return await updateWatchHistory(userId, updateBackendSavedEpisodes);
}

export const episodeSelected = createAsyncThunk(
	"episode/selected",
	async (
		{
			selectedEpisode,
			modalData,
			uid,
		}: {
			selectedEpisode: string;
			modalData: any;
			uid: string;
		},
		thunkAPI
	) => {
		const state = thunkAPI.getState() as RootState;
		const { videoState } = state;
		console.log("aoniusnvniusdvsv", selectedEpisode, videoState);
		const backendSyncPromises = [];
		//Do everything related to selecting an episode.
		if (selectedEpisode) {
			thunkAPI.dispatch(setStreamId(selectedEpisode));
			thunkAPI.dispatch(setSavedEpisode(selectedEpisode));
			console.log(videoState.savedEpisodes);
			console.log("JAINCIU24N8V23NVI48UVN34N3");
			/**
			 * Set saved episodes
			 */
			console.log(
				"I4MFUI34NIU3N4VI3N4VIU3NVI34NV",
				modalData.anime,
				encodeBase64(modalData.animeTitle)
			);
			const updatedSelectedEpisodes = {
				...videoState.savedEpisodes,
				[encodeBase64(modalData.animeTitle)]: selectedEpisode,
			};
			console.log("IUN34IUVN3IU4NVIU34NVIU3N4VIU43N");
			console.log(
				"HERERHERHERHERHERHEHREHRE ijnqwiurvno8qwnvouyqnrwnov",
				updatedSelectedEpisodes
			);
			thunkAPI.dispatch(setSavedEpisodes(updatedSelectedEpisodes));

			backendSyncPromises.push(
				updateBackendSavedEpisodes(uid, updatedSelectedEpisodes)
			);
			//check if episode is already in continue watching
			const InContinueWatching = videoState.continueWatching.find(
				(anime: any) => anime.animeTitle === modalData.animeTitle
			);
			if (!InContinueWatching) {
				const newContinueWatching = [
					...(videoState.continueWatching || []),
					modalData,
				];
				thunkAPI.dispatch(setContinueWatching(newContinueWatching));
				backendSyncPromises.push(
					writeContinueWatching(uid, newContinueWatching)
				);
				/**
				 * Set saved episode
				 */
			}
			await Promise.all(backendSyncPromises);
		}
	}
);

export const watchViewOpened = createAsyncThunk(
	"watch/opened",
	async (modalData: any, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const { videoState, anime } = state;
		const currentAnimeTitle = anime.modalData.animeTitle;
		const currentAnimeTitleB64 = encodeBase64(currentAnimeTitle) as string;
		if (videoState.savedEpisodes[currentAnimeTitleB64]) {
			const savedEpisode = videoState.savedEpisodes[currentAnimeTitleB64];
			thunkAPI.dispatch(setStreamId(savedEpisode));
			thunkAPI.dispatch(setSavedEpisode(savedEpisode));
		}
	}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
