function Reviews({ review }) {
  const date = new Date(review.createdAt)
  const month = date.getMonth();
  const year = date.getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'Decemeber'
  ]

  return (
    <div>
      <h3>{review.User.firstName}</h3>
      <p>{`${months[month - 1]} ${year}`}</p>
      <p>{review.review}</p>
    </div>
  )
}

export default Reviews;