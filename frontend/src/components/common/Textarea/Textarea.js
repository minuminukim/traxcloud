import './Textarea.css';

const Textarea = ({
  label,
  type,
  id,
  placeholder,
  rows,
  size,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={`form-row-${size}`}>
      <label className="form-label">{label}</label>
      <textarea
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'error-field' : null}
        rows={rows}
      />
      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

Textarea.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
  error: null,
  rows: '3',
};

export default Textarea;
