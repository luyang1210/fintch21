/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import layout from '../styles/layout';
import { withTheme } from 'react-native-paper';

const FormButton = ({ title, buttonType, disabled, loading, customStyles, theme, ...rest }) => {
  return (
    <Button
      type={buttonType}
      title={title}
      buttonStyle={[layout.buttonContainer, customStyles, disabled]}
      loading={loading}
      {...rest}
    />
  );
};

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  loading: PropTypes.bool,
  customStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

FormButton.defaultProps = {
  buttonType: 'solid',
  loading: false,
  disabled: false,
  customStyles: {},
};

export default withTheme(FormButton);
