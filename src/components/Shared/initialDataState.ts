import { anime } from "../../types/type";

export const initialDataState: anime = {
  year: 0,
  mal_id: 0,
  type: "",
  score: 0,
  title: "",
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
