import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard, Modal } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/wegro";
import { useAddPlaylistMutation } from "../redux/services/music";
import Layout from "../components/Layout";

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setloading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);
    const [addPlaylist, { isLoading, isError, error: createError }] = useAddPlaylistMutation();

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_nxOsushE5XT1Zrw6ULvn8uIRtTrOU`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setloading(false));
    }, [country]);

    if (isFetching && loading) return <Loader title="Loading songs around you" />;

    if (error && country) return <Error />;

    const handleCreatePlaylist = async (payload) => {
        try {
            const response = await addPlaylist(payload);
            if(response){
                console.log(response)
            }
        } catch (error) {
            
            console.log(error)
        }
    };

    return (
        <Layout>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                    Private Playlist <span className="font-black">{country}</span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="ml-2 px-2 bg-[#37621C] text-white rounded-full shadow-md hover:bg-[#365522]"
                    >
                        <span className="relative top-[-3px]">+</span>
                    </button>
                </h2>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.map((song, i) => (
                        <SongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            i={i}
                        />
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePlaylist}
            />
        </Layout>
    )

};

export default AroundYou;
