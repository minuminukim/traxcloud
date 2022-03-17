import { FaTrash } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import './EditDeleteButton.css';

const EditDeleteButton = ({ isEdit, onClick, className, withText = true }) => {
  return (
    <button className={className} onClick={onClick}>
      {isEdit ? (
        <GrEdit className="action-button-icon" />
      ) : (
        <FaTrash className="action-button-icon" />
      )}
      {withText && <span>{isEdit ? 'Edit' : 'Delete'}</span>}
    </button>
  );
};

export default EditDeleteButton;
