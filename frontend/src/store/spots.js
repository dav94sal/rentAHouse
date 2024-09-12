import { csrfFetch } from "./csrf";

const POPULATE = 'spot/populate';
const ADD_ONE = 'spot/add_one';
const USER = 'spot/user';
const REMOVE = 'spot/remove';

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

export const removeSpot = (spotId) => {
  return {
    type: REMOVE,
    spotId
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
    dispatch(addSpot(spot));
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

export const updateSpot = (spotObj, spotId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      body: JSON.stringify({...spotObj.spot})
    })

    if (response.ok) {
      const newSpot = await response.json();
      dispatch(addSpot(newSpot));
      return newSpot;
    }
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
}

export const deleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })

  // console.log(response)

  if (response.ok) {
    dispatch(removeSpot(spotId))
  }
}

const initialState = {current: {}};

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE: {
      const newState = {...state, ...state.current};
      action.allSpots.Spots.map((spot) => {
        newState[spot.id] = spot
      })
      return newState;
    }
    case ADD_ONE: {
      const newState = {...state, ...state.current};
      newState[action.newSpot.id] = action.newSpot;
      return newState;
    }
    case USER: {
      const newState = {...state};
      action.spots.map(spot => {
        newState.current[spot.id] = spot;
      })
      return newState;
    }
    case REMOVE: {
      const newState = {...state, ...state.current};
      delete newState[action.spotId];
      delete newState.current[action.spotId];
      return {...newState};
    }
    default:
      return state;
  }
}
