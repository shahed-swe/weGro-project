import React from 'react';
import Searchbar from './Searchbar';
import TopPlay from './TopPlay';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { useSelector } from 'react-redux';

const Layout = (props) => {
    const { activeSong } = useSelector((state) => state.player);
    return (
        <div className="relative flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#427d1a]">
                <Searchbar />

                <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        {props.children}
                    </div>
                    <div className="xl:sticky relative top-0 h-fit">
                        <TopPlay />
                    </div>
                </div>
            </div>

            {activeSong?.title && (
                <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                    <MusicPlayer />
                </div>
            )}
        </div>
    );
};

export default Layout;