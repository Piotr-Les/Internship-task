import { RESERVE_SEATS } from '../actions/reservationActionTypes';
import { ISeat } from './seatsReducer';

export interface IReservationState {
	reservedSeats: ISeat[];
}
const initialState: IReservationState = {
	reservedSeats: [],
};

type ReserveAction = {
	type: typeof RESERVE_SEATS;
	payload: ISeat[];
};

export const reservationReducer = (
	state = initialState,
	action: ReserveAction
): IReservationState => {
	switch (action.type) {
		case RESERVE_SEATS:
			return {
				reservedSeats: action.payload,
			};
		default:
			return state;
	}
};
