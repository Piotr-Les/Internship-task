import { FC, useEffect, useState } from 'react';
import { Typography, List } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ISeat } from '../redux/reducers/seatsReducer';
import { IGlobalState } from '../redux/store';

const { Title, Text } = Typography;

const MainContainer = styled.div`
	padding: 10px;
	width: 100%;
	height: 100vh;
	background-color: #ddd;
	overflow-y: auto;
`;

const ReservationDetails: FC = () => {
	const [reservedSeats, setReservedSeats] = useState<ISeat[]>([]);
	const seats = useSelector<IGlobalState, ISeat[]>(
		state => state.reservation.reservedSeats
	);
	useEffect(() => {
		setReservedSeats(seats);
	}, []);
	return (
		<MainContainer data-testid="reservation">
			{reservedSeats.length > 0 ? (
				<>
					<Title level={2}>Twoja rezerwacja przebiegła pomyślnie!</Title>
					<Text>Wybrałeś {reservedSeats.length > 1 ? 'miejsca' : 'miejsce'}:</Text>
					<List
						size="small"
						split={false}
						dataSource={reservedSeats}
						renderItem={(seat: ISeat) => (
							<List.Item key={seat.id}>
								- rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})
							</List.Item>
						)}
					/>

					<Title level={3}>
						Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.
					</Title>
				</>
			) : (
				<Title level={2}>Wystąpił problem z twoją rezerwacją</Title>
			)}
		</MainContainer>
	);
};

export { ReservationDetails };
