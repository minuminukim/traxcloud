import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/commentActions';
import ProfilePicture from '../common/ProfilePicture';
import InputField from '../common/InputField';
import './CommentField.css';

const generateRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const CommentField = ({ trackId, duration, height }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.session);
  const [body, setBody] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body.length || inProgress) return;

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
      } finally {
        setBody('');
        setInProgress(false);
      }
    })();
  };

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
    <form
      className={`comment-field comment-field-${height}`}
      onSubmit={handleSubmit}
    >
      <ProfilePicture user={user} size="medium" shape="square" />
      <InputField
        id="comment"
        placeholder="Write a comment"
        value={body}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <input type="submit" hidden ref={formRef} />
    </form>
  );
};

export default CommentField;
