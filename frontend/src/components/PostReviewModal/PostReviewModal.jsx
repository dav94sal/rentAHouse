import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './PostReview.css';
import { useState } from "react";

function PostReviewModal() {
  return (
    <div>
      <h1>How was your stay?</h1>
      <input type="textArea" />
      <StarRating />
      <button>Submit Your Review</button>
    </div>
  )
}

function StarRating({maxRating = 5}) {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <div className="star-container">
      {[...Array(maxRating)].map((_, i) => (
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
  )
}

export default PostReviewModal;
