import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const SongUploadForm = () => {
  const [track, setTrack] = useState(null);

  const updateTrack = (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    if (file) setTrack(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('track', track);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload</h2>
      <InputField
        label="Upload a Track"
        type="file"
        id="track"
        value={track}
        onChange={updateTrack}
      />
      <Button label="Submit" className="large-button" />
    </form>
  );
};

export default SongUploadForm;
