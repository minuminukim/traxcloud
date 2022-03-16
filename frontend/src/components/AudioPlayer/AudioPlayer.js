import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isCurrentTrack } from '../../utils';
import {
  PlaybackButton,
  TrackActions,
  TrackDetails,
  TrackHeader,
  ProgressBar,
} from '.';

import TrackArtwork from '../TrackArtwork';
import './AudioPlayer.css';

const AudioPlayer = ({
  trackID,
  size,
  withArtwork = false,
  withHeader = false,
}) => {
  const track = useSelector((state) => state.tracks[trackID]);
  const { currentTrackID } = useSelector((state) => state.player);
  const isCurrent = isCurrentTrack(+trackID, currentTrackID);

  return (
    <div className={`player track-${track.id} player-${size}`}>
      {withHeader && <TrackHeader trackID={trackID} />}
      <div className="player-main">
        {withArtwork && (
          <div className="player-artwork">
            <TrackArtwork
              className={`track-artwork artwork-${size}`}
              trackID={trackID}
            />
          </div>
        )}
        <div className="player-content">
          <div className="player-header">
            <PlaybackButton size={size} trackID={trackID} />
            <TrackDetails trackID={track.id} size={size} />
          </div>
          <ProgressBar trackID={trackID} isCurrent={isCurrent} />
          <TrackActions trackID={trackID} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
