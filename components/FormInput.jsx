/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import layout from '../styles/layout';
import ErrorMessage from './ErrorMessage';
import { withTheme } from "react-native-paper";
//import { StyleSheet } from "react-native";


const FormInput = ({
  name,
  value,
  onChangeText,
  onBlur,
  label,
  labelStyle,
  error,
  theme,
  inputStyle,
  ...rest
}) => (
  <View style={layout.center}>
    <Input
      name={name}
      value={value}
      label={label}
      onChangeText={onChangeText}
      onBlur={onBlur}
      labelStyle={labelStyle}
      //placeholder={placeholder}
      //placeholderTextColor="grey"
      keyboardAppearance={theme.dark ? 'dark' : 'light'}
      //leftIcon={<Ionicons name={iconName} size={20} color={theme.colors.icon.color} />}
      leftIconContainerStyle={layout.leftIcon}
      inputStyle={inputStyle}
      selectionColor={theme.colors.error}
      {...rest}
    />
    {error && <ErrorMessage errorValue={error} />}
  </View>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  //iconName: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  //placeholder: PropTypes.string.isRequired,
  autoCapitalize: PropTypes.string,
  error: PropTypes.string,
  //themeType: PropTypes.string.isRequired,
  //theme: PropTypes.object.isRequired,
};

FormInput.defaultProps = {
  autoCapitalize: 'sentences',
  keyboardType: 'default',
  error: null,
};



export default withTheme(FormInput);

