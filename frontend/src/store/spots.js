// import { csrfFetch } from "./csrf";

const POPULATE = 'spot/populate';
const DETAILS = 'spot/details';

// action creators
export const populateSpots = (allSpots) => {
  return {
    type: POPULATE,
    allSpots
  }
}

export const spotDetails = (spot) => {
  return {
    type: DETAILS,
    spot
  }
}

// thunk action creators
export const getAllSpots = () => async dispatch => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const spots = await response.json()
    dispatch(populateSpots(spots))
  }
}

export const getSpotDetails = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetails(spot));
    return spot;
  }
}

const initialState = {};

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE: {
      const newState = {...state};
      action.allSpots.Spots.map((spot) => {
        const id = spot.id;
        newState[id] = spot
      })
      return newState;
    }
    case DETAILS: {
      const newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
    }
    default:
      return state;
  }
}
