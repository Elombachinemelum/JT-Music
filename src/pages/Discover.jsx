import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Discover = () => {
  // console.log("---->", genres);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const playerObject = useSelector((state) => state);
  console.log({ playerObject });

  useEffect(() => {
    console.log(data);
    if (error) console.error("=====>", error);
  }, [data, error]);

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
              Discover {genres[0].title}
            </h2>
            <select
              className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
              onChange={() => {}}
              value=""
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
