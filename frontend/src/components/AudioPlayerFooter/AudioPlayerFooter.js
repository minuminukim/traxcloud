import { useSelector } from 'react-redux';
import { PlaybackButton } from '../AudioPlayer';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { Volume } from '.';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  const { currentTrackID } = useSelector((state) => state.player);
  return (
    currentTrackID && (
      <div className="player-footer">
        <div className="player-controls">
          <IoPlaySkipBack className="player-control" />
          <PlaybackButton size="small" trackID={currentTrackID} />
          <IoPlaySkipForward className="player-control" />
        </div>
        <div className="footer-progress-bar">
          <ProgressBar trackID={currentTrackID} />
        </div>
        <Volume />
      </div>
    )
  );
};

export default AudioPlayerFooter;
