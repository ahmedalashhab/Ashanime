export interface anime {
  year: number;
  mal_id: number;
  type: string;
  score: number;
  title: string;
  images: { webp: { large_image_url: string } };
  trailer: { embed_url: string };
  synopsis: string;
}
