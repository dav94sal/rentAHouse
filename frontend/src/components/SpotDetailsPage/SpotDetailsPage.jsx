import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { getSpotReviews, resetReviews } from "../../store/reviews";
import { FaStar } from "react-icons/fa";
import Reviews from './Reviews';
import './SpotDetails.css';

function SpotDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotDetails(spotId))
      .then(() => dispatch(getSpotReviews(spotId)))
      .then(() => setIsLoading(true))

    dispatch(resetReviews())
  }, [spotId, dispatch])

  const spot = useSelector(state => state.spots[spotId])
  const userId = useSelector(state => state.session.user.id)
  let reviews = useSelector(state => state.reviews)
  reviews = Object.values(reviews)

  const isOwnSpot = () => {
    if (spot.ownerId === userId) return true;
    return false;
  }

  return (
    <div className='spot-details-container'>
      {isLoading &&
        <>
          <h1>{spot?.name}</h1>
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
              <p>
                <FaStar />
                {spot.numReviews? ` ${spot.avgStarRating} | ${spot.numReviews}` : ` new`}
              </p>
              <button id='reserve-button'>Reserve</button>
            </div>
          </div>

          <div className='reviews-container'>
            <h2>
              <FaStar />
              {spot.numReviews? ` ${spot.avgStarRating} | ${spot.numReviews}` : ` new`}
            </h2>
            {isOwnSpot()?
              '' :
              <button>Post Your Review</button>
            }
            {reviews.length?
              reviews.map(review => (
                <Reviews review={review} key={`review: ${review.id}`}/>
              )) : isOwnSpot()? '' :
              <div>
                <p>Be the first to post a review!</p>
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}

export default SpotDetailsPage;
