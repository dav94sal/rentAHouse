import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import './DeleteSpot.css'

function DeleteSpotModal({spotId}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleYes = e => {
    e.preventDefault();

    dispatch(deleteSpot(spotId))
      .then(closeModal)
  }

  const handleNo = e => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div className='delete-spot container'>
      <h1>Confirm Delete</h1>
      <p>
        Are you sure you want to remove this spot
        from the listings?
      </p>
      <button
        onClick={handleYes}
      >
        Yes (Delete Spot)
      </button>
      <button
        onClick={handleNo}
      >
        No (Keep Spot)
      </button>
    </div>
  )
}

export default DeleteSpotModal;
