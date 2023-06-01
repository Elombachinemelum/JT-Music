import React, { useEffect, useState } from "react";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsByLocationQuery } from "../redux/services/shazamCoreApi";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const [reRun, setRerun] = useState(0);

  const { data, isFetching, error } = useGetSongsByLocationQuery(country);

  useEffect(() => {
    const key = "at_pCs2Bh4559st3iD8iPZUGKodXqxRo";
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${key}`)
      .then((response) => {
        setCountry(response?.data?.location.country);
      })
      .catch((err) => console.error(err.message || err))
      .finally(() => setLoading(false));
  }, [reRun]);

  useEffect(() => {
    if (country && !isFetching && !loading && !error) setRerun(reRun + 1);
  }, [isFetching, loading, error]);

  if (isFetching || loading) return <Loader title="Getting Chart..." />;

  if (country && error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
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

export default AroundYou;
