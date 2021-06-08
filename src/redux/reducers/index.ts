import { combineReducers } from 'redux';
import { seatsReducer } from './seatsReducer';
export default combineReducers({ seats: seatsReducer });
