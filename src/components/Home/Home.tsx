import SearchBar from "./SearchBar";
import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";

const Home = () => {
  return (
    <div className="flex flex-col w-full ml-52 mt-16 overflow-x-hidden">
      <SearchBar />
      <AnimeTrailersHome />
      <TopAnime />
    </div>
  );
};

export default Home;
