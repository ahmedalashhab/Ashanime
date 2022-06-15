import SearchBar from "../Shared/SearchBar";
import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";
import Sidebar from "../Shared/Sidebar";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex justify-center">
        <div className="flex flex-col screen-width ml-44 mt-16 overflow-x-hidden">
          <SearchBar />
          <AnimeTrailersHome />
          {<TopAnime />}
        </div>
      </div>
    </div>
  );
};

export default Home;
