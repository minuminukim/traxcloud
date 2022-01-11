import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../store/trackReducer';

const MusicPlayerButton = ({ type, trackId, userId }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => await dispatch(deleteTrack(trackId, userId));

  return <button onClick={handleDelete}>{type}</button>;
};

export default MusicPlayerButton;
