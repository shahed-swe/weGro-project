import { SiGocd } from "react-icons/si";
import { RiDeleteBinLine } from "react-icons/ri";


const Playlist = ({ playlist, onDelete }) => {
    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <button
                onClick={() => onDelete(playlist)}
                className="absolute top-2 right-2 px-2 py-2 text-white hover:text-white"
            >
                <RiDeleteBinLine size={20}/>
            </button>
            <div className="relative w-full h-56 group">
                {playlist && playlist?.tracks[0]?.thumbnail ?
                    <img src={playlist?.tracks[0]?.thumbnail} alt="song_img" className="w-[100%] h-[100%] rounded-sm" /> : <SiGocd className="w-[100%] h-[100%] rounded-sm" />}
            </div>

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <a to={`/song/${playlist?.key}`}> {playlist.name} </a>
                </p>
            </div>
        </div>
    );
};

export default Playlist;
