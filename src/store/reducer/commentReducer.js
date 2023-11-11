// store/commentReducer.js
import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from '../constants';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case UPDATE_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_COMMENTS_SUCCESS:
    case CREATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        loading: false,
        error: null,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload),
        loading: false,
        error: null,
      };

    case GET_COMMENTS_FAILURE:
    case CREATE_COMMENT_FAILURE:
    case UPDATE_COMMENT_FAILURE:
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;
