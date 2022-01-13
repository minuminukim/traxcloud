import { IoPlay } from 'react-icons/io5';
import { IoPause } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPlaySkipBack } from 'react-icons/io5';
import { IoMdVolumeHigh } from 'react-icons/io';
import './AudioPlayerFooter.css';

const AudioPlayerFooter = () => {
  return (
    <div className="player-footer">
      <IoPlaySkipBack className="player-button" />
      <IoPlay className="player-button" />
      <IoPause className="player-button" />
      <IoPlaySkipForward className="player-button" />
      <IoMdVolumeHigh className="player-button" />
    </div>
  );
};

export default AudioPlayerFooter;
