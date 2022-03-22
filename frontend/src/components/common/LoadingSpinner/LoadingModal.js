import { useState, useEffect } from 'react';
import Modal from '../../ModalWrapper/Modal';
import LoadingSpinner from './LoadingSpinner';

const LoadingModal = ({ loading }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(loading);
  }, [loading]);

  return (
    showModal && (
      <Modal>
        <LoadingSpinner />
      </Modal>
    )
  );
};

export default LoadingModal;
