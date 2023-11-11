// store/commentActions.js
import axios from 'axios';
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
import { getTokenFromLocalStorage } from '../../utils/helpers';

const getCommentsRequest = () => ({ type: GET_COMMENTS_REQUEST });
const getCommentsSuccess = (comments) => ({ type: GET_COMMENTS_SUCCESS, payload: comments });
const getCommentsFailure = (error) => ({ type: GET_COMMENTS_FAILURE, payload: error });

const createCommentRequest = () => ({ type: CREATE_COMMENT_REQUEST });
const createCommentSuccess = (comments) => ({ type: CREATE_COMMENT_SUCCESS, payload: comments });
const createCommentFailure = (error) => ({ type: CREATE_COMMENT_FAILURE, payload: error });

const updateCommentRequest = () => ({ type: UPDATE_COMMENT_REQUEST });
const updateCommentSuccess = (comments) => ({ type: UPDATE_COMMENT_SUCCESS, payload: comments });
const updateCommentFailure = (error) => ({ type: UPDATE_COMMENT_FAILURE, payload: error });

const deleteCommentRequest = () => ({ type: DELETE_COMMENT_REQUEST });
const deleteCommentSuccess = (commentId) => ({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
const deleteCommentFailure = (error) => ({ type: DELETE_COMMENT_FAILURE, payload: error });

const COMMENT_BASE_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/comment`

export const fetchComments = (postId) => async (dispatch, getState) => {
  dispatch(getCommentsRequest());

  try {
    const token = getState()?.auth.token || getTokenFromLocalStorage("jwtToken");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios.get(COMMENT_BASE_URL+`/post/${postId}`, config);
    dispatch(getCommentsSuccess(response.data));
  } catch (error) {
    dispatch(getCommentsFailure(error));
  }
};

/**
 * 
 * @param {*} commentData { 
 *  text: comment Data, 
 *  user: objectId, 
 *  post: ObjectId of post, 
 * parentComment: ObjectId of parrentComment  } 
 * @returns 
 */
export const createComment = (commentData) => async (dispatch, getState) => {
  dispatch(createCommentRequest());

  try {
    const token = getState()?.auth.token || getTokenFromLocalStorage("jwtToken");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios.post(COMMENT_BASE_URL+'/create', commentData, config);
    dispatch(createCommentSuccess([response.data]));
  } catch (error) {
    dispatch(createCommentFailure(error));
  }
};

export const updateComment = (commentId, updatedData) => async (dispatch, getState) => {
  dispatch(updateCommentRequest());

  try {
    const token = getState()?.auth.token || getTokenFromLocalStorage("jwtToken");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios.put(COMMENT_BASE_URL+`/${commentId}`, updatedData, config);
    dispatch(updateCommentSuccess([response.data]));
  } catch (error) {
    dispatch(updateCommentFailure(error));
  }
};

export const deleteComment = (commentId) => async (dispatch, getState) => {
  dispatch(deleteCommentRequest());

  try {
    const token = getState()?.auth.token || getTokenFromLocalStorage("jwtToken");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    await axios.delete(COMMENT_BASE_URL+`/${commentId}`, config);
    dispatch(deleteCommentSuccess(commentId));
  } catch (error) {
    dispatch(deleteCommentFailure(error));
  }
};
