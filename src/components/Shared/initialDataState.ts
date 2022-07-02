import { anime } from "../../types/type";
import { streamModal } from "../../types/type";

export const streamDataState: streamModal = {
  animeTitle: "",
  type: "",
  releasedDate: "",
  status: "",
  genres: [""],
  otherNames: "",
  synopsis: "",
  animeImg: "",
  totalEpisodes: 0,
  episodesList: [
    {
      episodeId: "",
      episodeNum: 0,
      episodeUrl: "",
    },
  ],
};

export const initialDataState: anime = {
  rank: 0,
  year: 0,
  mal_id: 0,
  type: "",
  score: 0,
  title: "",
  studios: [{ name: "" }],
  trailer: { embed_url: "" },
  images: {
    jpg: { large_image_url: "" },
    webp: { large_image_url: "" },
  },
  synopsis: "",
  episodes: 0,
  status: "",
  demographics: [
    {
      mal_id: 0,
      type: "",
      name: "",
      url: "",
    },
  ],
  genres: [
    {
      mal_id: 0,
      type: "",
      name: "",
      url: "",
    },
  ],
};
