import { csrfFetch } from "./csrf";

const POPULATE = 'spot/populate'

// action creators
export const populateSpots = (allSpots) => {
  return {
    type: POPULATE,
    allSpots
  }
}

// thunk action creators
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json()
    dispatch(populateSpots(spots))
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

    default:
      return state;
  }
}
