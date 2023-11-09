import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducer/authReducer';
import postReducer from './reducer/postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;