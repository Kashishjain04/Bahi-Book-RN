import styled from 'styled-components';
import {windowWidth} from '../utils/Dimensions';

export const ProfileCard = styled.View`
  width: ${windowWidth}px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const ProfilePhoto = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 76px;
`;

export const ProfileName = styled.Text`
  font-size: 42px;
  max-width: ${0.55 * windowWidth}px;
  overflow: hidden;
`;
