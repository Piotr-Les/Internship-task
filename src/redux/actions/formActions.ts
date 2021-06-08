import { FORM_SUBMIT } from '../actions/formActionTypes';
import { IFormState } from '../reducers/formReducer';

export const submitForm = (value: IFormState) => ({
	type: FORM_SUBMIT,
	payload: value,
});
