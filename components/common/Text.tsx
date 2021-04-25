import React, { useContext } from "react";
import { Text, TextProps, StyleSheet } from "react-native";
// import { ThemeContext } from "@theme";
import { useTheme } from "react-native-paper";

const TextComponent: React.FC<TextProps> = (props) => {
  const { colors } = useTheme();
  return <Text {...props} style={[props.style, styles.shadow, { shadowColor: colors.onSurface }]}></Text>;
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.24,
    shadowRadius: 0.75,
  },
});
export default TextComponent;
