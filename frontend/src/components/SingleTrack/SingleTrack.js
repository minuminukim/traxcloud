import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayer from '../AudioPlayer';

const SingleTrack = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { trackId } = useParams();
  const tracks = useSelector((state) => state.tracks);
  const track = tracks[trackId];

  return <AudioPlayer track={track} />;
};

export default SingleTrack;
