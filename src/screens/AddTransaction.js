import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {selectUser} from '../redux/userSlice';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Button} from 'react-native-elements';
import {selectCustomer} from '../redux/customerSlice';
import FormInput from '../components/FormInput';

const AddTransaction = ({navigation}) => {
  const dispatch = useDispatch(),
    _isMounted = useRef(true),
    user = useSelector(selectUser),
    customer = useSelector(selectCustomer),
    [isLoading, setLoading] = useState(false),
    [amount, setAmount] = useState(''),
    [desc, setDesc] = useState(''),
    custRef = firestore()
      .collection('users')
      .doc(user.email)
      .collection('customers')
      .doc(customer.customerID),
    transRef = custRef.collection('transactions').doc();

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  });

  const finalGive = () => {
    const tAmt = parseFloat(amount);
    if (tAmt <= 0 || isNaN(tAmt)) {
      Alert.alert('Invalid Amount', 'Amount must be a number greater than 0');
    } else {
      _isMounted && setAmount(tAmt);
      Alert.alert(
        'Add a transaction with following details ?',
        `Gave ₹${tAmt} to ${customer.customerName}\nDescription: ${
          desc ? desc : 'No Description'
        }`,
        [{text: 'Cancel'}, {text: 'OK', onPress: () => submitHandler(true)}],
      );
    }
  };

  const finalGet = () => {
    const tAmt = parseFloat(amount);
    if (tAmt <= 0 || isNaN(tAmt)) {
      Alert.alert('Invalid Amount', 'Amount must be a number greater than 0');
    } else {
      _isMounted && setAmount(tAmt);
      Alert.alert(
        'Add a transaction with following details ?',
        `Got ₹${tAmt} from ${customer.customerName}\nDescription: ${
          desc ? desc : 'No Description'
        }`,
        [{text: 'Cancel'}, {text: 'OK', onPress: () => submitHandler(false)}],
      );
    }
  };

  const submitHandler = (isGiving) => {
    setLoading(true);
    let amt = 0;
    if (isGiving) {
      amt = -1 * amount;
    } else {
      amt = amount;
    }
    transRef
      .set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        amount: amt,
        desc,
        receipt: '',
      })
      .then(() => {
        _isMounted && setAmount(0);
        _isMounted && setDesc('');
        navigation.goBack();
        setLoading(false);
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Add Transaction</Text>
      <FormInput
        iconType="FontAwesome"
        iconName="money"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Amount"
        value={String(amount)}
        textContentType="telephoneNumber"
        keyboardType="decimal-pad"
        onChangeText={(val) => _isMounted && setAmount(String(val))}
      />
      <FormInput
        iconType="MaterialIcons"
        iconName="description"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Description"
        value={desc}
        textContentType="name"
        onChangeText={(val) => _isMounted && setDesc(val)}
      />
      <View style={styles.buttons}>
        <Button
          type="solid"
          buttonStyle={{backgroundColor: '#ed3b57'}}
          titleStyle={{fontSize: 24}}
          title="You Gave"
          onPress={finalGive}
        />
        <Button
          type="solid"
          buttonStyle={{backgroundColor: '#3f51b5'}}
          titleStyle={{fontSize: 24}}
          title="You Got"
          onPress={finalGet}
        />
      </View>
    </View>
  );
};

export default AddTransaction;

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
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
