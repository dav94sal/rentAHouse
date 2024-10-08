import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponenet, buttonText, onButtonClick, onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    setOnModalClose(onModalClose);
    setModalContent(modalComponenet);
    if (typeof onButtonClick === 'function') onButtonClick();
  }

  return <button
            className="submit-button disabled"
            onClick={onClick}>{buttonText}
          </button>
}

export default OpenModalButton;
