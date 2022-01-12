import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrack, editTrack } from '../../store/trackReducer';
import prefixCORS from '../../utils/prefixCORS';
import TrackUploadForm from '../TrackUploadForm';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import AudioElement from './AudioElement';
import TrackDetails from './TrackDetails';
import TrackArtwork from './TrackArtwork';
import ProgressBar from './ProgressBar';
import TrackButtons from './TrackButtons';
import './AudioPlayer.css';
import source from '../../assets/images/14. Chuck Person - Lightening Strikes.mp3';

const AudioPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [trackId, setTrackId] = useState(0);
  const audio = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   setDuration(audio.current.duration);
  // }, [audio]);

  // useEffect(() => {
  //   setCurrentTime(audio.current.currentTime);
  // }, [audio.current.currentTime]);
  // console.log('track', track);
  const user = track.User;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleLoadedMetadata = () => setDuration(audio.current.duration);
  const handlePlayClick = () => setIsPlaying(true);
  const handlePauseClick = () => setIsPlaying(false);
  const handleTimeUpdate = () => setCurrentTime(audio.current.currentTime);
  const handleSeeking = (value) => (audio.current.currentTime = value);

  const handlePlay = (e) => {
    const id = +e.target.id.split('-')[1];
    console.log('id', id);
    setTrackId(id);
    console.log('stateId', trackId);
  };

  const handleDelete = () =>
    dispatch(deleteTrack(track.id, sessionUser.id)).catch(async (response) => {
      const data = await response.json();
      return data;
    });

  const handleEdit = () => <TrackUploadForm formState={track} />;

  let testSrc =
    'https://traxcloud-react-project.s3.amazonaws.com/14.+Chuck+Person+-+Lightening+Strikes.mp3';
  // console.log('audio', audio);
  return (
    <div className={`music-player track-${track.id}`}>
      <TrackArtwork
        className="track-artwork artwork-large"
        src={prefixCORS(track.artworkUrl)}
        title={track.title}
      />
      {isPlaying ? (
        <PauseButton onClick={handlePauseClick} />
      ) : (
        <PlayButton onClick={handlePlayClick} />
      )}
      <TrackDetails
        //TODO figure out how to get reference to track.User after submitting edit form
        displayName={user.displayName}
        userId={track.userId}
        title={track.title}
        trackId={track.id}
      />
      <audio
        // src={testSrc}
        // src={prefixCORS(track.trackUrl)}
        // src={track.trackUrl}
        id={`track-${track.id}`}
        src={prefixCORS(testSrc)}
        crossOrigin="true"
        ref={audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
      />
      {/* <AudioElement trackUrl={track.trackUrl} ref={audio} /> */}
      <ProgressBar
        duration={duration}
        currentTime={currentTime}
        onChange={handleTimeUpdate}
        onSeeking={handleSeeking}
      />
      <TrackButtons
        sessionId={sessionUser.id}
        userId={track.userId}
        handleEdit={handleEdit}
        track={track}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AudioPlayer;
