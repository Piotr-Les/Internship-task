import {
	FETCH_SEATS_REQUEST,
	FETCH_SEATS_SUCCESS,
	FETCH_SEATS_ERROR,
} from '../actions/seatsActionTypes';

export interface ICords {
	x: number;
	y: number;
}
export interface ISeat {
	id: string;
	cords: ICords;
	reserved: boolean;
}
interface IInitialState {
	loading: boolean;
	seats: ISeat[];
	error: string;
}
type FetchRequestAction = {
	type: typeof FETCH_SEATS_REQUEST;
};
type FetchSuccessAction = {
	type: typeof FETCH_SEATS_SUCCESS;
	payload: ISeat[];
};
type FetchErrorAction = {
	type: typeof FETCH_SEATS_ERROR;
	payload: string;
};

type Action = FetchRequestAction | FetchSuccessAction | FetchErrorAction;

const initialState: IInitialState = {
	loading: false,
	seats: [],
	error: '',
};

export const seatsReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case FETCH_SEATS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_SEATS_SUCCESS:
			return {
				loading: false,
				seats: action.payload,
				error: '',
			};
		case FETCH_SEATS_ERROR:
			return {
				loading: false,
				seats: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
