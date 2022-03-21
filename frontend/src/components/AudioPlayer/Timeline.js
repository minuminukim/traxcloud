import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlay from '../../hooks/usePlay';
import { fetchSingleUser } from '../../store/userReducer';
import ProfilePicture from '../common/ProfilePicture';
import PlaybackTime from './PlaybackTime';
import './Timeline.css';

const Timeline = ({ trackId }) => {
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime } = useSelector((state) => state.player);
  // const comments = useSelector((state) => state.comments);
  // const [isLoading, setLoading] = useState(true);
  // const trackComments = track?.commentIds?.map((id) => comments[id]);
  const { isSelected } = usePlay(+trackId);

  return (
    <div className="timeline">
      <div className={`timers-container ${isSelected ? 'between' : 'end'}`}>
        {isSelected && <PlaybackTime className="timer" time={currentTime} />}
        <PlaybackTime className="duration" time={track.duration} />
      </div>
      {/* <ul className="timeline-comments">
        {trackComments?.length > 0 &&
          trackComments.map(({ id, user }) => (
            <li className="timeline-comment" key={id}>
              <ProfilePicture user={user} size="small" shape="tiny" />
            </li>
          ))}
      </ul> */}
    </div>
  );
};

export default Timeline;
