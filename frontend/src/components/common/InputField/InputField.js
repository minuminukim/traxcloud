import './InputField.css';

const InputField = ({
  label,
  type,
  id,
  size,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  ...rest
}) => {
  return (
    <div className={`form-row form-row-${size}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="validation-error">*</span>}
        </label>
      )}
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'error-field' : null}
        {...rest}
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
