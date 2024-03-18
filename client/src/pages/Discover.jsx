import { useDispatch, useSelector } from "react-redux";

import { AddToPlayListModal, Error, Layout, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetTopSongsQuery, useAddMusicToPlayListMutation } from "../redux/services/music";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useState } from "react";
import { toast } from 'react-toastify';

const Discover = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null)
  const [addMusicToPlaylist] = useAddMusicToPlayListMutation()
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopSongsQuery({ page: 1, perPage: 20 });


  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;
  
  const handleAddSongToPlaylist =async (data) => {
    const payload = {
      playlistId: data,
      musicId: selectedSong._id
    }
    try {
      const response = await addMusicToPlaylist(payload)
      if (response.data) {
        toast.success('Song Successfully added to playlist');
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleModal = ({data, modalOpen}) => {
    setSelectedSong(data)
    setIsModalOpen(modalOpen)
  }




  return (
    <Layout>
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
          <select
            onChange={(e) => { dispatch(selectGenreListId(e.target.value)) }}
            value={genreListId || 'pop'}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.map((song, i) => (
            <SongCard
              key={i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              handleModal={handleModal}
              i={i} />
          ))}
        </div>
      </div>
      <AddToPlayListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSongToPlaylist}
      />
    </Layout>
  );
};

export default Discover;
