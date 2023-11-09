// src/redux/auth/actions.js
import axios from 'axios';
import { AUTH } from '../constants';
import { storeTokenInLocalStorage } from '../../utils/helpers';

const {
    LOGIN,
    LOGOUT,
    REGISTER
} = AUTH;

const AUTH_BASE_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth`

export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(AUTH_BASE_URL+'/register', formData);
    const { token } = response.data;
    dispatch({ type: REGISTER.SUCCESS, payload: { 
      token, 
      email: formData.email
    }});
    storeTokenInLocalStorage(token)
  } catch (error) {
    dispatch({ type: REGISTER.FAILURE, payload: {
      message: error.message,
      status: error.response.status,
      text: error.response.statusText
    }});
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(AUTH_BASE_URL+'/login', formData);
    const { token } = response.data;
    dispatch({ type: LOGIN.SUCCESS, payload: {token , email: formData.email} });
    storeTokenInLocalStorage(token)
  } catch (error) {
    dispatch({ type: LOGIN.FAILURE, payload: {
      message: error.message,
      status: error.response.status,
      text: error.response.statusText
    }});
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: AUTH.CLEAR_ERROR
  })
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
