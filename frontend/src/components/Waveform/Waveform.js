import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSeeking,
  setWaveform,
  loadPlayer,
  setPlayerReady,
  updateTime,
} from '../../actions/playerActions';
import { editTrack } from '../../actions/trackActions';
import usePlay from '../../hooks/usePlay';
import WaveSurfer from 'wavesurfer.js';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

const Waveform = ({ trackId }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.tracks[trackId]);
  const { currentTime, currentTrackId, waveformRef } = useSelector(
    (state) => state.player
  );
  const containerRef = useRef(null);
  const wavesurfer = useRef();
  const { seekPosition, isPlaying, isSelected } = useSelector(
    (state) => state.player
  );
  const { selectTrack, setPlaying } = usePlay(trackId);

  // Initialize waveform object
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      progressColor: '#f50',
      backend: 'MediaElement',
      responsive: true,
      interact: false,
      normalize: true,
      barGap: 2,
      barWidth: 2,
      cursorColor: 'transparent',
      barHeight: 1,
      xhr: {
        mode: 'cors',
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'client',
        headers: [{ key: 'Access-Control-Allow-Headers', value: '*' }],
      },
      // height: 60,
    });

    dispatch(loadPlayer(trackId));
    wavesurfer.current.load(track.trackUrl, track.peakData);
    wavesurfer.current.setMute(true);

    wavesurfer.current.on('ready', () => {
      // if waveform data doesn't exist, we dispatch data to database
      if (!track.peakData) {
        wavesurfer.current.exportPCM(256, 100, true).then((peakData) => {
          const updated = { ...track, peakData };
          dispatch(editTrack(updated));
        });
      }

      dispatch(setPlayerReady(trackId));
    });

    return () => wavesurfer.current.destroy();
  }, [track.trackUrl]);

  useEffect(() => {
    if (currentTrackId === trackId) {
      dispatch(setWaveform(wavesurfer.current));
    }
  }, [currentTrackId, trackId, wavesurfer.current]);

  useEffect(() => {
    if (currentTrackId === trackId) {
      if (isPlaying) {
        wavesurfer.current.play(currentTime);
      } else {
        wavesurfer.current.pause();
      }
    } else {
      wavesurfer.current.stop();
    }
  }, [isPlaying, currentTrackId, trackId]);

  useEffect(() => {
    if (isPlaying && currentTrackId === trackId) {
      wavesurfer.current.seekTo(seekPosition);
    }
  }, [seekPosition, currentTrackId, trackId]);

  const onSeek = (e) => {
    /**
     * Synthetic mouse event doesn't have offsetX property,
     * so we calculate the difference between e.clientX
     * and containerRef's offsetLeft
     */
    const offsetX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const offsetWidth = containerRef.current.offsetWidth;

    // Calculate mouse event position and time to seek to
    const position = offsetX / offsetWidth;
    const time = track?.duration * position;

    dispatch(setSeeking(position, time));
  };

  const onMouseDown = (e) => {
    if (!isSelected) {
      selectTrack(trackId);
    }
    onSeek(e);
    setPlaying();
  };

  return (
    <>
      {/* <div style={{ display: isLoading ? 'none' : 'block' }}> */}
      <div
        className="waveform-container"
        ref={containerRef}
        onMouseDown={onMouseDown}
        // hidden={isLoading}
      ></div>
      {/* </div> */}

      {/* {isLoading ? <LoadingSpinner /> : <p>ready</p>} */}
    </>
  );
};

export default Waveform;
