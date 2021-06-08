import {
	FETCH_SEATS_REQUEST,
	FETCH_SEATS_SUCCESS,
	FETCH_SEATS_ERROR,
} from './seatsActionTypes';
import { ISeat } from '../reducers/seatsReducer';

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
