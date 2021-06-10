import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IItem {
	hinted?: boolean;
	reserved: boolean;
	x: number;
	y: number;
}

interface ILegendItemProps {
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
}
export const StyledLink = styled(Link)`
	text-align: center;
`;

export const MainContainer = styled.div`
	height: 90vh;
	margin: 1rem 1rem 0 1rem;
	display: grid;
	align-items: start;
	grid-template-columns: 1.25fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

export const Group = styled.div`
	display: grid;
	align-items: center;
	justify-items: center;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(5, 60px);
	margin: 0 25px;
	background-color: #ddd;
`;
export const SecondRowGroup = styled(Group)`
	grid-template-rows: repeat(4, 70px);
	align-self: end;
`;

export const FirstGroup = styled(Group)`
	padding: 0 1rem;
	grid-row: 1/3;
	display: grid;

	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(10, 65px);
`;

export const SeatItem = styled.div<IItem>`
	color: ${p => (p.reserved ? '#fff' : '#000')};
	background-color: ${p => (p.reserved ? '#000' : p.hinted ? 'orange' : '#fff')};
	cursor: ${p => (p.reserved ? 'not-allowed' : 'pointer')};
	display: flex;
	align-items: center;
	justify-content: center;
	grid-column: ${p => p.y + 1};
	grid-row: ${p => p.x + 1};
	width: 55px;
	height: 45px;
	border: 1px solid #000;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	&:hover {
		border-color: ${p => (p.reserved ? '#000' : '#1890ff')};
	}
`;

export const LegendConteiner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 10px auto;
	& > * {
		margin: 0 1rem;
	}
`;
export const LegendItem = styled.div<ILegendItemProps>`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${p => (p.color ? p.color : '#000')};
	background-color: ${p => (p.backgroundColor ? p.backgroundColor : '#fff')};
	border: 1px solid ${p => (p.borderColor ? p.borderColor : '#000')};
`;
