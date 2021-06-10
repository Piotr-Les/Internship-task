import { RESERVE_SEATS } from '../actions/reservationActionTypes';
import { ISeat } from '../reducers/seatsReducer';

export const reserveSeats = (value: ISeat[]) => ({
	type: RESERVE_SEATS,
	payload: value,
});
