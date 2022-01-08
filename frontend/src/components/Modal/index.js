import { useState } from 'react';
import Modal from './Modal';

const ModalWrapper = ({ children, buttonLabel }) => {
  const [showModal, setShowModal] = useState(false);
  const modalOnClick = () => setShowModal(true);
  const modalOnClose = () => setShowModal(false);

  return (
    <>
      <button onClick={modalOnClick}>{buttonLabel}</button>
      {showModal && <Modal onClose={modalOnClose}>{children}</Modal>}
    </>
  );
};

export default ModalWrapper;
