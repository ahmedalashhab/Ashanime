export interface streamSearch {
  animeId: string;
  animeTitle: string;
  animeUrl: string;
  animeImg: string;
  status: string;
}

export interface streamModal {
  animeTitle: string;
  type: string;
  releasedDate: string;
  status: string;
  genres: [string];
  otherNames: string;
  synopsis: string;
  animeImg: string;
  totalEpisodes: number;
  episodesList: [
    {
      episodeId: string;
      episodeNum: number;
      episodeUrl: string;
    }
  ];
}

export interface anime {
  rank: number;
  studios: [{ name: string }];
  year: number;
  mal_id: number;
  type: string;
  score: number;
  title: string;
  images: {
    jpg: { large_image_url: string };
    webp: { large_image_url: string };
  };
  trailer: { embed_url: string };
  synopsis: string;
  episodes: number;
  demographics: animeDemographics[];
  status: string;
  genres: genres[];
}

interface animeDemographics {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface genres {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
