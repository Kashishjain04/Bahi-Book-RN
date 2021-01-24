import React from 'react';
import {useDispatch} from 'react-redux';
import {setCustomer} from '../redux/customerSlice';
import {CustomerCard, CustomerName, Summary} from '../styles/CustomerCard';
import {NumberHead, NumberValue} from '../styles/HomeStats';

export default function Customer({navigation, customer}) {
  const dispatch = useDispatch();
  const dispatchCustomer = async (customer) => {
    const obj = {
      customerName: customer.name,
      customerID: customer.id,
    };
    dispatch(setCustomer(obj));
    navigation.navigate('Customer');
  };

  return (
    <CustomerCard onPress={() => dispatchCustomer(customer)}>
      <CustomerName>{customer.name}</CustomerName>
      <Summary>
        <NumberHead>
          {customer.balance === 0
            ? 'Balance'
            : String('You Will ').concat(
                customer.balance <= 0 ? 'Get' : 'Give',
              )}
        </NumberHead>
        <NumberValue positive={customer.balance >= 0}>
          {Math.abs(customer.balance)}
        </NumberValue>
      </Summary>
    </CustomerCard>
  );
}
