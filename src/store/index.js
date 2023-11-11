import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducer/authReducer';
import postReducer from './reducer/postReducer';
import commentReducer from './reducer/commentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;