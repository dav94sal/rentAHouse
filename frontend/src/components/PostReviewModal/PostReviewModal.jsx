import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { postReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './PostReview.css';
import { useSession } from "../../context/sessionContext";

function PostReviewModal({spotId}) {
  const [review, setReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [validButton, setValidButton] = useState(false);
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const {setIsLoading} = useSession();

  useEffect(() => {
    if (review.length >= 10 && rating > 0) {
      setValidButton(true);
    } else setValidButton(false)

  }, [review, rating])

  const handleSubmit = e => {
    e.preventDefault()

    const reviewObj = {
      Review: {
        review,
        stars: rating
      },
      spotId
    }

    dispatch(postReview(reviewObj))
      .then(setIsLoading(false))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors)
      })
  }

  return (
    <div className="add-review-container">
      <h1>How was your stay?</h1>
      <p className="errors">{errors?.review || errors?.message}</p>
      <textarea
        rows="7" cols="44"
        type="textArea"
        placeholder="Leave your review here..."
        value={review}
        onChange={e => setReview(e.target.value)}
      >
      </textarea>
      {/* <StarRating /> */}
      <div className="star-container">
        {[...Array(5)].map((_, i) => (
          <div
            key={`star-box${i+1}`}
            className="star-box"
            onMouseEnter={() => setHoverRating(i + 1)}
            onClick={() => setRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            {(i + 1) <= (hoverRating || rating)?
              <FaStar className="star"/> :
              <FaRegStar className="star"/>
            }

          </div>
        ))}
        <p>stars</p>
      </div>
      <button
        className={`submit-button big-but ${validButton? '' : 'disabled'}`}
        onClick={handleSubmit}
        disabled={!validButton}
      >
        Submit Your Review
      </button>
    </div>
  )
}

export default PostReviewModal;
