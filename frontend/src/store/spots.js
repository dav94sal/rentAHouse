import { csrfFetch } from "./csrf";

const POPULATE = 'spot/populate';
const ADD_ONE = 'spot/add_one';
const USER = 'spot/user';

// action creators
export const populateSpots = (allSpots) => {
  return {
    type: POPULATE,
    allSpots
  }
}

export const addSpot = (newSpot) => {
  return {
    type: ADD_ONE,
    newSpot
  }
}

export const userSpots = (spots) => {
  return {
    type: USER,
    spots
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
    dispatch(addSpot(spot.Spots));
    return spot;
  }
}

export const getUserSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const spots = await response.json();
    dispatch(userSpots(spots.Spots))
  }
}

export const postSpot = (spotObj) => async dispatch => {

  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify({...spotObj.spot})
    })

    // console.log("response: ", response);
    if (response.ok) {
      const newSpot = await response.json();
      dispatch(addSpot(newSpot));

      const images = Object.values(spotObj.images)

      images.forEach(async img => {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: 'POST',
          body: JSON.stringify({ ...img })
        })
      });

      return newSpot;
    }
  } catch (error) {
    // let err = await error.json()
    console.log("error: ", error);
    return error;
  }
}

const initialState = {current: {}};

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE: {
      const newState = {...state};
      action.allSpots.Spots.map((spot) => {
        newState[spot.id] = spot
      })
      return newState;
    }
    case ADD_ONE: {
      const newState = {...state};
      newState[action.newSpot.id] = action.newSpot;
      return newState;
    }
    case USER: {
      const newState = {...state};
      action.spots.map((spot, i) => {
        newState.current[i + 1] = spot;
      })
      return newState;
    }
    default:
      return state;
  }
}
