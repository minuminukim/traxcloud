import { createPortal } from 'react-dom';
import { useModal } from '../../context/Modal';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  const modalNode = useModal();

  return modalNode
    ? createPortal(
        <div id="modal">
          <div id="modal-background" onClick={onClose} />
          <div id="modal-content">{children}</div>
        </div>,
        modalNode
      )
    : null;
};

export default Modal;
