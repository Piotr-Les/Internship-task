import { FC, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { IGlobalState } from '../redux/store';

interface ISeatProps {
	seatsItems: ISeat[];
}

const Seats: FC<ISeatProps> = ({ seatsItems }) => {
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

	const findUpToFiveSeatsInRow = (freeSeats: ISeat[], numberOfSeatsToFind: number) => {
		let chosenSeats = [];

		for (let i = 0; i < freeSeats.length; i++) {
			if (chosenSeats.length === 0) {
				chosenSeats.push(freeSeats[i]);
				if (chosenSeats.length === numberOfSeatsToFind) {
					break;
				}
				continue;
			}
			if (
				freeSeats[i].cords.y - chosenSeats[chosenSeats.length - 1].cords.y === 1 ||
				freeSeats[i].cords.y - chosenSeats[chosenSeats.length - 1].cords.y === 0
			) {
				chosenSeats.push(freeSeats[i]);
			} else {
				chosenSeats = [];
				i--;
			}
			if (chosenSeats.length === numberOfSeatsToFind) {
				break;
			}
		}
		return chosenSeats;
	};

	const findSeatsByColumns = (numberOfSeats: number) => {
		//data setup
		let chosenSeats: ISeat[] = [];
		let data: ISeat[] = [];
		const freeSeatsFromFirstColumn = firstSubGroup.filter(
			seat => seat.reserved === false
		);
		const firstRange = freeSeatsFromFirstColumn.length;

		const freeSeatsFromSecondColumnFirstRow = secondSubGroupFirstRow.filter(
			seat => seat.reserved === false
		);
		const secondRange = freeSeatsFromSecondColumnFirstRow.length;

		const freeSeatsFromSecondColumnSecondRow = secondSubGroupSecondRow.filter(
			seat => seat.reserved === false
		);
		const thirdRange = freeSeatsFromSecondColumnSecondRow.length;

		const freeSeatsFromThirdColumnFirstRow = thirdSubGroupFirstRow.filter(
			seat => seat.reserved === false
		);
		const forthRange = freeSeatsFromThirdColumnFirstRow.length;

		const freeSeatsFromThirdColumnSecondRow = thirdSubGroupSecondRow.filter(
			seat => seat.reserved === false
		);
		const fifthRange = freeSeatsFromThirdColumnSecondRow.length;

		if (numberOfSeats <= firstRange) {
			data = [...freeSeatsFromFirstColumn];
		} else if (numberOfSeats <= firstRange + secondRange) {
			data = [...freeSeatsFromFirstColumn, ...freeSeatsFromSecondColumnFirstRow];
		} else if (numberOfSeats <= firstRange + secondRange + thirdRange) {
			data = [
				...freeSeatsFromFirstColumn,
				...freeSeatsFromSecondColumnFirstRow,
				...freeSeatsFromSecondColumnSecondRow,
			];
		} else if (numberOfSeats <= firstRange + secondRange + thirdRange + forthRange) {
			data = [
				...freeSeatsFromFirstColumn,
				...freeSeatsFromSecondColumnFirstRow,
				...freeSeatsFromSecondColumnSecondRow,
				...freeSeatsFromThirdColumnFirstRow,
			];
		} else if (
			numberOfSeats <=
			firstRange + secondRange + thirdRange + forthRange + fifthRange
		) {
			data = [
				...freeSeatsFromFirstColumn,
				...freeSeatsFromSecondColumnFirstRow,
				...freeSeatsFromSecondColumnSecondRow,
				...freeSeatsFromThirdColumnFirstRow,
				...freeSeatsFromThirdColumnSecondRow,
			];
		}
		for (let i = 0; i < numberOfSeats; i++) {
			chosenSeats.push(data[i]);
		}
		return chosenSeats;
	};

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
			return findSeatsByColumns(numberOfSeats);
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

	const [seatsToHint, setSeatsToHint] = useState<ISeat[]>([freeSeats[0]]);
	useEffect(() => {
		setSeatsToHint(handleSeatHint(freeSeats, numberOfSeats, nextToEachOther));
	}, []);
	return (
		<>
			<MainContainer>
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
				<LegendItem></LegendItem>
				Miejsca dostępne
				<LegendItem color="#fff" backgroundColor="#000"></LegendItem>
				Miejsca zarezerwowane
				<LegendItem
					color="#fff"
					backgroundColor="orange"
					borderColor="orange"></LegendItem>
				Twój wybór
				<Button type="default">Rezerwuj</Button>
			</LegendConteiner>
		</>
	);
};

export { Seats };
