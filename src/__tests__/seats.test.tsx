import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import { Seats } from '../components/Seats';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router } from 'react-router-dom';

// stack overflow workaround to mocking problem
window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};

it('should render Seat component', () => {
	const history = createMemoryHistory();

	const { getByTestId } = render(
		<Provider store={store}>
			<Router history={history}>
				<Seats seatsItems={[]} />
			</Router>
		</Provider>
	);
	const validElement = getByTestId('mainContainer');
	expect(validElement).toBeInTheDocument();
});
