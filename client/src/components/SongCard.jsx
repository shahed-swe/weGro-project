import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const SongCard = ({ song, isPlaying, activeSong, i, data, handleModal }) => {
  const dispatch = useDispatch();


  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }



  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"
            }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song?.thumbnail} alt="song_img" className="w-[100%] h-[100%] rounded-sm" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <a to={`/song/${song?.key}`}> {song.title} </a>
        </p>

        <p className="text-sm truncate text-gray-300 mt-1">
          <div className="flex justify-between">
            <span>{song.artistName}</span>
            <button onClick={() => handleModal({data: song, modalOpen: true})}>
              <MdOutlinePlaylistAdd size={20}/>
            </button>
          </div>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
