import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import FileUploader from './FileUploader';
import Textarea from '../../components/common/Textarea';
import { postTrack } from '../../store/trackReducer';
import LoginForm from '../../components/LoginForm';
import './TrackUploadForm.css';

const TrackUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // TODO: protect route
  // useEffect(() => {
  //   if (!session
  // }, [sessionUser]);

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
      console.log('@@@@@@@@', file);
      setTitle(file.name);
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateArtworkUrl = (e) => setArtworkUrl(e.target.value);

  return (
    <div className="page-container upload-page">
      {sessionUser ? (
        <div className="content-wrap upload">
          <h1>Upload A Track</h1>
          <div className="form-note">
            <span className="form-requirement">
              Please provide an MP3 file no larger than 10MB.
            </span>
          </div>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-header">
              <h2 className="form-heading">Basic Info</h2>
            </div>
            <div className="form-body upload">
              <div className="form-section">
                <div className="form-image-preview">
                  {artworkUrl && (
                    <img src={artworkUrl} alt="Cover art preview" />
                  )}
                </div>
              </div>
              <div className="form-section form-fields">
                <InputField
                  label="Title"
                  id="title"
                  size="medium"
                  value={title}
                  onChange={updateTitle}
                  error={errors.title}
                  required
                />
                <InputField
                  label="Artwork"
                  id="artworkUrl"
                  size="medium"
                  value={artworkUrl}
                  onChange={updateArtworkUrl}
                  error={errors.artworkUrl}
                  placeholder="Please provide a valid URL."
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="Describe your track (optional)"
                  id="description"
                  size="medium"
                  value={description}
                  onChange={updateDescription}
                  error={errors.description}
                  rows="10"
                />
                <FileUploader handleFile={handleTrackFile} />
              </div>
            </div>
            <div className="form-submit-row">
              <p className="form-requirement">
                <span className="validation-error">*</span>
                Required fields
              </p>
              <div className="form-buttons">
                <Button
                  className="small-button cancel transparent"
                  label="Cancel"
                  onClick={history.goBack}
                />
                <Button
                  label="Save"
                  className="small-button submit-button"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default TrackUploadForm;
