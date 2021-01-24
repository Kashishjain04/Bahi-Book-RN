import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import Tab from './Tab';

const TabBar = ({state, navigation}) => {
  const {routes} = state,
    [selected, setSelected] = useState('Home');
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route) => (
          <Tab
            tab={route}
            key={route.key}
            iconType={route.params?.iconType}
            iconName={route.params?.iconName}
            color={route.name === selected ? 'red' : 'black'}
            onPress={() => {
              setSelected(route.name);
              navigation.navigate(route.name);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: windowWidth,
    height: 60,
    elevation: 2,
  },
});
