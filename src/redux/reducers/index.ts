import { combineReducers } from 'redux';
import { seatsReducer } from './seatsReducer';
import { formReducer } from './formReducer';
export default combineReducers({ seats: seatsReducer, form: formReducer });
