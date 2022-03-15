import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrack } from '../../store/trackReducer';
import prefixCORS from '../../utils/prefixCORS';
import TrackUploadForm from '../TrackUploadForm';
import {
  PauseButton,
  PlayButton,
  TrackActions,
  TrackDetails,
  ProgressBar,
  Audio,
} from '.';

import TrackArtwork from '../TrackArtwork';
import './AudioPlayer.css';

const AudioPlayer = ({ trackID, size, index, withArtwork = false }) => {
  const track = useSelector((state) => state.tracks[trackID]);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleEdit = () => <TrackUploadForm formState={track} />;
  const handleDelete = () =>
    dispatch(deleteTrack(track.id, sessionUser.id)).catch(async (response) => {
      const data = await response.json();
      return data;
    });

  return (
    <div className={`music-player track-${track.id} player-${size}`}>
      {withArtwork && (
        <TrackArtwork
          className={`track-artwork artwork-${size}`}
          source={prefixCORS(track.artworkUrl)}
          title={track.title}
        />
      )}
      <div className="music-player-main">
        <div className="music-player-main-top">
          {isPlaying ? (
            <PauseButton size={size} />
          ) : (
            <PlayButton size={size} trackID={trackID} />
          )}
          <TrackDetails trackID={track.id} size={size} />
        </div>
        <Audio trackID={trackID} />
        <ProgressBar trackID={trackID} />
        <TrackActions
          sessionId={sessionUser.id}
          userId={track.userId}
          handleEdit={handleEdit}
          track={track}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
