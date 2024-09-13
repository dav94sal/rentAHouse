import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { postReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './PostReview.css';

function PostReviewModal({spotId}) {
  const [review, setReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  useEffect(() => {
    console.log(errors)
  }, [errors])

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
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors)
      })
  }

  return (
    <div>
      <h1>How was your stay?</h1>
      <p className="errors">{errors?.review || errors?.message}</p>
      <input
        type="textArea"
        value={review}
        onChange={e => setReview(e.target.value)}
      />
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
              <FaStar /> :
              <FaRegStar />
            }
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Your Review</button>
    </div>
  )
}

export default PostReviewModal;
