import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeStats from '../components/HomeStats';
import Profile from '../components/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/userSlice';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';

const Home = ({navigation}) => {
  const _isMount = useRef(true),
    [isLoading, setLoading] = useState(true),
    user = useSelector(selectUser),
    [sent, setSent] = useState(0),
    [received, setReceived] = useState(0);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user?.email)
      .onSnapshot((snap) => {
        if (snap?.exists) {
          if (_isMount) {
            setReceived(snap.data().received);
            setSent(snap.data().sent);
            setLoading(false);
          }
        }
      });
    // componentWillUnmount
    return () => {
      _isMount.current = false;
    };
  }, [user]);

  return isLoading ? (
    <Loader />
  ) : (
    <View>
      <Profile />

      <HomeStats sent={sent} received={received} />
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('Customers')}>
        <View style={styles.iconStyle}>
          <MaterialIcons name={'people'} size={40} color="#fff" />
        </View>
        <Text style={styles.text}>Customers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('Add Customer')}>
        <View style={styles.iconStyle}>
          <AntDesign name={'plus'} size={40} color="#fff" />
        </View>
        <Text style={styles.text}>Add Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  textContainer: {
    height: windowHeight / 12,
    width: windowWidth - 30,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2f3135',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 70,
  },
  text: {
    padding: 32,
    flex: 1,
    fontSize: 42,
    color: '#fff',
  },
});
