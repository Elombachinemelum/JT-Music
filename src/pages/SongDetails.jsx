import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCoreApi";
import { useEffect } from "react";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  console.log({ songid });

  const { data: songData, isFetching: fetchingSongData } =
    useGetSongDetailsQuery({ songid });

  const {
    data: relatedSongData,
    isFetching: fetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery({ songid });

  useEffect(() => {
    console.log({ songData });
  }, [songData]);

  if (fetchingSongData || fetchingRelatedSongs)
    return <Loader title="Loading Song Details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader {...{ artistId: "", songData }} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1]?.text?.map((line, indx) => (
              <p key={indx} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, Lyrics is not available.
            </p>
          )}
        </div>
      </div>

      <RelatedSongs {...{ relatedSongData, isPlaying, activeSong }} />
    </div>
  );
};

export default SongDetails;
