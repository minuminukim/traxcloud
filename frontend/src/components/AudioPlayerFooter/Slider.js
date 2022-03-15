const Slider = ({ color, min, max, step, value, onChange }) => {
  return (
    <input
      className={`slider ${color}`}
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
