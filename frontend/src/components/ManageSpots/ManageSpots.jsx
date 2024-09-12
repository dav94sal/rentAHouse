import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRevalidator } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import SpotTile from "../HomePage/SpotTile";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import './ManageSpots.css'

function ManageSpots () {
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  useEffect(() => {
    dispatch(getUserSpots())
    .then(() => setIsLoading(true))
  }, [dispatch]);

    const userSpots = useSelector(state => state.spots.current)
    const spotArr = Object.values(userSpots);
    spotArr.reverse();

  useEffect(() => {
    if (reload) {
      revalidator.revalidate()
    }
  }, [reload, revalidator])
  // const handleModalClose = () => {
  //   // setIsLoading(false)
  //   dispatch(getUserSpots())
  // }

  return (
    <>
      <h1>Manage Your Spots</h1>
      <Link to='/spots/new'>
        <button>Create a New Spot</button>
      </Link>

      <div className="manage-spots-container">
        {isLoading &&
          spotArr.map((spot) => (
            <div className='update-spot-container' key={spot.id}>
              <SpotTile spot={spot}/>
              <div className="spot-tile-buttons">
                <Link to={`/spots/${spot.id}/edit`}>
                  <button>
                      Update
                  </button>
                  </Link>

                <OpenModalButton
                  buttonText='Delete'
                  modalComponenet={<DeleteSpotModal spotId={spot.id}/>}
                  onModalClose={() => setReload(true)}
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
