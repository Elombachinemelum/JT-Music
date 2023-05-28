import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const fallBack =
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 
     bg-white/5 bg-opacity-80 backdrop-blur-sm
      animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center 
        bg-black bg-opacity-50 group-hover:flex${
          activeSong?.title === song?.title
            ? " flex bg-black bg-opacity-7 "
            : " hidden"
        }`}
        >
          <PlayPause
            {...{
              song,
              isPlaying,
              activeSong,
              handlePause: handlePauseClick,
              handlePlay: handlePlayClick,
            }}
          />
        </div>
        <img src={song?.images?.coverart || fallBack} alt="song_img" />
      </div>

      {/* title and artiste */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to="/">{song?.title}</Link>
        </p>
        <span className="text-sm text-gray-100 opacity-50">By</span>
        <p className="text-gray-300 mt-1 text-sm truncate">
          <Link to="/">{song?.subtitle}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
