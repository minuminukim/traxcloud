import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchSingleTrack } from '../../actions/trackActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import FileUploader from './FileUploader';
import Textarea from '../../components/common/Textarea';
import { postTrack, editTrack } from '../../actions/trackActions';
import LoginForm from '../../components/LoginForm';
import './TrackUploadForm.css';

const TrackUploadForm = ({ isUpload }) => {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (isUpload || !sessionUser) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const track = await dispatch(fetchSingleTrack(+trackId));
        if (track.userId !== sessionUser.id) {
          throw Error('Unauthorized');
        }
        setTitle(track.title);
        setDescription(track.description || '');
        setArtworkUrl(track.artworkUrl);
        setLoading(false);
      } catch (error) {
        console.log('error fetching track', error);
        history.push('/error');
      }
    })();
  }, [isUpload, sessionUser]);

  const onUpload = (e) => {
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

  const onEdit = (e) => {
    e.preventDefault();
    setErrors({});

    const updatedTrack = {
      id: trackId,
      title,
      description,
      artworkUrl,
      userId: sessionUser.id,
    };

    return dispatch(editTrack(updatedTrack))
      .then(() => history.push(`/tracks/${trackId}`))
      .catch(async (res) => {
        const data = await res.json();
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
  const updateArtworkUrl = (e) => setArtworkUrl(e.target.value);

  return (
    !isLoading && (
      <div className="page-container upload-page">
        {sessionUser ? (
          <div className="content-wrap upload">
            <h1>{isUpload ? 'Upload a Track' : 'Edit Your Track'}</h1>
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
                  {isUpload && <FileUploader handleFile={handleTrackFile} />}
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
    )
  );
};

export default TrackUploadForm;
