import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSpots } from "../../store/session";
import SpotTile from "../HomePage/SpotTile";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import './ManageSpots.css'

function ManageSpots () {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSpots())
    .then(() => setIsLoading(true))

    setIsLoading(false)
  }, [dispatch]);

  const userSpots = useSelector(state => state.session.spots)
  const spotArr = Object.values(userSpots);
  spotArr.reverse();

  return (
    <>
      <h1>Manage Your Spots</h1>
      <Link to='/spots/new'>
        <button className="submit-button disabled">Create a New Spot</button>
      </Link>

      <div className="manage-spots-container">
        {isLoading &&
          spotArr.map((spot) => (
            <div className='update-spot-container' key={spot.id}>
              <SpotTile spot={spot}/>
              <div className="spot-tile-buttons">
                <Link to={`/spots/${spot.id}/edit`}>
                  <button className="submit-button disabled">
                      Update
                  </button>
                  </Link>

                <OpenModalButton
                  buttonText='Delete'
                  modalComponenet={<DeleteModal type={'spot'} id={spot.id}/>}
                />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ManageSpots;
