import React, { useState, useContext } from "react";
import { StyleSheetProperties, View, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { scale, moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { TouchableRipple, useTheme, Switch } from "react-native-paper";
import { Text, Section, ProfileImage } from '../components/common';;

import { FirebaseContext } from "../config/Firebase";

const Settings: React.FC<any> = (props) => {
  const theme = useTheme();
  const { firebase, user } = useContext(FirebaseContext);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);


  React.useEffect(() => {
    (async () => {
      
      var { status } = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');

      // var { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
      // setHasGalleryPermission(status === 'granted');
    })();
  }, []);


  function handleLogout() {
    let logout = firebase.logout();

    //props.navigation.navigate("Feed");
  }

  const navigateToUser = () => props.navigation.navigate("Profile");


  const toggleCamera = async () => {
    if (!hasCameraPermission) {
      const cameraStatus = await Camera.requestPermissionsAsync();
    }
    setHasCameraPermission((hasCameraPermission) => !hasCameraPermission)
  }




  if (!user) {
    // return <ActivityIndicator size="small" color={'gray'} />
    return <View style={styles(theme.colors).container}></View>
  }

  return (
    <View style={styles(theme.colors).container}>
            <Image
              source={require("./../assets/images/ezbanc-logo-small.jpg")}
              style={styles(theme.colors).groupImage} />

      {/* camera access options */}
      <Section style={[styles(theme.colors).section, styles(theme.colors).twoPartsSection]} disabled>
        <Text style={styles(theme.colors).sectionText}>Camera Access</Text>
        <TouchableRipple onPress={toggleCamera}>
          <View style={styles(theme.colors).preference}>
            <View pointerEvents="none">
              <Switch value={hasCameraPermission} />
            </View>
          </View>
        </TouchableRipple>
      </Section>

      {user ? (
        <Section style={[styles(theme.colors).section, styles(theme.colors).twoPartsSection]} disabled>
          <Text style={styles(theme.colors).sectionText}>Logout</Text>
          <TouchableOpacity
            onPress={() => handleLogout()}
          >
            <Icon
              name="power"
              color={"#85B819"}
              size={34}
            />
          </TouchableOpacity>
        </Section>
      ) : null}
    </View>
  );
};
const styles = (colors: any): StyleSheetProperties | any => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.onSurface + "40",
  },
  notificationSection: {},
  twoPartsSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  sectionText: {
    fontSize: scale(14),
    color: colors.onSurface,
    //fontFamily: theme.colors.font,
  },
  groupImage: {
    resizeMode: "contain",
    backgroundColor: "transparent",
    width: '100%',
    height: 200,
    borderRadius: 20,
    alignSelf: 'center'
  },
});


export default Settings;

