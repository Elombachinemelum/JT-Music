import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCoreApi";
import { useEffect } from "react";

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { name, id: artistId } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  console.log({ artistId, name });

  const {
    data: artistData,
    isFetching: fetchingArtistData,
    error,
  } = useGetArtistDetailsQuery({ name, artistId });

  useEffect(() => {
    console.log({ artistData });
  }, [artistData]);

  if (fetchingArtistData) return <Loader title="Loading Artist Details..." />;

  if (error)
    return (
      <Error message="Sorry, not able to get artist's details at this time" />
    );

  return (
    <div className="flex flex-col ">
      <DetailsHeader {...{ artistId, artistData }} />

      <RelatedSongs
        {...{
          relatedSongData: Object.values(artistData?.songs),
          artistId,
          isPlaying,
          activeSong,
        }}
      />
    </div>
  );
};

export default ArtistDetails;
