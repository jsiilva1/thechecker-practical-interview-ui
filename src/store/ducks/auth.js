import axios from 'axios';

import { createReducer } from '../helpers/createDynamicReducer';

/*
 * Action Types
 * */
export const Types = {
  MAILCHIMP_OAUTH_LOGIN_REQUEST: 'MAILCHIMP_AUTH/REQUEST',
  MAILCHIMP_OAUTH_LOGIN_SUCCESS: 'MAILCHIMP_AUTH/SUCCESS',
  MAILCHIMP_OAUTH_LOGIN_FAILED: 'MAILCHIMP_AUTH/FAILED',
  MAILCHIMP_OAUTH_LOGOUT: 'MAILCHIMP_AUTH/LOGOUT',
};

/*
 * Initial State
 * */
const initialState = {
  access_token: '',
  user: {},
  isLogged: false,
  isLoading: false,
  error: null,
};

/*
 * Reducer
 */
export default createReducer(initialState, {
  [Types.MAILCHIMP_OAUTH_LOGIN_REQUEST]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [Types.MAILCHIMP_OAUTH_LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    isLogged: true,
    user: {},
    access_token: action.payload.access_token,
    isLoading: false,
  }),
  [Types.MAILCHIMP_OAUTH_LOGIN_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),
});

/*
 * Action Creators
 * */
// Login ACTION
export const mailchimpLogin = data => (dispatch, getState) => {
  dispatch({ type: Types.MAILCHIMP_OAUTH_LOGIN_REQUEST, payload: data });

  axios
    .post('http://localhost:5000/api/v1/mailchimp/authorize', data)
    .then((res) => {
      // Get token from response and save localStorage
      const { access_token } = res.data.data;
      
      if (access_token !== undefined) {
        localStorage.setItem('access_token', access_token);
      } else {
        throw new Error();
      }
      
      dispatch(setAccessToken(access_token));
      // getCurrentUser().then(user => dispatch(setCurrentUser(user.data.data)));
    })
    .catch((err) => {
      dispatch({
        type: Types.MAILCHIMP_OAUTH_LOGIN_FAILED,
        payload: err,
        error: true,
      });
    });
};

// Set logged user ACTION
export const setAccessToken = accessToken => ({
  type: Types.MAILCHIMP_OAUTH_LOGIN_SUCCESS,
  payload: {
    access_token: accessToken,
  },
});