import { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import './Button.css';

const Button = ({ label, className, type = 'button', onClick = null }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
      {/* <div className='loading-container'>
        <LoadingSpinner />
      </div> */}
    </button>
  );
};

export default Button;
