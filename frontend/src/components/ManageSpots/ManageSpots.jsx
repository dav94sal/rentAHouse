import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import SpotTile from "../HomePage/SpotTile";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './ManageSpots.css'

function ManageSpots () {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSpots())
    .then(() => setIsLoading(true))
  }, [dispatch])

  const userSpots = useSelector(state => state.spots.current)
  const spotArr = Object.values(userSpots);
  spotArr.reverse();

  return (
    <>
      <h1>Manage Your Spots</h1>
      <Link to='/spots/new'>
        <button>Create a New Spot</button>
      </Link>

      <div className="manage-spots-container">
        {isLoading &&
          <>
            {spotArr.map((spot) => (
              <div key={spot.id}>
                <SpotTile spot={spot}/>
                <div className="spot-tile-buttons">
                  <Link to={`/spots/${spot.id}/edit`}>
                    <button>
                        Update
                    </button>
                   </Link>

                  <button >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        }
      </div>
    </>
  )
}

export default ManageSpots;
