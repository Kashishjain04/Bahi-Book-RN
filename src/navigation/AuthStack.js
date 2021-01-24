import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import Auth from '../screens/Auth';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStatusBarHeight: Platform.OS === 'android' ? 10 : 40,
        headerStyle: {
          elevation: 5,
        },
      }}>
      <Stack.Screen
        name="Login"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
