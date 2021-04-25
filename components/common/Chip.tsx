import React, { useContext } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Chip } from "react-native-paper";
import { scale, moderateScale } from "react-native-size-matters";
import { useTheme } from "react-native-paper";



const CustomChip: React.FC<any> = (props) => {
  const { colors } = useTheme();
  const { item, style, onPress } = props;

  const itemPress = () => onPress(item);

  return (
    <Chip
      style={[
        styles(colors).container,
        style,
        {
          backgroundColor: colors.primary,
        },
      ]}
      textStyle={styles(colors).text}
      icon={null}
      selectedColor={colors.onSurface}
      onPress={itemPress}
    >
      {item.name}
    </Chip>
  );
};

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: moderateScale(30),
      //maxWidth: scale(Screen.width * 0.23),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: moderateScale(2),
      marginHorizontal: StyleSheet.hairlineWidth,
    },
    text: {
      fontSize: scale(11),
      alignSelf: "center",
      marginVertical: 0,
      marginHorizontal: 0,
      color: colors.onSurface,
    },
  });
export default CustomChip;
