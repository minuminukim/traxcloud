import { useRef, useState } from 'react';
import Button from '../../components/common/Button';

const FileUploader = ({ handleFile }) => {
  const hiddenInput = useRef(null);
  const [fileErrors, setFileErrors] = useState([]);

  const handleClick = () => hiddenInput.current.click();
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type !== 'audio/mpeg') {
      return setFileErrors(['Please provide a valid mp3.']);
    }

    if (file && file.size >= 10485760) {
      return setFileErrors(['File size cannot exceed 10MB.']);
    }

    await handleFile(file);
  };

  return (
    <>
      <Button
        label="Choose a file to upload"
        className="large-button"
        onClick={handleClick}
      />
      <input
        className={fileErrors.length ? 'error-field hidden' : 'hidden'}
        type="file"
        id="trackFile"
        ref={hiddenInput}
        onChange={handleChange}
      />
      {fileErrors.length > 0 && (
        <ul>
          {fileErrors.map((error) => (
            <li key={error} className="validation-error">
              {error}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FileUploader;
