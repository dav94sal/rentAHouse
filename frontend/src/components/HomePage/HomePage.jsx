import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import SpotTile from './SpotTile';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])

  const spots = useSelector(state => state.spots);

  const spotsArr = Object.values(spots);

  return (
    <div className='spots-container'>
      {spotsArr.map(spot => (
          <SpotTile spot={spot} key={spot.id}/>
      ))}
    </div>
  )
}

export default HomePage;
