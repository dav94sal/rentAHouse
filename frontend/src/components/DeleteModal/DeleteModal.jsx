import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import { deleteReview } from "../../store/reviews";
import { removeUserSpot } from "../../store/session";
import './DeleteModal.css'

function DeleteModal({type, id}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const manageType = () => {
    let typeObj = {};

    if (type === 'review') {
      typeObj.type = 'review';
      typeObj.text = 'Are you sure you want to delete this review?'
    }

    if (type === 'spot') {
      typeObj.type = 'spot';
      typeObj.text = 'Are you sure you want to remove this spot from the listings?'
    }
    return typeObj;
  }

  const handleYes = e => {
    e.preventDefault();

    if (manageType().type === 'spot') {
      dispatch(deleteSpot(id))
      .then(dispatch(removeUserSpot(id)))
      .then(closeModal)
    }

    if (manageType().type === 'review') {
      dispatch(deleteReview(id))
      .then(closeModal)
    }
  }

  const handleNo = e => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div className='delete-spot container'>
      <h1 id="confirm-delete">Confirm Delete</h1>
      <p>
        {manageType().text}
      </p>
      <button
        onClick={handleYes}
        className="submit-button big-but"
      >
        {`Yes (Delete ${manageType().type})`}
      </button>
      <button
        onClick={handleNo}
        className="submit-button big-but disabled"
      >
        {`No (Keep ${manageType().type})`}
      </button>
    </div>
  )
}

export default DeleteModal;
