import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';
import {selectUser} from '../redux/userSlice';
import firestore from '@react-native-firebase/firestore';
import {setCustomer} from '../redux/customerSlice';

const AddCustomer = ({navigation}) => {
  const dispatch = useDispatch(),
    _isMounted = useRef(true),
    user = useSelector(selectUser),
    [isLoading, setLoading] = useState(false),
    [custID, setCustID] = useState(''),
    [custName, setCustName] = useState(''),
    [ids, setIds] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.email)
      .collection('customers')
      .onSnapshot((snap) => {
        if (snap) {
          const tIds = [];
          snap.forEach((doc) => {
            tIds.push(doc.id);
          });
          setIds(tIds);
        }
      });
    return () => {
      _isMounted.current = false;
      setIds([]);
    };
    // eslint-disable-next-line
  }, [user.email]);

  const submitHandler = (e) => {
    if (_isMounted) {
      setLoading(true);
      if (custID === '' || custName === '') {
        setLoading(false);
        return Alert.alert('Missing Value', 'Both the fields are required');
      }
      if (custID === user.email) {
        setLoading(false);
        return Alert.alert(
          'What is this behaviour',
          "Can't add yourself as your customer",
        );
      }
      if (ids.includes(custID)) {
        setLoading(false);
        return Alert.alert('What is this behaviour', 'Customer already exists');
      }
      setCustID('');
      setCustName('');
      firestore()
        .collection('users')
        .doc(user.email)
        .collection('customers')
        .doc(custID)
        .set({name: custName, balance: 0})
        .then(() => {
          const obj = {
            customerName: custName,
            customerID: custID,
          };
          dispatch(setCustomer(obj));
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          navigation.navigate('Customer');
          setLoading(false);
        });
      // // //ALL THIS IS NOW DONE USING CLOUD FUNCTIONS // // // // //
      //                                                             //
      // db().collection("users").doc(ID).set({}, { merge: true });  //
      // db()                                                        //
      //   .collection("users")                                      //
      //   .doc(ID)                                                  //
      //   .collection("customers")                                  //
      //   .doc(user.email)                                          //
      //   .set({ name: user.name, balance: 0 })                     //
      //   .catch((err) => console.log(err.message));                //
      //                                                             //
      // // // // // // // // // // // // // // // // // // // // // //
    }
  };

  const changeID = (val) => {
    const id = val.toLowerCase();
    _isMounted && setCustID(id);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Add Customer</Text>
      <FormInput
        iconName="alternate-email"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Customer ID"
        textContentType="emailAddress"
        value={custID}
        onChangeText={(val) => changeID(val)}
      />
      <FormInput
        iconType="MaterialIcons"
        iconName="person-outline"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Customer Name"
        textContentType="name"
        value={custName}
        onChangeText={(val) => _isMounted && setCustName(val)}
      />
      <FormButton onPress={submitHandler} buttonTitle="Submit" />
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
