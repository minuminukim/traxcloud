import { useSelector, useDispatch } from 'react-redux';
import { PlaybackButton, Audio } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { Volume, SoundBadge } from '.';
import { playNext, playPrevious } from '../../actions/playerActions';
import usePlay from '../../hooks/usePlay';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  const dispatch = useDispatch();
  const { currentTrackId } = useSelector((state) => state.player);
  const { previousIndex, nextIndex, queue } = useSelector(
    (state) => state.queue
  );

  // const { incrementPlayCount } = usePlay(currentTrackId);

  const onPlayNext = () => {
    const nextTrackId = queue[nextIndex];
    dispatch(playNext(nextTrackId, nextIndex));
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
          <ProgressBar
            trackId={currentTrackId}
            transparent
            withTimers={false}
          />
          <Volume />
          <SoundBadge />
        </div>
      </footer>
    )
  );
};

export default AudioPlayerFooter;
