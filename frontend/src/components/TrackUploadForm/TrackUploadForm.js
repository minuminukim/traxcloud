import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postTrack } from '../../store/trackReducer';
import InputField from '../common/InputField';
import Button from '../common/Button';
import FileUploader from './FileUploader';

const TrackUploadForm = ({ sessionUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

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
      return setErrors(response.errors);
    }

    history.push('/stream');
  };

  const getTrackDuration = async (file) => {
    const objectURL = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const audio = document.createElement('audio');
      audio.src = objectURL;
      // audio.onloadedmetadata = () => resolve(audio.duration);
      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        URL.revokeObjectURL(objectURL);
        return resolve(duration);
      };
    });
  };

  const handleTrackFile = async (file) => {
    if (file) {
      const duration = await getTrackDuration(file);
      console.log('duration', duration);
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
      {!trackFile ? (
        <FileUploader handleFile={handleTrackFile} />
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};

export default TrackUploadForm;
