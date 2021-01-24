import styled from 'styled-components';
import {windowWidth} from '../utils/Dimensions';

export const CustomerCard = styled.TouchableOpacity`
  width: ${0.9 * windowWidth}px;
  height: 100px;
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

export const CustomerName = styled.Text`
  font-size: 32px;
  max-width: 75%;
`;

export const Summary = styled.View`
  max-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
