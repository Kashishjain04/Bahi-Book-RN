import React from 'react';
import {Text} from 'react-native';
import {
  NumberHead,
  NumberItem,
  Numbers,
  NumberValue,
} from '../styles/HomeStats';

const HomeStats = ({sent, received}) => {
  return (
    <Numbers>
      <Text>
        <NumberItem>
          <NumberHead>You Got</NumberHead>
          <NumberValue positive={true}>{received}</NumberValue>
        </NumberItem>
        <NumberItem>
          <NumberHead>You Gave</NumberHead>
          <NumberValue positive={false}>{sent}</NumberValue>
        </NumberItem>
        {received === sent ? (
          <NumberItem>
            <NumberHead>Balance</NumberHead>
            <NumberValue positive={true}>0</NumberValue>
          </NumberItem>
        ) : received >= sent ? (
          <NumberItem>
            <NumberHead>You Will Give</NumberHead>
            <NumberValue positive={true}>{received - sent}</NumberValue>
          </NumberItem>
        ) : (
          <NumberItem>
            <NumberHead>You Will Get</NumberHead>
            <NumberValue positive={false}>{sent - received}</NumberValue>
          </NumberItem>
        )}
      </Text>
    </Numbers>
  );
};

export default HomeStats;
