import './InputField.css';

const InputField = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputField.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
};

export default InputField;
