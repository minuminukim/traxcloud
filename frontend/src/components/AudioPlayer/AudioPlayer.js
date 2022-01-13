import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrack, editTrack } from '../../store/trackReducer';
import prefixCORS from '../../utils/prefixCORS';
import TrackUploadForm from '../TrackUploadForm';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import TrackDetails from './TrackDetails';
import TrackArtwork from '../common/TrackArtwork/';
import TrackHeader from './TrackHeader';
import ProgressBar from './ProgressBar';
import TrackButtons from './TrackButtons';
import './AudioPlayer.css';
import source from '../../assets/images/14. Chuck Person - Lightening Strikes.mp3';

const AudioPlayer = ({ track, size, withArtwork = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackId, setTrackId] = useState(0);
  const audio = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying]);

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

  const handleEdit = () => <TrackUploadForm formState={track} />;
  const handleDelete = () =>
    dispatch(deleteTrack(track.id, sessionUser.id)).catch(async (response) => {
      const data = await response.json();
      return data;
    });

  let testSrc =
    'https://traxcloud-react-project.s3.amazonaws.com/14.+Chuck+Person+-+Lightening+Strikes.mp3';
  // console.log('audio', audio);
  return (
    <div className={`music-player track-${track.id} player-${size}`}>
      {withArtwork && (
        <TrackArtwork
          className={`track-artwork artwork-${size}`}
          source={prefixCORS(track.artworkUrl)}
          title={track.title}
        />
      )}
      <div className="music-player-main">
        <div className="music-player-main-top">
          {isPlaying ? (
            <PauseButton onClick={handlePauseClick} size={size} />
          ) : (
            <PlayButton onClick={handlePlayClick} size={size} />
          )}
          <TrackDetails
            displayName={user.displayName}
            userId={track.userId}
            title={track.title}
            trackId={track.id}
            size={size}
          />
        </div>
        <audio
          src={testSrc}
          // src={prefixCORS(track.trackUrl)}
          // src={track.trackUrl}
          id={`track-${track.id}`}
          // src={prefixCORS(testSrc)}
          crossOrigin="anonymous"
          ref={audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
        />
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
    </div>
  );
};

export default AudioPlayer;
