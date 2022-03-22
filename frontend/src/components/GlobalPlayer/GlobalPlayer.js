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
import { useTimer, usePlay } from '../../hooks';

const GlobalPlayer = () => {
  const dispatch = useDispatch();
  const { currentTrackId, currentTime } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[currentTrackId]);
  const { previousIndex, nextIndex, queue } = useSelector(
    (state) => state.queue
  );

  const { incrementPlayCount, isSelected, selectTrack, setPlaying } =
    usePlay(currentTrackId);

  const { time, setTime } = useTimer(currentTrackId);

  const onScrub = async (e) => {
    const position = +e.target.value / track.duration;
    // updateTime(+e.target.value);
    dispatch(setSeeking(position, +e.target.value));
    setPlaying();
    incrementPlayCount();
  };

  const onPlayNext = () => {
    if (nextIndex !== null) {
      const nextTrackId = queue[nextIndex];
      selectTrack(nextTrackId);
      dispatch(updateTime(0));
      dispatch(setSeeking(0, 0));
      dispatch(playNext(nextTrackId, nextIndex));
      incrementPlayCount(nextTrackId);
    }
  };

  const onPlayPrevious = () => {
    const previousTrackId = queue[previousIndex];
    selectTrack(previousTrackId);
    dispatch(updateTime(0));
    dispatch(setSeeking(0, 0));
    dispatch(playPrevious(previousTrackId, previousIndex));
  };

  if (!currentTrackId) {
    return null;
  }

  return (
    currentTrackId && (
      <footer className="footer-container">
        <div className="footer-player">
          <Audio trackId={currentTrackId} />
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
            <PlaybackTime className="timer" transparent time={time} />
            <Slider
              className="progress-bar"
              min="1"
              max={track.duration || track.duration.toString()}
              step="1"
              value={time}
              onChange={onScrub}
            />
            <PlaybackTime
              className="duration"
              transparent
              time={track.duration}
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
