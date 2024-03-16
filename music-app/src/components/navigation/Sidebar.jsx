import { AiFillHome, AiFillGithub } from 'react-icons/ai';
import { FiMusic, FiUsers, FiRadio, FiHeart } from 'react-icons/fi';
import { GiMusicSpell } from 'react-icons/gi';
import NavLink from './NavLink';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link className='app-logo' href='/' >
                <GiMusicSpell />
                <span>Music App</span>
            </Link>

            <div>
                <h2>DISCOVER</h2>

                <ul>
                    <li>
                        <NavLink slug=''>
                            <AiFillHome />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='top_tracks'>
                            <FiMusic />
                            <span>Songs</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='top_artists'>
                            <FiUsers />
                            <span>Artists</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink slug='my-playlist'>
                            <FiMusic />
                            <span>Playlist</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
