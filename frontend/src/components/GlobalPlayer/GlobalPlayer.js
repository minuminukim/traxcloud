import { useSelector, useDispatch } from 'react-redux';
import { Volume, SoundBadge } from '.';
import {
  playNext,
  playPrevious,
  updateTime,
  setSeeking,
} from '../../actions/playerActions';

import Slider from '../Slider';
import PlaybackTime from '../AudioPlayer/PlaybackTime';
import { PlaybackButton, Audio } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import './GlobalPlayer.css';
import { usePlay } from '../../hooks';
import useTimer from '../../hooks/useTimer';
import { useEffect, useRef, useState } from 'react';

const GlobalPlayer = () => {
  const dispatch = useDispatch();
  const { currentTrackId } = useSelector((state) => state.player);

  const duration = useSelector(
    (state) => state.tracks[currentTrackId]?.duration
  );
  const { previousIndex, nextIndex, queue } = useSelector(
    (state) => state.queue
  );

  const { incrementPlayCount, isSelected } = usePlay(currentTrackId);

  const { timer } = useTimer(currentTrackId);

  const onScrub = (e) => {
    const position = +e.target.value / duration;
    // updateTime(+e.target.value);
    dispatch(setSeeking(position, +e.target.value));
  };

  const onPlayNext = () => {
    if (nextIndex !== null) {
      const nextTrackId = queue[nextIndex];
      dispatch(playNext(nextTrackId, nextIndex));
      incrementPlayCount(nextTrackId);
    }
  };

  const onPlayPrevious = () => {
    if (previousIndex !== null) {
      const previousTrackId = queue[previousIndex];
      dispatch(playPrevious(previousTrackId, previousIndex));
    }
  };

  if (!currentTrackId) {
    return null;
  }

  return (
    currentTrackId && (
      <footer className="footer-container">
        <div className="footer-player">
          <Audio
            trackId={currentTrackId}
            // setTime={timer}
          />
          <div className="player-controls">
            <button className="player-control">
              <IoPlaySkipBack onClick={onPlayPrevious} />
            </button>
            <PlaybackButton
              className="player-control"
              size="small"
              trackId={currentTrackId}
              withBackground={false}
              isGlobal
            />
            <button className="player-control">
              <IoPlaySkipForward onClick={onPlayNext} />
            </button>
          </div>
          <div className="footer-slider">
            <PlaybackTime className="timer" transparent time={timer} />
            <Slider
              className="progress-bar"
              min="1"
              max={duration || duration?.toString()}
              step="1"
              value={isSelected ? timer : 0}
              onChange={onScrub}
            />
            <PlaybackTime
              className="duration"
              transparent
              time={duration}
            />
          </div>
          <Volume />
          <SoundBadge />
        </div>
      </footer>
    )
  );
};

export default GlobalPlayer;
