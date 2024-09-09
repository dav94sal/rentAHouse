import { csrfFetch } from "./csrf";

const POPULATE = 'spot/populate';
const DETAILS = 'spot/details';
const ADD_ONE = 'spot/add_one';

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

export const addSpot = (newSpot) => {
  return {
    type: ADD_ONE,
    newSpot
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

export const postSpot = (spot) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot.spot)
  }).catch()

  const newSpot = await response.json();
  if (response.ok) {
    dispatch(addSpot(newSpot));

    const images = Object.values(spot.images)
    images.forEach(async img => {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        body: { img }
      })
    });

  }
  return newSpot;
}

const initialState = {};

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE: {
      const newState = {...state};
      action.allSpots.Spots.map((spot) => {
        newState[spot.id] = spot
      })
      return newState;
    }
    case DETAILS: {
      const newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
    } // Combine DETAILS and ADD_ONE if testing goes well
    case ADD_ONE: {
      const newState = {...state};
      newState[action.newSpot.id] = action.newSpot;
      return newState;
    }
    default:
      return state;
  }
}
