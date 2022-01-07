import './FormButton.css';

const FormButton = ({ label }) => {
  return (
    <button type="submit" className="form-button">
      {label}
    </button>
  );
};

export default FormButton;
