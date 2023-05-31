import PlayPause from "./PlayPause";
import { playPause } from "../redux/features/playerSlice";
import SongBar from "./SongBar";
import { useDispatch } from "react-redux";

const RelatedSongs = ({ relatedSongData, isPlaying, activeSong, artistId }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => dispatch(playPause(false));

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, indx) => (
          <SongBar
            key={indx}
            song={song}
            i={indx}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
