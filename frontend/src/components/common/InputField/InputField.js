import './InputField.css';

const InputField = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <label className="form-group">
      {label}
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

InputField.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
};

export default InputField;
