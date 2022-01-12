import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrack, editTrack } from '../../store/trackReducer';
import prefixCORS from '../../utils/prefixCORS';
import TrackUploadForm from '../TrackUploadForm';
import Play from './Play';
import Pause from './Pause';
import AudioElement from './AudioElement';
import TrackDetails from './TrackDetails';
import TrackArtwork from './TrackArtwork';
import ProgressBar from './ProgressBar';
import TrackButtons from './TrackButtons';
import './MusicPlayer.css';
import source from '../../assets/images/14. Chuck Person - Lightening Strikes.mp3';

const MusicPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);

  const audio = useRef();

  useEffect(() => {
    setDuration(audio.current.duration);
  }, [audio]);

  useEffect(() => {
    setCurrentTime(audio.current.currentTime);
  }, [audio.current.currentTime]);

  const user = track.User;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onPlay = () => {
    setIsPlaying(true);
    audio.current.play();
  };

  const onPause = () => {
    setIsPlaying(false);
    audio.current.pause();
  };

  const onTimeUpdate = (e) => {
    e.preventPropagation();
    setCurrentTime(audio.current.currentTime);
  };

  const handleDelete = () =>
    dispatch(deleteTrack(track.id, sessionUser.id)).catch(async (response) => {
      const data = await response.json();
      return data;
    });

  // const handleEdit = () => history.push(`/tracks/${track.id}/edit`);
  const handleEdit = () => <TrackUploadForm formState={track} />;

  // const handleEdit = async () => await dispatch(editTrack(track));

  // const togglePlay = () => setIsPlaying(!isPlaying);
  console.log('aduio', audio);
  return (
    <div className="music-player">
      <TrackArtwork
        className="track-artwork artwork-large"
        src={prefixCORS(track.artworkUrl)}
        title={track.title}
      />
      {isPlaying ? <Pause onClick={onPause} /> : <Play onClick={onPlay} />}
      <TrackDetails
        displayName={user.displayName}
        userId={user.id}
        title={track.title}
        trackId={track.id}
      />
      <audio
        src={source}
        preloaded="metadata"
        crossOrigin="true"
        ref={audio}
        onTimeUpdate={onTimeUpdate}
      />
      {/* <AudioElement trackUrl={track.trackUrl} ref={audio} /> */}
      <ProgressBar duration={duration} currentTime={currentTime} />
      <TrackButtons
        sessionId={sessionUser.id}
        userId={user.id}
        handleEdit={handleEdit}
        track={track}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MusicPlayer;
