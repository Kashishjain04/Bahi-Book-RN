import React from 'react';
import {View} from 'react-native';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Tab({tab, color, onPress, iconType, iconName}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Icon type={iconType} name={iconName} color={color} />
      </View>
      <Text style={{color}}>{tab.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
