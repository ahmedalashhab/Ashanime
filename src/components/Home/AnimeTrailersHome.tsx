import React, { useEffect, useState } from "react";
import axios from "axios";

const AnimeTrailersHome = () => {
  const [animeTrailer, setAnimeTrailer] = useState<any[]>([]);

  const getAnimeTrailer = async () => {
    await axios
      .get("https://api.jikan.moe/v4/watch/promos/popular")
      .then((res) => {
        const { data } = res.data;
        setAnimeTrailer(data);
      })
      .catch((err) => {
        return console.log(err.status);
      });
  };

  useEffect(() => {
    getAnimeTrailer();
  }, []);

  return (
    <div className="mt-8">
      <div className="outfit-light text-white text-[32px] mb-4">
        Popular Anime
      </div>
      <div className="overflow-x-scroll whitespace-nowrap hide-scrollbar">
        {animeTrailer.map(
          (anime: {
            entry: { mal_id: number };
            title: string;
            trailer: { images: { large_image_url: string } };
            url: string;
          }) => {
            return (
              <div key={anime.entry.mal_id} className="seasonal-box rounded-xl">
                <img
                  alt={`thumbnail of ${anime.title}`}
                  src={anime.trailer.images.large_image_url}
                  className="rounded-xl seasonal-img-box"
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AnimeTrailersHome;
