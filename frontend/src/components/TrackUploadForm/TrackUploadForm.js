import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import InputField from '../common/InputField';
import Button from '../common/Button';
import FileUploader from './FileUploader';
import { postTrack, getAllTracks } from '../../store/trackReducer';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    const userId = sessionUser.id;
    const params = {
      title,
      description,
      artworkUrl,
      trackDuration,
      trackFile,
      userId,
      fileSize,
    };

    return dispatch(postTrack(params))
      .then(() => history.push('/'))
      .catch((data) => {
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
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
      <FileUploader handleFile={handleTrackFile} />
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
