import { FC, useState } from 'react';
import styled from 'styled-components';
import { Form, InputNumber, Checkbox, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../redux/actions/formActions';
import { useHistory } from 'react-router-dom';
import { IGlobalState } from '../redux/store';
const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ddd;
`;

const Home: FC = () => {
	let history = useHistory();
	const handleInputChange = (value: number) => {
		setNumberOfSeats(value);
	};
	const handleCheckboxChange = (e: CheckboxChangeEvent) => {
		setNextToEachOther(e.target.checked);
	};
	const submit = () => {
		dispatch(
			submitForm({ nextToEachOther: nextToEachOther, numberOfSeats: numberOfSeats })
		);
		history.push('/seats');
	};

	const dispatch = useDispatch();

	const nOfSeats = useSelector<IGlobalState, number>(state => state.form.numberOfSeats);
	const [numberOfSeats, setNumberOfSeats] = useState<number>(nOfSeats);

	const nToEachOther = useSelector<IGlobalState, boolean>(
		state => state.form.nextToEachOther
	);
	const [nextToEachOther, setNextToEachOther] = useState<boolean>(nToEachOther);

	return (
		<MainContainer>
			<Form>
				<Form.Item colon={false} label="Liczba miejsc">
					<InputNumber
						value={numberOfSeats}
						min={1}
						max={86}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					colon={false}
					label="Czy miejsca mają być obok siebie?"
					labelAlign="right">
					<Checkbox checked={nextToEachOther} onChange={handleCheckboxChange} />
				</Form.Item>

				<Button onClick={submit} block type="default" size="large">
					Wybierz miejsca
				</Button>
			</Form>
		</MainContainer>
	);
};

export { Home };
