import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTrack } from '../../store/trackReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';

const TrackUploadForm = ({ sessionUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id;
    const response = await dispatch(
      postTrack({
        title,
        description,
        artworkUrl,
        trackDuration,
        trackFile,
        userId,
        fileSize,
      })
    );

    if (response && response.errors) {
      setErrors(response.errors);
    }
  };

  const getTrackDuration = async (file) => {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const audio = document.createElement('audio');
      audio.src = url;
      audio.onloadedmetadata = () => resolve(audio.duration);
    });
  };

  const handleTrackFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const duration = await getTrackDuration(file);
      setTrackDuration(Math.ceil(duration));
      setFileSize(Math.ceil(file.size));
      setTrackFile(file);
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateArtworkUrl = (e) => setArtworkUrl(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload</h2>
      <InputField
        label="Upload a track"
        type="file"
        id="trackFile"
        onChange={handleTrackFile}
        error={errors.trackFile}
      />
      <InputField
        label="Artwork"
        id="artworkUrl"
        value={artworkUrl}
        onChange={updateArtworkUrl}
        error={errors.artworkUrl}
      />
      <InputField
        label="Title"
        id="title"
        value={title}
        onChange={updateTitle}
        error={errors.title}
      />
      <InputField
        label="Description"
        id="description"
        placeholder="Describe your track (optional)"
        value={description}
        onChange={updateDescription}
        error={errors.description}
      />
      <Button label="Submit" className="large-button" type="submit" />
    </form>
  );
};

export default TrackUploadForm;
