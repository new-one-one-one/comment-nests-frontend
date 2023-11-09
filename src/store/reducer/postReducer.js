import {
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAILURE,
  } from '../constants';
  
  const initialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POSTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_ALL_POSTS_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: action.payload,
        };
  
      case GET_ALL_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default postReducer;
  