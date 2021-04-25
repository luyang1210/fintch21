import React from 'react';
import { View, Text } from 'react-native';
import layout from '../styles/layout';

const ErrorMessage = ({errorValue}:{ errorValue: string }) => (
  <View style={layout.errorContainer}>
    <Text style={{color: 'red'}}>{errorValue}</Text>
  </View>
);

export default ErrorMessage;
