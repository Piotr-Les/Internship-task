import {
	reservationReducer,
	IReservationState,
} from '../redux/reducers/reservationReducer';
import { ISeat } from '../redux/reducers/seatsReducer';

describe('reservation reducer', () => {
	const seat = {
		id: 's02',
		cords: {
			x: 0,
			y: 2,
		},
		reserved: false,
	};
	const initialState: IReservationState = {
		reservedSeats: [],
	};
	const payload: ISeat[] = [seat];

	it('should return new state with reserved seats array', () => {
		const reducer = reservationReducer(initialState, {
			type: 'RESERVE_SEATS',
			payload: payload,
		});
		expect(reducer).not.toEqual(initialState);
		expect(reducer).toEqual({ reservedSeats: payload });
	});
});
