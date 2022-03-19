import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../common/InputField';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { editTrack } from '../../actions/trackActions';

const TrackEditForm = ({ track }) => {
  const [title, setTitle] = useState(track.title);
  const [description, setDescription] = useState(track.description || "");
  const [artworkUrl, setArtworkUrl] = useState(track.artworkUrl);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const userId = track.userId;
    const updatedTrack = {
      id: track.id,
      title,
      description,
      artworkUrl,
      userId,
    };

    return dispatch(editTrack(updatedTrack))
      .then((response) => response)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateArtworkUrl = (e) => setArtworkUrl(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit</h2>
      <InputField
        label="Title"
        id="title"
        value={title}
        onChange={updateTitle}
        error={errors.title}
      />
      <InputField
        label="Artwork"
        id="artworkUrl"
        value={artworkUrl}
        onChange={updateArtworkUrl}
        error={errors.artworkUrl}
      />
      <Textarea
        label="Description"
        placeholder="Describe your track (optional)."
        id="description"
        size="medium"
        value={description}
        onChange={updateDescription}
        error={errors.description}
      />
      <Button label="Submit" className="large-button" type="submit" />
    </form>
  );
};

export default TrackEditForm;
