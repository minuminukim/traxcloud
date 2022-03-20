import { useSelector, useDispatch } from 'react-redux';
import { PlaybackButton, Audio } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { Volume, SoundBadge } from '.';
import { playNext, playPrevious } from '../../actions/playerActions';
import { setSeeking } from '../../actions/playerActions';
import usePlay from '../../hooks/usePlay';
import Slider from '../Slider';
import PlaybackTime from '../AudioPlayer/PlaybackTime';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './GlobalPlayer.css';
import Waveform from '../Waveform';

const GlobalPlayer = () => {
  const dispatch = useDispatch();
  const { currentTrackId, currentTime } = useSelector((state) => state.player);
  const track = useSelector((state) => state.tracks[currentTrackId]);
  const { previousIndex, nextIndex, queue } = useSelector(
    (state) => state.queue
  );

  const { incrementPlayCount, isSelected, setPlay } = usePlay(currentTrackId);

  const onScrub = (e) => {
    const position = +e.target.value / track.duration;
    dispatch(setSeeking(position, +e.target.value));
    setPlay();
    incrementPlayCount();
  };

  const onPlayNext = () => {
    if (nextIndex !== null) {
      const nextTrackId = queue[nextIndex];
      dispatch(playNext(nextTrackId, nextIndex));
    }
    // incrementPlayCount();
  };

  const onPlayPrevious = () => {
    const previousTrackId = queue[previousIndex];
    dispatch(playPrevious(previousTrackId, previousIndex));
  };

  if (!currentTrackId) {
    return null;
  }

  return (
    currentTrackId && (
      <footer className="footer-container">
        <div className="footer-player">
          <Waveform trackId={currentTrackId} isGlobal hidden />
          {/* <Audio trackId={currentTrackId} /> */}
          <div className="player-controls">
            <button className="player-control">
              <IoPlaySkipBack onClick={onPlayPrevious} />
            </button>
            <PlaybackButton
              className="player-control"
              size="small"
              trackId={currentTrackId}
              withBackground={false}
            />
            <button className="player-control">
              <IoPlaySkipForward onClick={onPlayNext} />
            </button>
          </div>
          <div className="footer-slider">
            <PlaybackTime className="timer" transparent time={currentTime} />
            <Slider
              className="progress-bar"
              min="1"
              max={track.duration || track.duration.toString()}
              step="1"
              value={isSelected ? currentTime : 0}
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
