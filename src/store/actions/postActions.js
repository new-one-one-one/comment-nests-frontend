import axios from 'axios';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
} from '../constants';
import { getTokenFromLocalStorage } from '../../utils/helpers';

const POST_BASE_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/post`

const getAllPostsRequest = () => ({ type: GET_ALL_POSTS_REQUEST });
const getAllPostsSuccess = (posts) => ({ type: GET_ALL_POSTS_SUCCESS, payload: posts });
const getAllPostsFailure = (error) => ({ type: GET_ALL_POSTS_FAILURE, error });

export const getAllPosts = () => async (dispatch, getState) => {
  dispatch(getAllPostsRequest());

  try {
    const token = getState()?.auth.token || getTokenFromLocalStorage("jwtToken") ; 

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const response = await axios.get(POST_BASE_URL+'/all', config);
    dispatch(getAllPostsSuccess(response.data));
  } catch (error) {
    dispatch(getAllPostsFailure({
        message: error.message,
        status: error.response.status,
        text: error.response.statusText
    }));
  }
};
