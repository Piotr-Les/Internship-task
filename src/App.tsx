import { Provider } from 'react-redux';
import store from './redux/store';
import { Home } from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`;

function App() {
	return (
		<Provider store={store}>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
