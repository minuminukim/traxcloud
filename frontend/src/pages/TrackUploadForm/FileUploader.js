import { useRef, useState } from 'react';
import Button from '../../components/common/Button';
import AlertList from '../../components/Alert/AlertList';

const FileUploader = ({ handleFile, disabled }) => {
  const hiddenInput = useRef(null);
  const [fileErrors, setFileErrors] = useState([]);
  /** TODO: Improve validation error handling..
   *
   * Currently a bit of weird behavior:
   *
   * 1. After an alert expires (through click event or timeout),
   * if the same error is triggered in succession, the message
   * does not render. Appears it could be related to parent form
   * state.
   */

  const handleClick = () => hiddenInput.current.click();

  const handleChange = async (e) => {
    setFileErrors([]);
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
        disabled={disabled}
      />
      <input
        className={fileErrors.length ? 'error-field hidden' : 'hidden'}
        type="file"
        id="trackFile"
        name="trackFile"
        ref={hiddenInput}
        onChange={handleChange}
        accept=".mp3"
      />
      {fileErrors.length > 0 && <AlertList messages={fileErrors} />}
    </>
  );
};

export default FileUploader;
