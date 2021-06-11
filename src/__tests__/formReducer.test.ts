import { formReducer, IFormState } from '../redux/reducers/formReducer';

describe('form reducer', () => {
	const initialState: IFormState = {
		numberOfSeats: 1,
		nextToEachOther: false,
	};
	const newState: IFormState = {
		numberOfSeats: 5,
		nextToEachOther: true,
	};

	it('should return new state', () => {
		const reducer = formReducer(initialState, {
			type: 'FORM_SUBMIT',
			payload: newState,
		});
		expect(reducer).not.toEqual(initialState);
		expect(reducer).toEqual(newState);
	});
});
