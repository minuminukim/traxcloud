import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrack, editTrack } from '../../store/trackReducer';
import TrackUploadForm from '../TrackUploadForm';
import Play from './Play';
import Pause from './Pause';
import AudioElement from './AudioElement';
import TrackDetails from './TrackDetails';
import TrackArtwork from './TrackArtwork';
import Timeline from './Timeline';
import TrackButtons from './TrackButtons';
import './MusicPlayer.css';

const MusicPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);

  const user = track.User;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () =>
    dispatch(deleteTrack(track.id, sessionUser.id)).catch(async (response) => {
      const data = await response.json();
      return data;
    });

  // const handleEdit = () => history.push(`/tracks/${track.id}/edit`);
  const handleEdit = () => <TrackUploadForm formState={track} />;

  // const handleEdit = async () => await dispatch(editTrack(track));

  // const togglePlay = () => setIsPlaying(!isPlaying);
  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);

  return (
    <div className="music-player">
      <TrackArtwork
        className="track-artwork artwork-large"
        src={track.artworkUrl}
        title={track.title}
      />
      {isPlaying ? <Pause onClick={onPause} /> : <Play onClick={onPlay} />}
      <TrackDetails
        displayName={user.displayName}
        userId={user.id}
        title={track.title}
        trackId={track.id}
      />
      <AudioElement trackUrl={track.trackUrl} />
      <Timeline />
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
