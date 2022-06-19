export interface anime {
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
