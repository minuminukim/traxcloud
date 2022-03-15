import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import FileUploader from './FileUploader';
import Textarea from '../../components/common/Textarea';
import { postTrack } from '../../store/trackReducer';

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
      .catch(async (res) => {
        const data = await res.json();
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
    <form onSubmit={handleSubmit} className="upload-form">
      <h2>Upload A Track</h2>
      <InputField
        label="Artwork"
        id="artworkUrl"
        size="medium"
        value={artworkUrl}
        onChange={updateArtworkUrl}
        error={errors.artworkUrl}
        placeholder="Please provide a valid URL."
      />
      <InputField
        label="Title"
        id="title"
        size="medium"
        value={title}
        onChange={updateTitle}
        error={errors.title}
      />
      <Textarea
        label="Description"
        placeholder="Describe your track (optional)."
        id="description"
        size="medium"
        value={description}
        onChange={updateDescription}
        error={errors.description}
        rows="10"
      />
      <FileUploader handleFile={handleTrackFile} />
      <Button
        label="Submit"
        className="large-button upload-submit"
        type="submit"
      />
      <div className="form-requirement">
        <p className="form-requirement">Please provide an MP3 under 10MB.</p>
        <p>
          <span className="validation-error">*</span>
          Required fields
        </p>
      </div>
    </form>
  );
};

export default TrackUploadForm;
