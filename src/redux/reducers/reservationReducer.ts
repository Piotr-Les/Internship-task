import { RESERVE_SEATS } from '../actions/reservationActionTypes';
import { ISeat } from './seatsReducer';

interface IInitialState {
	reservedSeats: ISeat[];
}
const initialState: IInitialState = {
	reservedSeats: [],
};

type ReserveAction = {
	type: typeof RESERVE_SEATS;
	payload: ISeat[];
};

export const reservationReducer = (state = initialState, action: ReserveAction) => {
	switch (action.type) {
		case RESERVE_SEATS:
			return {
				reservedSeats: action.payload,
			};
		default:
			return state;
	}
};
