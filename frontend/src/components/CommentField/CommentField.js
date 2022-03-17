import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComment } from '../../actions/commentActions';
import ProfilePicture from '../common/ProfilePicture';
import InputField from '../common/InputField';
import './CommentField.css';

const generateRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const CommentField = ({ duration }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { trackId } = useParams();
  const { user } = useSelector((state) => state.session);
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body.length) return;

    const commentData = {
      userId: user.id,
      trackId: +trackId,
      timePosted: generateRandomInt(duration),
      body,
    };

    return dispatch(postComment(commentData))
      .then((comment) => console.log('comment', comment))
      .then(() => setBody(''))
      .catch((error) => console.log('error posting comment', error));
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
      className="comment-field"
      // ref={formRef}
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
