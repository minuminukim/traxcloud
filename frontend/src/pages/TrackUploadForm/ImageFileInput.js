import { useState, useRef, useMemo } from 'react';
import { FaCamera } from 'react-icons/fa';
import AlertList from '../../components/Alert/AlertList';
import PlaceholderImage from '../../assets/images/default-track-artwork.jpeg';

const ImageFileInput = ({}) => {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState([]);

  const toObjectURL = (file) =>
    file ? URL.createObjectURL(file) : PlaceholderImage;

  const isValidFormat = (type) =>
    ['image/jpeg', 'image/jpg', 'image/png'].some((format) => format === type);

  const validateFile = (file) => {
    setErrors([]);

    if (!file) {
      return setErrors(['Please provide a file.']);
    }

    if (!isValidFormat(file.type)) {
      return setErrors(['Image file must be .jpeg, .jpg, or .png']);
    }

    if (file.size > 3 * 1024 * 1024) {
      return setErrors(['Image size cannot exceed 3MB.']);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log('files', e.target.files);
    const file = e.target.files[0];
    validateFile(file);
    if (!errors.length) {
      setImageFile(file);
    }
  };

  return (
    <div className="form-image-preview">
      <AlertList messages={errors} />
      <img
        src={useMemo(() => toObjectURL(imageFile), [imageFile])}
        alt="Cover preview"
      />
      <button onClick={() => inputRef.current.click()}>
        <FaCamera /> Upload Image
      </button>
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
  );
};

export default ImageFileInput;
