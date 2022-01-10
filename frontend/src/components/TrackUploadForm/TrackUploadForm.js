import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const TrackUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artwork, setArtwork] = useState(null);
  const [track, setTrack] = useState(null);

  const updateTrack = (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    if (file) setTrack(file);
  };

  const updateArtwork = (e) => {
    const file = e.target.files[0];
    if (file) setArtwork(file);
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('track', track);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload</h2>
      <InputField
        label="Upload a track"
        type="file"
        id="track"
        value={track}
        onChange={updateTrack}
      />
      <InputField
        label="Upload image"
        type="file"
        id="artwork"
        value={artwork}
        onChange={updateArtwork}
      />
      <InputField
        label="Title"
        id="title"
        value={title}
        onChange={updateTitle}
      />
      <InputField
        label="Description"
        id="description"
        placeholder="Describe your track (optional)"
        value={description}
        onChange={updateDescription}
      />
      <Button label="Submit" className="large-button" />
    </form>
  );
};

export default TrackUploadForm;
