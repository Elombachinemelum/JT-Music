import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import "swiper/css";
import "swiper/css/free-mode";
import Controls from "./MusicPlayer/Controls";

const TopChartCard = ({
  song,
  indx,
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className="w-full flex flex-row items-center hover:bg-[#4c426e]
   py-2 p-4 rounded-lg cursor-pointer mb-2"
    >
      <h3 className="font-bold text-base text-white mr-3">{indx + 1}.</h3>
      <div className="flex flex-1 flex-row justify-between items-center">
        <img
          src={song?.images?.coverart || fallBack}
          alt={song?.title}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex flex-1 flex-col justify-center mx-3">
          <Link to={`/songs/${song?.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link
            to={`/artists/${song?.artists[0]?.alias}/${song?.artists[0]?.adamid}`}
          >
            <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>

      <PlayPause
        {...{
          song,
          isPlaying,
          activeSong,
          handlePause: handlePauseClick,
          handlePlay: () => {
            dispatch(setActiveSong({ song, data, indx }));
            dispatch(playPause(true));
          },
        }}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);
  const fallBack =
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

  useEffect(() => {
    divRef?.current.scrollIntoView({ behavior: "smooth" });
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, indx) => (
            <TopChartCard
              {...{
                song,
                indx,
                data,
                isPlaying,
                activeSong,
                handlePauseClick,
                key: song.key,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        {/* swiper implementation */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, indx) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                <img
                  src={song?.images?.background || fallBack}
                  alt="Artist Image"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
