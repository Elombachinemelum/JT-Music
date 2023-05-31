import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";

const TopCharts = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Getting Top Chart..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Chart
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            {...{ key: song.key, isPlaying, activeSong, song, data, i }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
