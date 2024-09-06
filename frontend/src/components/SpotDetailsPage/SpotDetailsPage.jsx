import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { FaStar } from "react-icons/fa";
import Reviews from './Reviews';
import './SpotDetails.css';

function SpotDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotDetails(spotId)).then(() => setIsLoading(true))
  }, [spotId, dispatch])

  const spot = useSelector(state => state.spots[spotId])

  return (
    <div className='spot-details-container'>
      {isLoading &&
        <>
          <h1>{spot.name}</h1>
          <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>

          <div className='images-container'>
            {spot.SpotImages.map((image) => (
              <img src={image.url} key={image.id} />
            ))}
          </div>

          <div className='details-container'>
            <div className='name-description-container'>
              <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
              <p>{spot.description}</p>
            </div>

            <div className='reserve-container'>
              <p>{`$${spot.price} night`}</p>
              <p><FaStar /> {` ${spot.avgStarRating} | ${spot.numReviews}`} </p>
              <button id='reserve-button'>Reserve</button>
            </div>
          </div>

          <div className='reviews-container'>
            <h2><FaStar /> {` ${spot.avgStarRating} | ${spot.numReviews}`} </h2>
            <Reviews />
          </div>
        </>
      }
    </div>
  )
}

export default SpotDetailsPage;
