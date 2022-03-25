import { useState, useEffect } from 'react';
import {
  AiOutlineExclamation,
  AiOutlineClose,
  AiOutlineCheck,
} from 'react-icons/ai';

const Alert = ({ message, isError = true }) => {
  const [visible, setVisible] = useState(true);
  const alertType = isError ? 'error' : 'success';

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, [setVisible]);

  return (
    visible && (
      <li className="alert">
        <div className="alert-content">
          <div className={`alert-image-container ${alertType}`}>
            {isError ? <AiOutlineExclamation /> : <AiOutlineCheck />}
          </div>
          <p className="alert-message">{message}</p>
        </div>
        <AiOutlineClose
          className="close-icon pointer"
          onClick={() => setVisible(false)}
        />
      </li>
    )
  );
};

export default Alert;
