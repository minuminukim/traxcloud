import defaultImage from '../assets/images/default-track-artwork.jpeg';

export const onImageError = (e) => {
  e.target.src = defaultImage;
  e.target.onerror = null;
  return true;
};
