import React, { useContext } from "react";
import { View, TextInput, StyleProp, ViewStyle, TextInputProps } from "react-native";

// import { ThemeContext } from "@theme";
import { useTheme } from "react-native-paper";
import { scale } from "react-native-size-matters";
import Text from "./Text";
interface InputProps extends TextInputProps {
  // add props
  errorText?: string;
  style?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = props => {
  const { errorText, value } = props;
  const  theme  = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <TextInput {...props} />
      {!!value && errorText ? (
        <Text style={{ color: "red", fontFamily: theme.fonts, fontSize: scale(11) }}>{errorText}</Text>
      ) : null}
    </View>
  );
};

export default Input;
