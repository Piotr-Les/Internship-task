import { FORM_SUBMIT } from '../actions/formActionTypes';
export interface IFormState {
	numberOfSeats: number;
	nextToEachOther: boolean;
}
const initialState: IFormState = {
	numberOfSeats: 1,
	nextToEachOther: false,
};

type SubmitAction = {
	type: typeof FORM_SUBMIT;
	payload: IFormState;
};

export const formReducer = (state = initialState, action: SubmitAction): IFormState => {
	switch (action.type) {
		case FORM_SUBMIT:
			return {
				numberOfSeats: action.payload.numberOfSeats,
				nextToEachOther: action.payload.nextToEachOther,
			};
		default:
			return state;
	}
};
