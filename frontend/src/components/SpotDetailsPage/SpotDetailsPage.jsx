import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { getSpotReviews, resetReviews } from "../../store/reviews";
import { FaStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import PostReviewModal from '../PostReviewModal/PostReviewModal';
import Reviews from './Reviews';
import DeleteModal from '../DeleteModal/DeleteModal';
import './SpotDetails.css';

function SpotDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewLabel, setReviewLabel] = useState('')
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  let reviews = useSelector(state => state.reviews)
  reviews = Object.values(reviews)
  reviews.reverse();

  useEffect(() => {
    dispatch(getSpotDetails(spotId))
      .then(() => dispatch(getSpotReviews(spotId)))
      .then(() => setIsLoading(true))

    dispatch(resetReviews())
  }, [spotId, dispatch])

  useEffect(() => {
    if (reviews.length === 1) setReviewLabel('Review')
    if (reviews.length > 1) setReviewLabel('Reviews')
  })

  const hasReview = () => {
    if (!user) return false
    for (let i = 0; i < reviews.length; i++) {
      const rev = reviews[i];
      if (rev.userId === user.id) return rev.id
    }
    return false;
  }

  const canPostReview = () => {
    if (!user) return false;
    if (spot.ownerId === user.id) return false;
    if (hasReview()) return false;

    return true;
  }

  const reviewRating = () => {
    return (
      <>
        {` ${spot.avgStarRating}`} &middot; {`${spot.numReviews}`} {`${reviewLabel}`}
      </>
    )
    // return (<p>
    //   {` ${spot.avgStarRating}`} &middot; {`${spot.numReviews}`} {`${reviewLabel}`}
    // </p>)
  }

  return (
    <div className='spot-details-container'>
      {isLoading &&
        <>
          <h1>{spot?.name}</h1>
          <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>

          <div className='images-container'>
            {spot.SpotImages.map((image, i) => (
              <img src={image.url} key={image.id} id={`img-${i + 1}`} />
            ))}
          </div>

          <div className='details-container'>
            <div className='name-description-container'>
              <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
              <p>{spot.description}</p>
            </div>

            <div className='reserve-container'>
              <p>{`$${spot.price} night`}</p>

              <div className='reserve-reviews-container'>
                <FaStar />
                <p>
                  {spot.numReviews? reviewRating() : ` new`}
                </p>
              </div>

              <button
                id='reserve-button'
                className='submit-button'
                onClick={() => alert('Feature Coming Soon')}
              >
                Reserve
              </button>
            </div>
          </div>

          <div className='reviews-container'>
            <h2>
              <FaStar />
              {spot.numReviews? reviewRating() : ` new`}
            </h2>
            {canPostReview()?
              <OpenModalButton
                buttonText='Post Your Review'
                modalComponenet={<PostReviewModal spotId={spotId}/>}
              /> : ''
            }
            {reviews.length?
              reviews.map(review => (
                <div key={`review: ${review.id}`}>
                  <Reviews review={review} />
                  {hasReview() && hasReview() === review.id?
                    <OpenModalButton
                      buttonText='Delete'
                      modalComponenet={<DeleteModal type={'review'} id={review.id}/>}
                    /> : ''
                  }
                </div>
              )) : canPostReview()?
              <div>
                <p>Be the first to post a review!</p>
              </div> : ''
            }
          </div>
        </>
      }
    </div>
  )
}

export default SpotDetailsPage;
