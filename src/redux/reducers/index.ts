import { combineReducers } from 'redux';
import { seatsReducer } from './seatsReducer';
import { formReducer } from './formReducer';
import { reservationReducer } from './reservationReducer';
export default combineReducers({
	seats: seatsReducer,
	form: formReducer,
	reservation: reservationReducer,
});
