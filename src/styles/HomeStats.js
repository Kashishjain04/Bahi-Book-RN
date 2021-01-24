import styled from 'styled-components';
import {windowWidth} from '../utils/Dimensions';
import {
  card__bg,
  container__bg,
  negative,
  positive,
  secondary__text,
} from './Variables';

export const Numbers = styled.View`
  align-items: center;
  background-color: ${container__bg};
  padding: 20px 10px;
`;

export const NumberItem = styled.View`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${card__bg};
  border-radius: 0;
  width: ${0.31 * windowWidth}px};
  height: 120px;
  padding: 10px;
`;

export const NumberHead = styled.Text`
  color: ${secondary__text};
  font-size: 18px;
`;

export const NumberValue = styled.Text`
  color: ${(props) => (props.positive ? positive : negative)};
  font-size: 26px;
`;
