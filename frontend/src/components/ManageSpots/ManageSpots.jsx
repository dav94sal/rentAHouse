import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserSpots } from "../../store/spots";

function ManageSpots () {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])

  return (
    <>
      <h1>Manage Your Spots</h1>
      <button>Create a New Spot</button>

      <div className="spots-container">

      </div>
    </>
  )
}

export default ManageSpots;
