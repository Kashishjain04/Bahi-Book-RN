import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCustomer} from '../redux/customerSlice';
import {selectUser} from '../redux/userSlice';
import firestore from '@react-native-firebase/firestore';
import HomeStats from '../components/HomeStats';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import TransactionCard from '../components/TransactionCard';
import Loader from '../components/Loader';

const Customer = ({navigation}) => {
  const [isLoading, setLoading] = useState(true),
    _isMount = useRef(true),
    user = useSelector(selectUser),
    customer = useSelector(selectCustomer),
    [trans, setTrans] = useState([]),
    [sent, setSent] = useState(0),
    [received, setReceived] = useState(0);

  useEffect(() => {
    const custRef = firestore()
      .collection('users')
      .doc(user.email)
      .collection('customers')
      .doc(customer.customerID);
    custRef
      .collection('transactions')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snap) => {
        if (snap) {
          const transactions = [];
          setSent(0);
          setReceived(0);
          if (_isMount) {
            snap?.forEach((doc) => {
              transactions.push({
                id: doc?.id,
                amount: doc?.data().amount,
                receipt: doc?.data().receipt,
                timestamp: doc?.data().timestamp,
                desc: doc?.data().desc,
              });
              doc?.data().amount >= 0
                ? setReceived((prev) => prev + Number(doc?.data().amount))
                : setSent((prev) => prev - Number(doc?.data().amount));
            });
            setTrans(transactions);
            setLoading(false);
          }
        }
      });
    return () => {
      _isMount.current = false;
      setTrans([]);
    };
  }, [user, customer]);

  return isLoading ? (
    <Loader />
  ) : (
    <View>
      <HomeStats sent={sent} received={received} />
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('Add Transaction')}>
        <View style={styles.iconStyle}>
          <AntDesign name={'plus'} size={40} color="#fff" />
        </View>
        <Text style={styles.text}>Add Transaction</Text>
      </TouchableOpacity>
      <FlatList
        style={{marginBottom: 300}}
        showsVerticalScrollIndicator={false}
        data={trans}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <TransactionCard transaction={item} />}
      />
    </View>
  );
};

export default Customer;

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
    padding: 24,
    flex: 1,
    fontSize: 34,
    color: '#fff',
  },
});
