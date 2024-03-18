import { useState } from "react";
import { useGetPlayListBasedOnUserIdQuery } from "../redux/services/music";

const AddToPlayListModal = ({ isOpen, onClose, onSubmit }) => {
    const [playListId, setPlayListId] = useState("");
    const user = JSON.parse(window.localStorage.getItem("user"))
    const { data } = useGetPlayListBasedOnUserIdQuery({ userId: user._id })

    const handleSubmit = () => {
        onSubmit(playListId)
        setPlayListId("");
        onClose();
    };

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Add To Playlist
                                </h3>
                                <div className="mt-2">
                                    <select
                                        id="playlist-select"
                                        value={playListId}
                                        onChange={(event) => setPlayListId(event.target.value)}
                                        className="shadow-sm focus:ring-[#365522] focus:border-[#365522] block h-9 w-full border-[#365522] rounded-md"
                                    >
                                        <option value="">Select Playlist</option>
                                        {data && data.length > 0 && data.map((item, i) => <option key={i} value={item._id}>{item.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={handleSubmit}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#37621C] text-base font-medium text-white hover:bg-[#365522] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Add To Playlist
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToPlayListModal;
