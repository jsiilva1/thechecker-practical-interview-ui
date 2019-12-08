import axios from 'axios';

import { createReducer } from '../helpers/createDynamicReducer';

/*
 * Action Types
 * */
export const Types = {
  LIST_REQUEST: 'LISTS/REQUEST',
  LISTS_FETCHED: 'LISTS/FETCHED',
  LISTS_FAILED: 'LISTS/FAILED',
  GET_ERRORS: 'GET_ERRORS',
};

/*
 * Initial State
 * */
const initialState = {
  lists: [],
  isLoading: false,
  error: null,
};

/*
 * Reducer
 */
export default createReducer(initialState, {
  [Types.LIST_REQUEST]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [Types.LISTS_FETCHED]: (state, action) => ({
    ...state,
    isLoading: false,
  }),
  [Types.LISTS_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),
});

/*
 * Action Creators
 * */
// Lists ACTION
export const getLists = (dispatch, getState) => {
};