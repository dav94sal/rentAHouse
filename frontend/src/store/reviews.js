import { csrfFetch } from './csrf.js';

const ADD_REVIEWS = 'reviews/add_reviews'
const ADD_ONE = 'reviews/add_one'
const REMOVE_ONE = 'reviews/remove_one'
const RESET = 'reviews/reset'

// action creators
export const addSpotReviews = (reviews) => {
  return {
    type: ADD_REVIEWS,
    reviews
  }
}

export const addReview = (review) => {
  return {
    type: ADD_ONE,
    review
  }
}

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_ONE,
    reviewId
  }
}

export const resetReviews = () => {
  return {
    type: RESET,
  }
}

// thunk action creators
export const getSpotReviews = spotId => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const reviews = await response.json();
    dispatch(addSpotReviews(reviews))
  }
}

export const postReview = reviewObj => async dispatch => {
  const response = await csrfFetch(`/api/spots/${reviewObj.spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewObj.Review)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review))
  }
}

export const deleteReview = reviewId => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeReview(reviewId))
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
    case ADD_ONE: {
      const newState = {...state}
      newState[action.review.id] = action.review
      return newState;
    }
    case REMOVE_ONE: {
      const newState = {...state};
      delete newState[action.reviewId]
      return {...newState};
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
}
