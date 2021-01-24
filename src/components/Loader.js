import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  );
};

export default Loader;
