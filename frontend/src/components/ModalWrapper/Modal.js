import { createPortal } from 'react-dom';
import { useModal } from '../../context/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  const modalNode = useModal();

  return modalNode
    ? createPortal(
        <div id="modal">
          <div id="modal-background" onClick={onClose} />
          <div id="modal-content">{children}</div>
          {onClose && (
            <AiOutlineClose className="modal-close pointer" onClick={onClose} />
          )}
        </div>,
        modalNode
      )
    : null;
};

export default Modal;
