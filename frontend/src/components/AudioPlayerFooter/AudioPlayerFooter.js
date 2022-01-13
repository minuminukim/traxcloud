import { IoPlay } from 'react-icons/io5';
import { IoPause } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPlaySkipBack } from 'react-icons/io5';
import { IoMdVolumeHigh } from 'react-icons/io';
import ProgressBar from '../AudioPlayer/ProgressBar';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  return (
    <div className="player-footer">
      <div className="player-controls">
        <IoPlaySkipBack className="player-control" />
        <IoPlay className="player-control" />
        <IoPause className="player-control" />
        <IoPlaySkipForward className="player-control" />
        <IoMdVolumeHigh className="player-control" />
      </div>
      <div className="footer-progress-bar">
        {/* <ProgressBar /> */}
      </div>
    </div>
  );
};

export default AudioPlayerFooter;
