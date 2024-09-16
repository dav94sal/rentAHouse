import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotTile from './SpotTile';
import './HomePage.css';

function HomePage() {
  const [isLoading, setIsLoading] = useState();
  const spots = useSelector(state => state.spots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoading(true))
  }, [dispatch])

  const newSpots = {...spots, current: {...spots.current}}
  delete newSpots.current;
  const spotsArr = Object.values(newSpots);
  spotsArr.reverse();

  return (
    <div className='spots-container' key={"home-spot-container"}>
      {isLoading && spotsArr.map(spot => (
        <>
          {spot && <SpotTile spot={spot} key={spot.id}/>}
        </>
      ))}

    </div>
  )
}

export default HomePage;
