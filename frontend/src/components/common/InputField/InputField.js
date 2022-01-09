import './InputField.css';

const InputField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  error,
}) => {
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
        className={error ? 'error-field' : null}
      />
      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputField.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
  error: null,
};

export default InputField;
