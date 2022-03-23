import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import InputField from '../common/InputField';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { editTrack, fetchSingleTrack } from '../../actions/trackActions';
import ImageFileInput from '../../pages/TrackUploadForm/ImageFileInput';
import LoadingModal from '../common/LoadingSpinner/LoadingModal';

const TrackEditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { trackId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const track = useSelector((state) => state.tracks[trackId]);

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setLoading(true);
    setTitle('');
    setDescription('');
    setInProgress(false);
    setImageFile(null);
    setErrors({});
  };

  useEffect(() => {
    if (!sessionUser) {
      history.push('/unauthorized');
    }

    if (!track) {
      dispatch(fetchSingleTrack(+trackId))
        .then((data) => {
          if (data.userId !== sessionUser.id) {
            history.push('/unauthorized');
          } else {
            setTitle(data.title);
            setDescription(data.description);
          }
        })
        .catch((error) => console.log('error fetching track', error))
        .finally(() => setLoading(false));
    } else {
      setTitle(track.title);
      setDescription(track.description);
      setLoading(false);
    }
    return () => resetForm();
  }, [sessionUser, track, trackId]);

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
        console.log('error updating track', res);
        const data = await res.json();
        setInProgress(false);
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageFile = (file) => setImageFile(file);

  return (
    !isLoading && (
      <div className="page-container edit-track">
        <LoadingModal loading={inProgress} />
        <div className="content-wrap upload">
          <h1>Edit Your Track</h1>
          <div className="form-note">
            <span className="form-requirement">
              Supported image files: .png, .jpg, .jpeg under 3MB.
            </span>
          </div>
          <form onSubmit={onEdit} className="upload-form">
            <div className="form-header">
              <h2 className="form-heading">Basic Info</h2>
            </div>
            <div className="form-body upload">
              <div className="form-section">
                <div className="form-image-preview">
                  {!isLoading && (
                    <ImageFileInput
                      updateImageFile={updateImageFile}
                      src={track?.artworkUrl}
                      disabled={inProgress}
                    />
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
      </div>
    )
  );
};

export default TrackEditForm;
