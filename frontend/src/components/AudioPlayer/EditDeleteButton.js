import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import './EditDeleteButton.css';

const EditDeleteButton = ({ isEdit, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {isEdit ? (
        <GrEdit className="action-button-icon" />
      ) : (
        <AiFillDelete className="action-button-icon" />
      )}
      {isEdit ? 'Edit' : 'Delete'}
    </button>
  );
};

export default EditDeleteButton;
