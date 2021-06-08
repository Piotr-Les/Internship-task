import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ISeat } from './reducers/seatsReducer';

export interface IGlobalState {
	form: {
		nextToEachOther: boolean;
		numberOfSeats: number;
	};
	seats: {
		loading: boolean;
		seats: ISeat[];
		error: string;
	};
}

const middleware = [thunk];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
