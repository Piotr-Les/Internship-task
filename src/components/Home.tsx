import { FC, useState } from 'react';
import styled from 'styled-components';
import { Form, InputNumber, Checkbox, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch } from 'react-redux';
import { submitForm } from '../redux/actions/formActions';
const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ddd;
`;

const Home: FC = () => {
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
	};

	const dispatch = useDispatch();
	const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
	const [nextToEachOther, setNextToEachOther] = useState<boolean>(false);

	return (
		<MainContainer>
			<Form>
				<Form.Item colon={false} label="Liczba miejsc">
					<InputNumber value={numberOfSeats} min={1} onChange={handleInputChange} />
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
