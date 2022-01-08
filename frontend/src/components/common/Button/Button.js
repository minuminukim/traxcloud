import './Button.css';

const Button = ({ label, className, type = 'button', onClick = null }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
