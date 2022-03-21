import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSeeking } from '../actions/playerActions';

const useSeek = (containerRef) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState({ position: 0, time: 0 });
  const [end, setEnd] = useState({ position: 0, time: 0 });

  const calculateSeekPosition = (clientX) => {
    /**
     * Synthetic mouse event doesn't have offsetX property,
     * so we calculate the difference between e.clientX
     * and containerRef's offsetLeft,
     * then divide that by the container's offsetWidth
     */

    const offsetLeft = containerRef.current.getBoundingClientRect().left;
    const offsetX = clientX - offsetLeft;
    const offsetWidth = containerRef.current.offsetWidth;

    // Calculate mouse event position and time to seek to
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;

    return { position, time };
  };

  const onSeek = (e) => {
    const { position, time } = calculateSeekPosition(e.clientX);
    dispatch(setSeeking(position, time));
  };

  // TODO: Define event handlers for scrub event

  return { onSeek };
};

export default useSeek;
