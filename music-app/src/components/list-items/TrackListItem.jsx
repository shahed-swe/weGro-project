'use client';
import React from 'react';
import { formatDuration } from '@/utils/formatters';
import { useDispatch } from 'react-redux';
import { playSong } from '@/redux/features/songsSlice';

const TrackListItem = ({ index, playlist, track: {  title,thumbnail, duration, artistName } }) => {
    const dispatch = useDispatch();
    const formattedDuration = formatDuration(duration);

    return (
        <li
            className='track-list-item'
            onClick={ () => dispatch(playSong({index, playlist})) }
        >
            <img src={ thumbnail } alt="" />

            <div className='song-details'>
                <div>
                    <strong className='overflowing-text'>{ title }</strong>

                    <div className='artist-name overflowing-text'>
                        { artistName }
                    </div>
                </div>

                <span>{ formattedDuration }</span>
                
            </div>
        </li>
    );
};

export default TrackListItem;