import { useState } from 'react';
import Modal from './Modal';
import Button from '../common/Button';

const ModalWrapper = ({ children, label, className }) => {
  const [showModal, setShowModal] = useState(false);
  const modalOnClick = () => setShowModal(true);
  const modalOnClose = () => setShowModal(false);

  return (
    <>
      <Button label={label} className={className} onClick={modalOnClick} />
      {showModal && <Modal onClose={modalOnClose}>{children}</Modal>}
    </>
  );
};

export default ModalWrapper;
