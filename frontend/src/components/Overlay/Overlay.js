import './Overlay.css';

const Overlay = ({ className, style, children }) => {
  return (
    <span className={`overlay ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Overlay;
