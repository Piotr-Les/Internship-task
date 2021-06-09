import { useDispatch, useSelector } from 'react-redux';
import { IGlobalState } from './redux/store';
import { Home } from './components/Home';
import { Seats } from './components/Seats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { fetchSeats } from './redux/actions/seatsActions';
import { ISeat } from './redux/reducers/seatsReducer';

const GlobalStyle = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		overflow: hidden;
	}
`;

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSeats());
	}, []);

	const seatsItems = useSelector<IGlobalState, ISeat[]>(state => state.seats.seats);
	return (
		<>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/seats">
						<Seats seatsItems={seatsItems} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
