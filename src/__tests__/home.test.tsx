import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Home } from '../components/Home';
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

it('should render Home component', () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Home />
		</Provider>
	);
	const validElement = getByTestId('form');
	expect(validElement).toBeInTheDocument();
});

describe('Number of seats input', () => {
	const InputValues = [1, 5, 20, 30];

	it.each(InputValues)('should update value on change event', argument => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Home />
			</Provider>
		);
		const inputElement = getByTestId('inputNumber') as HTMLInputElement;

		fireEvent.change(inputElement, { target: { value: argument } });
		expect(parseInt(inputElement.value)).toBe(argument);
	});
});
