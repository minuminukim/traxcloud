import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setTrack, pauseTrack } from '../../actions/playerActions';
import { editTrack } from '../../actions/trackActions';
import { FaPlay, FaPause } from 'react-icons/fa';
import './PlayButton.css';

const PlaybackButton = ({
  className = '',
  size,
  trackId,
  withBackground = true,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const track = useSelector((state) => state.tracks[trackId]);
  const { queue } = useSelector((state) => state.queue);
  const { isPlaying, reference, currentTrackId } = useSelector(
    (state) => state.player
  );
  const isCurrentlyPlaying = +trackId === currentTrackId;

  const onPause = () => dispatch(pauseTrack());
  const onPlay = () => {
    // if a new track has been selected..
    if (!isCurrentlyPlaying) {
      // if a ref exists, reset previous ref to 0
      // if (reference) {
      //   reference.current.currentTime = 0;
      // }

      dispatch(setTrack(+trackId));
    }
    const trackIndex = queue.indexOf(+trackId);
    dispatch(playTrack(+trackId, trackIndex));

    // if track doesn't belong to current user, or it's currently playing we
    // dispatch to update playcount
    if (sessionUser?.id === track.userId || isCurrentlyPlaying) return;
    const { playCount } = track;
    const updated = { ...track, playCount: playCount + 1 };
    dispatch(editTrack(updated));
  };

  return (
    <button
      className={`media-button play-button ${className} ${size}-button ${
        !withBackground && 'transparent'
      }`}
      id={`play-${trackId}`}
      onClick={isPlaying && isCurrentlyPlaying ? onPause : onPlay}
    >
      {isPlaying && isCurrentlyPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlaybackButton;
