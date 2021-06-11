import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import { ReservationDetails } from '../components/ReservationDetails';
import { Provider } from 'react-redux';
import store from '../redux/store';

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

it('should render ReservationDetails component', () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<ReservationDetails />
		</Provider>
	);
	const validElement = getByTestId('reservation');
	expect(validElement).toBeInTheDocument();
});
