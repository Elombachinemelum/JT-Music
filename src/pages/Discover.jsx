import { Error, Loader, SongCard } from "../components";
import { genres, genresMap } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCoreApi";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const { genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  return (
    <>
      {isFetching ? (
        <Loader title="Loading Song..." />
      ) : error ? (
        <Error />
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
              Discover{" "}
              {genres?.find((genre) => genre.value === genreListId)?.title ||
                "Pop"}
            </h2>
            <select
              className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
              onChange={(evt) => {
                dispatch(selectGenreListId(genresMap?.[evt.target.value]));
              }}
              value={genreListId || "Pop"}
            >
              {genres?.map((genre) => (
                <option key={genre.value}>{genre.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.map((song, indx) => (
              <SongCard
                key={song.key}
                song={song}
                i={indx}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Discover;
