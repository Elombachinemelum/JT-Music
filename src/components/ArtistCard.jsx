import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const fallBack =
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80
 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() =>
        navigate(
          `/artists/${track?.artists?.[0]?.alias}/${track?.artists?.[0]?.adamid}`
        )
      }
    >
      <img
        alt="Artist"
        src={track?.images?.coverart}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
