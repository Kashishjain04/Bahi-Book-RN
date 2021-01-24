import styled from 'styled-components';
import {windowWidth} from '../utils/Dimensions';
import {secondary__text} from './Variables';

export const TransactionCard = styled.View`
  width: ${0.9 * windowWidth}px;
  min-height: 100px;
  max-height: 300px;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 25px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

export const TransactionDescription = styled.Text`
  font-size: 32px;
  width: 100%;
`;

export const TimeStamp = styled.Text`
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 16px;
  color: ${secondary__text};
`;
