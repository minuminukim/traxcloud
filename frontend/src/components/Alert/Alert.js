import { useState, useEffect } from 'react';
import { AiOutlineExclamation, AiOutlineClose } from 'react-icons/ai';

const Alert = ({ message, imageSource = null }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, [setVisible]);

  return (
    visible && (
      <li className="alert">
        <div className="alert-content">
          <div className="alert-image-container">
            {imageSource ? (
              <img
                className="alert-image"
                src={imageSource}
                alt="Panel indicating an alert."
              />
            ) : (
              <AiOutlineExclamation />
            )}
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
