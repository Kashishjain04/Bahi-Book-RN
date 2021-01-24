import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/userSlice';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CustomerCard from '../components/CustomerCard';
import Loader from '../components/Loader';

function Customers({navigation}) {
  const [isLoading, setLoading] = useState(true),
    _isMount = useRef(true),
    user = useSelector(selectUser),
    [customers, setCustomers] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.email)
      .collection('customers')
      .onSnapshot((snap) => {
        if (snap) {
          const cst = [];
          snap?.forEach((doc) => {
            cst.push({
              id: doc?.id,
              name: doc?.data().name,
              balance: doc?.data().balance,
            });
          });
          if (_isMount.current) {
            setCustomers(cst);
            setLoading(false);
          }
        }
      });
    return () => {
      _isMount.current = false;
      setCustomers([]);
    };
  }, [user]);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{paddingVertical: 10}}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CustomerCard navigation={navigation} customer={item} />
        )}
      />
    </View>
  );
}

export default Customers;
