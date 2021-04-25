import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Image, StyleProp, ImageStyle } from "react-native";
import { scale, moderateScale } from "react-native-size-matters";
import { useTheme } from "react-native-paper";
// import { IScreen, IUser } from "@interfaces";
// import { Theme, ThemeContext } from "@theme";

interface IProps {
  user: any;
  navigation: any;
}

const ProfileImage: React.FC<IProps> = props => {
  const { colors } = useTheme();
  const { navigation, user } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: user.name })}>
      <Image
        source={{ uri: user.avatar ? user.avatar : "https://picsum.photos/200/200" }}
        style={styles(colors).avatar}
      />
    </TouchableOpacity>
  );
};

const styles = (colors: any) =>
  StyleSheet.create({
    avatar: {
      height: moderateScale(34),
      width: moderateScale(34),
      borderRadius: moderateScale(18),
      borderColor: colors.primary,
      borderWidth: scale(2),
      marginHorizontal: scale(7.5),
    },
  });
export default React.memo(ProfileImage);
