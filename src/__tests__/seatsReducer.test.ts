import { seatsReducer, ISeatApiDataState } from '../redux/reducers/seatsReducer';

describe('seat reducer', () => {
	const initialState: ISeatApiDataState = {
		loading: false,
		seats: [],
		error: '',
	};

	it('should return initial state with loading set to true when action is FETCH_SEATS_REQUEST', () => {
		const reducer = seatsReducer(initialState, {
			type: 'FETCH_SEATS_REQUEST',
		});
		expect(reducer).toEqual({ ...initialState, loading: true });
	});

	it('should return state with error set to errorMsg when action is FETCH_SEATS_ERROR', () => {
		const reducer = seatsReducer(initialState, {
			type: 'FETCH_SEATS_ERROR',
			payload: 'errorMsg',
		});
		expect(reducer).toEqual({
			loading: false,
			seats: [],
			error: 'errorMsg',
		});
	});

	const seat = {
		id: 's02',
		cords: {
			x: 0,
			y: 2,
		},
		reserved: false,
	};

	it('should return state with seats when action type is FETCH_SEATS_SUCCESS', () => {
		const reducer = seatsReducer(initialState, {
			type: 'FETCH_SEATS_SUCCESS',
			payload: [seat],
		});
		expect(reducer).toEqual({
			loading: false,
			seats: [seat],
			error: '',
		});
	});
});
