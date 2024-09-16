import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const USER_SPOTS = 'session/userSpots';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const userSpots = (spots) => {
  return {
    type: USER_SPOTS,
    spots
  }
}

export const login = (credentials) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user))
    dispatch(getUserSpots())
    return response
  }
}

export const signup = newUser => async dispatch => {
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user))
    return response
  }
}

export const logout = () =>async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeUser())
  }
}

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user))
    return user;
  }
}

export const getUserSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const spots = await response.json();
    dispatch(userSpots(spots.Spots))
  }

  return response;
}

const initialState = { user: null, spots: {} }

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:{
      const newState = {...state};
      newState.user = action.user.user;
      return newState;
    }
    case USER_SPOTS: {
      const newState = {...state};
      action.spots.map(spot => {
        newState.spots[spot.id] = spot;
      })
      return newState;
    }
    case REMOVE_USER:
      return {...initialState, spots: {}}
    default:
      return state;
  }

}
