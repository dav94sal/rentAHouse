import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

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

export const login = (credentials) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user))
    return response
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

const initialState = { user: null }

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:{
      const newState = {...state};
      newState.user = action.user;
      return {...action.user};
    }
    case REMOVE_USER:
      return initialState
    default:
      return state;
  }
}
