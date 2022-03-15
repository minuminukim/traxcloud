import { useSelector, useDispatch } from 'react-redux';
import { PlaybackButton, Audio } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { Volume, SoundBadge } from '.';
import { playNext, playPrevious } from '../../actions/playerActions';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  const dispatch = useDispatch();
  const { currentTrackID } = useSelector((state) => state.player);

  return (
    currentTrackID && (
      <footer className="footer-container">
        <div className="footer-player">
          <Audio trackID={currentTrackID} />
          <div className="player-controls">
            <IoPlaySkipBack
              className="player-control"
              onClick={() => dispatch(playPrevious())}
            />
            <PlaybackButton
              size="small"
              trackID={currentTrackID}
              withBackground={false}
            />
            <IoPlaySkipForward
              className="player-control"
              onClick={() => dispatch(playNext())}
            />
          </div>

          <ProgressBar trackID={currentTrackID} />
          <Volume />
          <SoundBadge />
        </div>
      </footer>
    )
  );
};

export default AudioPlayerFooter;
