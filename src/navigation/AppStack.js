/* eslint-disable eslint-comments/no-unlimited-disable */
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Customer from '../screens/Customer';
import {selectCustomer} from '../redux/customerSlice';
import Customers from '../screens/Customers';
import Home from '../screens/Home';
import AddCustomer from '../screens/AddCustomer';
import AddTransaction from '../screens/AddTransaction';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {logout} from '../redux/userSlice';
import {GoogleSignin} from '@react-native-community/google-signin';
import Loader from '../components/Loader';
import TabBar from './TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const dispatch = useDispatch(),
    [isLoading, setLoading] = useState(false), //For logout btn
    _isMounted = useRef(true),
    customer = useSelector(selectCustomer);

  const logoutHandler = async () => {
    try {
      _isMounted && setLoading(true);
      await GoogleSignin.revokeAccess().catch((err) => {
        console.log(err.message);
        _isMounted && setLoading(false);
      });
      await auth()
        .signOut()
        .catch((err) => {
          console.log(err.message);
          _isMounted && setLoading(false);
        });
      dispatch(logout());
      _isMounted && setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  });

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
          fontSize: 24,
        },
        headerStyle: {
          elevation: 5,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () =>
            isLoading ? (
              <Loader />
            ) : (
              <TouchableOpacity onPress={logoutHandler}>
                <Feather style={styles.logout} name="log-out" />
              </TouchableOpacity>
            ),
        }}
      />
      <Stack.Screen
        name="Customers"
        component={Customers}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Customer"
        component={Customer}
        options={{
          headerTitle: customer?.customerName,
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Add Customer"
        component={AddCustomer}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Add Transaction"
        component={AddTransaction}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const bottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen
      name="Customers"
      component={Customers}
      initialParams={{iconType: 'MaterialIcons', iconName: 'people'}}
    />
    <Tab.Screen
      name="Home"
      component={Home}
      initialParams={{iconType: 'AntDesign', iconName: 'home'}}
    />
    <Tab.Screen
      name="Add Customer"
      component={AddCustomer}
      initialParams={{iconType: 'MaterialIcons', iconName: 'add'}}
    />
  </Tab.Navigator>
);

export default AppStack;

const styles = StyleSheet.create({
  logout: {
    fontSize: 24,
    marginRight: 10,
  },
});
