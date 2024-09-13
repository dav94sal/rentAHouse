import { useEffect, useState } from "react";

function Reviews({ review }) {
  // const [isLoading, setIsLoading] = useState(false);
  const date = new Date(review.createdAt)
  const month = date.getMonth();
  const year = date.getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'Decemeber'
  ]

  useEffect(() => {

  })

  return (
    <div>
      {/* {isLoading && */}
        <>
          <h3>{review.User.firstName}</h3>
          <p>{`${months[month - 1]} ${year}`}</p>
          <p>{review.review}</p>
        </>
      {/* } */}
    </div>
  )
}

export default Reviews;
