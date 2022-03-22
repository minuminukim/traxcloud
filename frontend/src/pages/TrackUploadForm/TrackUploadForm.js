import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchSingleTrack } from '../../actions/trackActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import FileUploader from './FileUploader';
import ImageFileInput from './ImageFileInput';
import Textarea from '../../components/common/Textarea';
import { postTrack, editTrack } from '../../actions/trackActions';
import LoginForm from '../../components/LoginForm';
import LoadingModal from '../../components/common/LoadingSpinner/LoadingModal';
import './TrackUploadForm.css';

const TrackUploadForm = ({ isUpload }) => {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [errors, setErrors] = useState({});

  const onUpload = (e) => {
    e.preventDefault();
    setErrors({});

    const userId = sessionUser.id;
    const params = {
      title,
      description,
      trackDuration,
      trackFile,
      imageFile,
      userId,
      fileSize,
    };

    setInProgress(true);
    dispatch(postTrack(params))
      .then(() => setInProgress(false))
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        setInProgress(false);
        if (data && data.errors) {
          console.log('data', data);
          setErrors(data.errors);
        }
      });
  };

  const onEdit = (e) => {
    e.preventDefault();
    setErrors({});

    const updatedTrack = {
      id: trackId,
      title,
      description,
      imageFile,
      userId: sessionUser.id,
    };

    setInProgress(true);
    dispatch(editTrack(updatedTrack))
      .then(() => setInProgress(false))
      .then(() => history.push(`/tracks/${trackId}`))
      .catch(async (res) => {
        console.log('error posting track', res);
        const data = await res.json();
        setInProgress(false);
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleSubmit = (e) => {
    return isUpload ? onUpload(e) : onEdit(e);
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
      setTitle(file.name);
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageFile = (file) => setImageFile(file);

  return (
    <div className="page-container upload-page">
      <LoadingModal loading={inProgress} />
      {sessionUser ? (
        <div className="content-wrap upload">
          <h1>Upload a Track</h1>
          <div className="form-note">
            <span className="form-requirement">
              Please provide an MP3 file no larger than 10MB.
            </span>
            <span className="form-requirement">
              Supported image files: .png, .jpg, .jpeg under 3MB.
            </span>
          </div>
          <span className="form-file-name">{trackFile?.name}</span>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-header">
              <h2 className="form-heading">Basic Info</h2>
            </div>
            <div className="form-body upload">
              <div className="form-section">
                <div className="form-image-preview">
                  <ImageFileInput
                    updateImageFile={updateImageFile}
                    disabled={inProgress}
                  />
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
                <FileUploader
                  handleFile={handleTrackFile}
                  disabled={inProgress}
                />
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
                  disabled={inProgress}
                />
                <Button
                  label="Save"
                  className="small-button submit-button"
                  type="submit"
                  disabled={inProgress}
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
