import './Button.css';

const Button = ({
  label,
  className,
  type = 'button',
  onClick = null,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
