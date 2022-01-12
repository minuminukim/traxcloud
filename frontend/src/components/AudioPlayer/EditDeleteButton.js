import './EditDeleteButton.css';

const EditDeleteButton = ({ handleClick, className }) => {
  return <button className={className} onClick={handleClick}></button>;
};

export default EditDeleteButton;
