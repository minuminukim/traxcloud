import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/commentActions';
import ProfilePicture from '../common/ProfilePicture';
import InputField from '../common/InputField';
import { AlertList } from '../Alert';
import './CommentField.css';

const generateRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const CommentField = ({ trackId, height }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.session);
  const { duration } = useSelector((state) => state.tracks[trackId]);
  const [body, setBody] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.length || inProgress) return;

    setErrors([]);

    const commentData = {
      userId: user.id,
      trackId: +trackId,
      // Generate a random time if one hasn't been provided
      timePosted: generateRandomInt(duration),
      body,
    };

    (async () => {
      try {
        setInProgress(true);
        await dispatch(postComment(commentData));
      } catch (error) {
        console.log('error posting comment', error);
        const data = await error.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      } finally {
        if (!errors.length) setBody('');
        setInProgress(false);
      }
    })();
  };

  // To submit form on enter
  const handleKeyUp = (e) => {
    e.stopPropagation();

    // Enter key
    if (e.keyCode === 13) {
      e.target.blur();
      formRef.current.click();
    }
  };

  const handleInputChange = (e) => setBody(e.target.value);

  return (
    <>
      <AlertList messages={errors} />
      <form
        className={`comment-field comment-field-${height}`}
        onSubmit={handleSubmit}
      >
        <ProfilePicture userId={user.id} size="medium" shape="square" />
        <InputField
          id="comment"
          placeholder="Write a comment"
          value={body}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <input type="submit" hidden ref={formRef} />
      </form>
    </>
  );
};

export default CommentField;
