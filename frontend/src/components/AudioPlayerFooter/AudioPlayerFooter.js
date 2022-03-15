import { useSelector } from 'react-redux';
import { PlaybackButton } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { Volume, SoundBadge } from '.';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  const { currentTrackID } = useSelector((state) => state.player);
  return (
    currentTrackID && (
      <footer className="footer-container">
        <div className="footer-player">
          <div className="player-controls">
            <IoPlaySkipBack className="player-control" />
            <PlaybackButton
              size="small"
              trackID={currentTrackID}
              withBackground={false}
            />
            <IoPlaySkipForward className="player-control" />
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
