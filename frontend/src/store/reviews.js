const ADD_REVIEWS = 'reviews/add_reviews'
const RESET = 'reviews/reset'

// action creators
export const addSpotReviews = (reviews) => {
  return {
    type: ADD_REVIEWS,
    reviews
  }
}

export const resetReviews = () => {
  return {
    type: RESET,
  }
}

// thunk action creators
export const getSpotReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const reviews = await response.json();
    dispatch(addSpotReviews(reviews))
  }
}

const initialState = {}

// reducer
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEWS: {
      const newState = {...state}
      action.reviews.Reviews.map(review => {
        newState[review.id] = review;
      })
      return newState;
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
}
