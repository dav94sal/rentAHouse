import { createContext, useContext, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import './Modal.css'

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const modalRef = useRef();

  const closeModal =() => {
    setModalContent(null);

    if (typeof onModalClose === 'function') {
      onModalClose()
      setOnModalClose(null)
    }
  }

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  }

  return (
    <>
      <ModalContext.Provider value={ contextValue }>
        {children}
      </ModalContext.Provider>
      <div ref={ modalRef }></div>
    </>
  )
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={() => closeModal()}>{}</div>
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  )
}
