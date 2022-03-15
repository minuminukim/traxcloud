import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isCurrentTrack } from '../../utils';
import { pauseTrack, setReference } from '../../actions/playerActions';
import {
  PlaybackButton,
  TrackActions,
  TrackDetails,
  ProgressBar,
  Audio,
} from '.';

import TrackArtwork from '../TrackArtwork';
import './AudioPlayer.css';

const AudioPlayer = ({ trackID, size, withArtwork = false }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackID]);
  const { audio, currentTrackID } = useSelector((state) => state.player);

  const togglePlay = (e) => {
    e.stopPropagation();
    
  };

  return (
    <div className={`music-player track-${track.id} player-${size}`}>
      {withArtwork && (
        <TrackArtwork
          className={`track-artwork artwork-${size}`}
          trackID={trackID}
        />
      )}
      <div className="music-player-main">
        <div className="music-player-main-top">
          <PlaybackButton size={size} trackID={trackID} />
          <TrackDetails trackID={track.id} size={size} />
        </div>
        <Audio trackID={trackID} />
        <ProgressBar trackID={trackID} />
        <TrackActions trackID={trackID} />
      </div>
    </div>
  );
};

export default AudioPlayer;
