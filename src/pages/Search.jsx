import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCoreApi";
import { useParams } from "react-router-dom";

const Search = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { searchTerm } = useParams();

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song?.track);

  if (isFetching) return <Loader title="Getting Top Chart..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            {...{ key: song.key, isPlaying, activeSong, song, data, i }}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
