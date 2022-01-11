import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTrack } from '../../store/trackReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';

const TrackUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(
      postTrack({
        title,
        description,
        artworkUrl,
        trackFile,
      })
    );

    if (response && response.errors) {
      setErrors(response.errors);
    }
  };

  const handleTrackFile = (e) => {
    const file = e.target.files[0];
    if (file) setTrackFile(file);
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
