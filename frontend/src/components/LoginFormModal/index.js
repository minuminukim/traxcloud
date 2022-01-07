import { useState } from 'react';
import LoginForm from './LoginForm';
import Modal from '../Modal';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalOnClick = () => setShowModal(true);
  const modalOnClose = () => setShowModal(false);

  return (
    <>
      <button onClick={modalOnClick}>Log In</button>
      {showModal && (
        <Modal onClose={modalOnClose}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
