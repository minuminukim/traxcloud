import './Slider.css';

const Slider = ({ min, max, step, value, onChange, className }) => {
  const percentFilled = ((value - min) / (max - min)) * 100;
  const style = {
    background:
      'linear-gradient(to right, #f50 0%, #f50 ' +
      percentFilled +
      '%, #999 ' +
      percentFilled +
      '%, #999 100%)',
  };

  return (
    <div className={`slider-container ${className}`}>
      <input
        className={`slider ${className}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={style}
      />
    </div>
  );
};

export default Slider;
