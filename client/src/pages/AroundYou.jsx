import { useState } from "react";
import { useSelector } from "react-redux";

import { Playlist, Modal } from "../components";
import { useAddPlaylistMutation, useGetAllPlayListsQuery, useDeletePlaylistMutation } from "../redux/services/music";
import Layout from "../components/Layout";
import { toast } from 'react-toastify';

const AroundYou = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addPlaylist] = useAddPlaylistMutation();
    const { data, refetch } = useGetAllPlayListsQuery()
    const [deletePlaylist] = useDeletePlaylistMutation();

    const handleCreatePlaylist = async (payload) => {
        try {
            const response = await addPlaylist(payload);
            if(response){
                toast.success('Playlist created successfully');
                refetch()
            }else if(response?.error?.status === 401){
                toast.error(response.error.data.error);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeletePlayList = async (playlist) => {
        try {
            const response = await deletePlaylist(playlist._id);
            console.log(response)
            refetch()
            if(response){
                toast.success('Playlist Deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete playlist:', error);
        }
    }

    return (
        <Layout>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                    Private Playlist
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="ml-2 px-2 bg-[#37621C] text-white rounded-full shadow-md hover:bg-[#365522]"
                    >
                        <span className="relative top-[-3px]">+</span>
                    </button>
                </h2>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.map((playlist, i) => (
                        <Playlist playlist={playlist} onDelete={(playlist) => handleDeletePlayList(playlist)} key={i}/>
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
