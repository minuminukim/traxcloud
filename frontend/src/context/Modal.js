import { createContext, useContext, useRef, useState, useEffect } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => setValue(modalRef.current), []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};
