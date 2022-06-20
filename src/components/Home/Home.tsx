import SearchBar from "../Shared/SearchBar";
import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";
import Sidebar from "../Shared/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const userSignedIn = typeof localStorage.getItem("user") === "string";
  console.log(userSignedIn);

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  useEffect(() => {
    !userSignedIn && navigate("/login");
  }, []);

  return (
    <div>
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
