// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotTile from './SpotTile';
import './HomePage.css';

function HomePage() {
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
