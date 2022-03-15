const Slider = ({ color, min, max, step, value, onChange, className }) => {
  return (
    <input
      className={`${color} ${className}`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
};

export default Slider;
