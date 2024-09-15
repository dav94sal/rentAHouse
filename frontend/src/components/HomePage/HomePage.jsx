import { useSelector } from 'react-redux';
import SpotTile from './SpotTile';
import './HomePage.css';

function HomePage() {
  const spots = useSelector(state => state.spots);

  const spotsArr = Object.values(spots);
  spotsArr.reverse();

  return (
    <div className='spots-container' key={"spot-container"}>
      {spotsArr.map(spot => (
        <>
          {spot.id && <SpotTile spot={spot} key={spot.id}/>}
        </>
      ))}

    </div>
  )
}

export default HomePage;
