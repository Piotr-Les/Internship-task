import { ISeat } from './redux/reducers/seatsReducer';

export const findUpToFiveSeatsInRow = (
	freeSeats: ISeat[],
	numberOfSeatsToFind: number
) => {
	let chosenSeats = [];

	for (let i = 0; i < freeSeats.length; i++) {
		if (chosenSeats.length === 0) {
			chosenSeats.push(freeSeats[i]);
			if (chosenSeats.length === numberOfSeatsToFind) {
				break;
			}
			continue;
		}
		if (freeSeats[i].cords.y - chosenSeats[chosenSeats.length - 1].cords.y === 1) {
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

export const findSeatsByColumns = (
	numberOfSeats: number,
	firstSubGroup: ISeat[],
	secondSubGroupFirstRow: ISeat[],
	secondSubGroupSecondRow: ISeat[],
	thirdSubGroupFirstRow: ISeat[],
	thirdSubGroupSecondRow: ISeat[]
) => {
	//data setup
	let chosenSeats: ISeat[] = [];
	let data: ISeat[] = [];
	const freeSeatsFromFirstColumn = firstSubGroup.filter(seat => seat.reserved === false);
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
