import { FC, MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	MainContainer,
	Group,
	FirstGroup,
	SeatItem,
	SecondRowGroup,
	LegendConteiner,
	StyledLink,
	LegendItem,
} from './styledHelpers/SeatsStyledComponents';
import { ISeat } from '../redux/reducers/seatsReducer';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IGlobalState } from '../redux/store';
import { reserveSeats } from '../redux/actions/reservationActions';
import { findSeatsByColumns, findUpToFiveSeatsInRow } from '../findSeats';

interface ISeatProps {
	seatsItems: ISeat[];
}

const Seats: FC<ISeatProps> = ({ seatsItems }) => {
	// grupowanie siedzeń do osadzenia w gridach
	const firstSubGroup = seatsItems.filter(seat => seat.cords.y < 5);

	const secondSubGroupFirstRow = seatsItems.filter(
		seat => seat.cords.y >= 6 && seat.cords.y < 10 && seat.cords.x < 5
	);

	const secondSubGroupSecondRow = seatsItems.filter(
		seat => seat.cords.y >= 6 && seat.cords.y < 10 && seat.cords.x >= 5
	);

	const thirdSubGroupFirstRow = seatsItems.filter(
		seat => seat.cords.y >= 10 && seat.cords.x < 5
	);

	const thirdSubGroupSecondRow = seatsItems.filter(
		seat => seat.cords.y >= 10 && seat.cords.x >= 5
	);

	//przesunięcia, każdy grid ma numerację od 1 wiec trzeba przystosować koordynaty do gridów
	const secondColumnYOffset = 6;
	const secondColumnXOffset = 6;

	const thirdColumnYOffset = 11;
	const thirdColumnXOffset = 6;

	const numberOfSeats = useSelector<IGlobalState, number>(
		state => state.form.numberOfSeats
	);
	const nextToEachOther = useSelector<IGlobalState, boolean>(
		state => state.form.nextToEachOther
	);
	const freeSeats = seatsItems.filter(seat => seat.reserved === false);

	const handleSeatHint = (
		freeSeats: ISeat[],
		numberOfSeats: number,
		nextToEachOther: boolean
	) => {
		if (!nextToEachOther) {
			let chosenSeats = [];
			for (let i = 0; i < numberOfSeats; i++) {
				chosenSeats.push(freeSeats[i]);
			}
			return chosenSeats;
		}
		if (numberOfSeats <= 5) {
			return findUpToFiveSeatsInRow(freeSeats, numberOfSeats);
		} else {
			return findSeatsByColumns(
				numberOfSeats,
				firstSubGroup,
				secondSubGroupFirstRow,
				secondSubGroupSecondRow,
				thirdSubGroupFirstRow,
				thirdSubGroupSecondRow
			);
		}
	};
	const handleSeatItemClick = (event: MouseEvent) => {
		const target = event.target as HTMLDivElement;
		if (seatsToHint.some(seat => seat.id === target.id)) {
			setSeatsToHint(seatsToHint.filter(seat => seat.id !== target.id));
		} else {
			const selectedSeat = freeSeats.find(seat => seat.id === target.id);
			if (selectedSeat) {
				setSeatsToHint([...seatsToHint, selectedSeat]);
			}
		}
	};

	const [seatsToHint, setSeatsToHint] = useState<ISeat[]>([]);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleReservation = () => {
		if (seatsToHint.length < 1) {
			return;
		}
		dispatch(reserveSeats(seatsToHint));
		history.push('/reservation');
	};
	useEffect(() => {
		setSeatsToHint(handleSeatHint(freeSeats, numberOfSeats, nextToEachOther));
	}, []);
	return (
		<>
			<MainContainer data-testid="mainContainer">
				<FirstGroup>
					{firstSubGroup.map(seat => (
						<SeatItem
							onClick={(event: MouseEvent) => handleSeatItemClick(event)}
							hinted={
								seatsToHint.find(seatToHint => seatToHint?.id === seat?.id) ? true : false
							}
							id={seat.id}
							key={seat.id}
							reserved={seat.reserved}
							x={seat.cords.x}
							y={seat.cords.y}>
							{seat.cords.y}/{seat.cords.x}
						</SeatItem>
					))}
				</FirstGroup>
				<Group>
					{secondSubGroupFirstRow.map(seat => (
						<SeatItem
							onClick={(event: MouseEvent) => handleSeatItemClick(event)}
							hinted={
								seatsToHint.find(seatToHint => seatToHint?.id === seat?.id) ? true : false
							}
							key={seat.id}
							id={seat.id}
							reserved={seat.reserved}
							x={seat.cords.x}
							y={seat.cords.y - secondColumnYOffset}>
							{seat.cords.y}/{seat.cords.x}
						</SeatItem>
					))}
				</Group>
				<Group>
					{thirdSubGroupFirstRow.map(seat => (
						<SeatItem
							onClick={(event: MouseEvent) => handleSeatItemClick(event)}
							hinted={
								seatsToHint.find(seatToHint => seatToHint?.id === seat?.id) ? true : false
							}
							key={seat.id}
							id={seat.id}
							reserved={seat.reserved}
							x={seat.cords.x}
							y={seat.cords.y - thirdColumnYOffset}>
							{seat.cords.y}/{seat.cords.x}
						</SeatItem>
					))}
				</Group>
				<SecondRowGroup>
					{secondSubGroupSecondRow.map(seat => (
						<SeatItem
							onClick={(event: MouseEvent) => handleSeatItemClick(event)}
							hinted={
								seatsToHint.find(seatToHint => seatToHint?.id === seat?.id) ? true : false
							}
							key={seat.id}
							id={seat.id}
							reserved={seat.reserved}
							x={seat.cords.x - secondColumnXOffset}
							y={seat.cords.y - secondColumnYOffset}>
							{seat.cords.y}/{seat.cords.x}
						</SeatItem>
					))}
				</SecondRowGroup>
				<SecondRowGroup>
					{thirdSubGroupSecondRow.map(seat => (
						<SeatItem
							onClick={(event: MouseEvent) => handleSeatItemClick(event)}
							hinted={
								seatsToHint.find(seatToHint => seatToHint?.id === seat?.id) ? true : false
							}
							key={seat.id}
							id={seat.id}
							reserved={seat.reserved}
							x={seat.cords.x - thirdColumnXOffset}
							y={seat.cords.y - thirdColumnYOffset}>
							{seat.cords.y}/{seat.cords.x}
						</SeatItem>
					))}
				</SecondRowGroup>
			</MainContainer>
			<LegendConteiner>
				<StyledLink to="/">
					<Button type="default">Wróć do wyboru</Button>
				</StyledLink>
				<LegendItem>Y/X</LegendItem>
				Miejsca dostępne
				<LegendItem color="#fff" backgroundColor="#000">
					Y/X
				</LegendItem>
				Miejsca zarezerwowane
				<LegendItem backgroundColor="orange" borderColor="#000">
					Y/X
				</LegendItem>
				Twój wybór
				<Button onClick={handleReservation} type="default">
					Rezerwuj
				</Button>
			</LegendConteiner>
		</>
	);
};

export { Seats };
