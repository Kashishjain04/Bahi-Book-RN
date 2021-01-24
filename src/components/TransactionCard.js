import React from 'react';
import {Summary} from '../styles/CustomerCard';
import {
  TransactionCard,
  TransactionDescription,
  TimeStamp,
} from '../styles/TransactionCard';
import {NumberHead, NumberValue} from '../styles/HomeStats';
import Receipt from './Receipt';
import {ScrollView} from 'react-native-gesture-handler';

const Transaction = ({transaction}) => {
  const timestamp =
    new Date(transaction?.timestamp?.toDate()).toLocaleDateString() +
    ', ' +
    new Date(transaction?.timestamp?.toDate()).toLocaleTimeString();

  return (
    <TransactionCard>
      {/* Transaction Time */}
      <TimeStamp>{timestamp}</TimeStamp>

      {/* Transaction Description */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TransactionDescription>
          {transaction?.desc ? transaction?.desc : 'No Description'}
        </TransactionDescription>
      </ScrollView>

      {/* Receipt */}
      {transaction?.receipt !== '' && (
        <Receipt receipt={transaction?.receipt} />
      )}

      {/* Amount */}
      <Summary>
        <NumberHead>
          {String('You ').concat(transaction?.amount > 0 ? 'Got' : 'Gave')}
        </NumberHead>
        <NumberValue positive={transaction?.amount > 0}>
          {Math.abs(transaction?.amount)}
        </NumberValue>
      </Summary>
    </TransactionCard>
  );
};

export default Transaction;
