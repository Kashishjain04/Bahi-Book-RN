import React from 'react';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

const FormButton = ({buttonTitle, ...props}) => {
  return (
    <View style={{width: '100%'}}>
      <SendButton {...props}>
        <FontAwesome name={'send-o'} size={25} color="white" />
      </SendButton>
    </View>
  );
};

export default FormButton;

const SendButton = styled.TouchableOpacity`
  margin: 30px;
  background-color: #2e64e5;
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  align-self: center;
`;
