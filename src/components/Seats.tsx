import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeats } from '../redux/actions/seatsActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IGlobalState } from '../redux/store';
import { ISeat } from '../redux/reducers/seatsReducer';

const StyledLink = styled(Link)`
	text-align: center;
	display: block;
	margin: 0 auto;
`;

const MainContainer = styled.div`
	width: 100vw;
	height: 95vh;
	display: grid;
	grid-template-columns: 40% 30% 30%;
	grid-template-rows: 50% 50%;
`;

const Group = styled.div`
	margin: 40px;
	background-color: #ddd;
`;

const FirstGroup = styled(Group)`
	grid-row: 1/3;
`;

const Seats: FC = () => {
	const dispatch = useDispatch();
	const seatsItems = useSelector<IGlobalState, ISeat[]>(state => state.seats.seats);

	useEffect(() => {
		dispatch(fetchSeats());
	}, []);
	return (
		<>
			<MainContainer>
				<FirstGroup></FirstGroup>
				<Group></Group>
				<Group></Group>
				<Group></Group>
				<Group></Group>
			</MainContainer>
			<StyledLink to="/">Wróć do wyboru</StyledLink>
		</>
	);
};

export { Seats };
