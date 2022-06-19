import SearchBar from "../Shared/SearchBar";
import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";
import Sidebar from "../Shared/Sidebar";
import { useState } from "react";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  return (
    <div className="home-wallpaper">
      <Sidebar paginate={(pageNumber: number) => paginate(pageNumber)} />
      <div className="flex justify-center">
        <div className="flex flex-col screen-width ml-44 mt-16 overflow-x-hidden">
          <SearchBar />
          <AnimeTrailersHome />
          {
            <TopAnime
              currentPage={currentPage}
              paginate={(pageNumber: number) => paginate(pageNumber)}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
