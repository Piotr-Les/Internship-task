import {
	FETCH_SEATS_REQUEST,
	FETCH_SEATS_SUCCESS,
	FETCH_SEATS_ERROR,
} from './seatsActionTypes';
import { ISeat } from '../reducers/seatsReducer';
import { Dispatch } from 'redux';

export const fetchSeatsRequest = () => ({
	type: FETCH_SEATS_REQUEST,
});

export const fetchSeatsSuccess = (seats: ISeat[]) => ({
	type: FETCH_SEATS_SUCCESS,
	payload: seats,
});

export const fetchSeatsError = (error: string) => ({
	type: FETCH_SEATS_ERROR,
	payload: error,
});

export const fetchSeats = () => async (dispatch: Dispatch) => {
	dispatch(fetchSeatsRequest());
	const response = await fetch('http://localhost:3000/seats');
	try {
		const seats = await response.json();
		dispatch(fetchSeatsSuccess(seats));
	} catch (error) {
		const errorMsg = error.message;
		dispatch(fetchSeatsError(errorMsg));
	}
};
