import { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import AlertList from '../../components/Alert/AlertList';
import PlaceholderImage from '../../assets/images/placeholder.png';

const ImageFileInput = ({ updateImageFile, disabled = false, src = null }) => {
  const inputRef = useRef(null);
  const { trackId } = useParams();
  const track = useSelector((state) => state.tracks[trackId]);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState([]);

  const toObjectURL = (file) => {
    if (src && !file) return src;
    return file ? URL.createObjectURL(file) : PlaceholderImage;
  };

  const isValidFormat = (type) =>
    ['image/jpeg', 'image/jpg', 'image/png'].some((format) => format === type);

  const validateFile = (file) => {
    setErrors([]);

    if (!file) {
      return;
    }

    if (!isValidFormat(file.type)) {
      return setErrors(['Image file must be .jpeg, .jpg, or .png']);
    }

    if (file.size > 3 * 1024 * 1024) {
      return setErrors(['Image size cannot exceed 3MB.']);
    }
  };

  const chooseFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    validateFile(file);
    if (file && !errors.length) {
      setImageFile(file);
      updateImageFile(file);
    }
  };

  return (
    <>
      <div className="form-image-preview">
        <AlertList messages={errors} />
        <img
          src={useMemo(() => toObjectURL(imageFile), [imageFile, src])}
          alt="Cover preview"
        />
        {!imageFile && !src && (
          <button
            className="file-button upload"
            onClick={chooseFile}
            disabled={disabled}
          >
            <FaCamera className="btn-icon" /> Upload Image
          </button>
        )}
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="imageFile"
          name="imageFile"
          ref={inputRef}
          onChange={handleChange}
          hidden
        />
      </div>
      {(src || imageFile) && (
        <button
          className="file-button replace"
          onClick={chooseFile}
          disabled={disabled}
        >
          Replace Image
        </button>
      )}
    </>
  );
};

export default ImageFileInput;
