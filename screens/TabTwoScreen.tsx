import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  TextInput,
  Platform,
  Dimensions
} from 'react-native';

import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState, useEffect } from "react";
import * as Crypto from 'expo-crypto';
import * as Linking from 'expo-linking';

import BottomSheet from 'reanimated-bottom-sheet';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { useTheme, List, Divider, Avatar, Badge } from 'react-native-paper';
import type { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions } from '@react-navigation/native';
import { FirebaseContext } from "../config/Firebase";
import MyModal from "../components/Modal";


type NavRoutes = {
  Profile: undefined;
  'Edit Profile': undefined;
  Settings: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  NavRoutes,
  'Profile'
>;

type Route = {
  key: string,
  name: string,
  params: any,
}

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: Route;
};

export default function Bottom(props: Props) {
  const { colors } = useTheme();
  const { firebase } = useContext(FirebaseContext);

  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [activeColor, setActiveColor] = useState("rgba(226,141,86,1)");
 

  React.useEffect(() => {
    //console.log('useEffect', props)
    if (props.route.params) {
      refreshProfile();
    }
  }, [props.route.params]);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

    })();
  }, []);


  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      var profile = await firebase.getUserProfile2();
      if (profile && isSubscribed) {
        setUser(profile);
        if (profile.avatar != "") {
          setImage(profile.avatar)
        }
        if (profile.idVerif) {
          setActiveColor("#16C3A2")
        }
        //console.log(user)
        setActiveColor("#16C3A2")
      }
    })();
    return () => (isSubscribed = false)
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      firebase.uploadImage(result.uri); //upload to storage
    }
  };

  async function refreshProfile() {
    const profile = await firebase.getUserProfile2();
    if (profile) {
      setUser(profile);
      //console.log("refreshProfile ProfileScreen", this.state.user.COUNTRY);
    }
  };

  function onPressPlace() {
    //console.log('place')
  }

  return (
    <View style={styles(colors).container}>


      <TouchableWithoutFeedback >
        <View style={styles(colors).container}>
          <View style={[styles(colors).profileRect, { marginTop: 215, alignSelf: 'center' }]}>
            <View style={{ marginTop: -85, alignSelf: 'center' }}>
              <Avatar.Image
                size={170}
                style={{ borderColor: 'white', backgroundColor: 'white' }}
              //source={require('../../assets/images/avatar.blank.png')} borderWidth: 10, 
              />
              {user && (<TouchableHighlight
                onPress={pickImage}
                underlayColor="rgba(73,182,77,1,0.9)"
              >
                {user.avatar ? 
                <Avatar.Image
                  size={162}
                  style={{ backgroundColor: 'transparent', marginTop: -166, marginLeft: 4 }}
                  //source={require("./../../assets/images/avatar-green.jpg")')}
                  source={{ uri: user.avatar }}
                />
                :      <Avatar.Image
                size={162}
                style={{ backgroundColor: 'transparent', marginTop: -166, marginLeft: 4 }}
                source={require("./../assets/images/avatar-green.jpeg")}
              />}
              </TouchableHighlight>)}

            </View>
            <View style={{ alignSelf: 'center' }}>
              <Badge style={{ marginTop: -30, marginLeft: 105, fontSize: 20, borderWidth: 4, borderColor: 'white', backgroundColor: activeColor }} />
            </View>
            {user && (
              <View style={styles(colors).userNameStack}>
                <Text style={styles(colors).userNameText}>
                  {user.fname} {user.lname}
                </Text>
                {user.city ?
                  <View style={styles(colors).userAddressRow}>
                    <View>
                      <Icon
                        name="map-marker"
                        //underlayColor="transparent"
                        iconStyle={styles(colors).placeIcon}
                        size={24}
                        onPress={onPressPlace}
                        color='white'
                      />
                    </View>
                    <View style={styles(colors).userCityRow}>
                      <Text style={styles(colors).locationText}>
                        {user.city}, {user.country}
                      </Text>
                    </View>
                  </View>
                  : null}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const styles = (colors: any) =>
  StyleSheet.create({
    profileRect: {
      height: 200,
      width: Dimensions.get('window').width * 0.85,
      maxWidth: 500,
      borderRadius: 8,
      alignSelf: "center",
      backgroundColor: "#85B819"
    },
    listItem: {
      color: 'white',
      fontSize: 17,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    icon: {
      marginLeft: 8, color: 'white', alignSelf: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      // shadowColor: colors.onSurface,
      // shadowRadius: 0.5,
      // shadowOpacity: 0.5,
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelButton: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#318bfb',
      alignItems: 'center',
      marginVertical: 10,
    },
    group852: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 276,
      width: 341,
      alignSelf: "center",
    },
    rectangle619: {
      height: 276,
      width: 341,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      alignSelf: "center",
    },
    userName: {
      position: "absolute",
      top: 20,
      left: 21,
      height: 29,
      width: 54,
      color: "rgba(255,255,255,1)",
      textAlign: "center",
      fontSize: 12,
      letterSpacing: 0.1447059065103531,
    },
    userNameStack: {
      //width: 300,
      height: 49,
      marginTop: 15,
      alignSelf: "center"
    },
    locationText: {
      color: "rgba(255,255,255,1)",
      textAlign: "center",
      fontSize: 17,
      letterSpacing: 0.20,
    },
    oval: {
      //position: "absolute",
      top: -90,
      height: 132,
      width: 132,
      alignSelf: "center",
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    headerColumn: {
      ...Platform.select({
        ios: {
          alignItems: "center",
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: "center",
        },
        web: {
          alignItems: "center",
        }
      }),
    },
    group852Stack: {
      width: 341,
      height: 342,
      marginTop: 151,
      //marginLeft: 17,
      alignSelf: 'center'
    },
    userAddressRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    },
    userCityRow: {
      backgroundColor: "transparent",
      alignSelf: "center"
    },
    userImage: {
      borderColor: "#FFF",
      backgroundColor: "#FFF",
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: "#FFF",
      fontSize: 22,
      fontWeight: "bold",
      paddingBottom: 8,
      textAlign: "center",
      letterSpacing: 0.144,
    },
    placeIcon: {
      margin: 16, alignSelf: 'center'
    },
    status: {
      position: "absolute",
      top: 46,
      left: 220,
      height: 18,
      width: 18
    },
    svgBackground: {
      position: "absolute",
      height: 18,
      width: 18,
      top: 0,
      left: 0,
      backgroundColor: "transparent",
      borderColor: "transparent"
    },
    status1: {
      position: "absolute",
      height: 12,
      width: 12,
      top: 3,
      left: 3,
      backgroundColor: "transparent",
      borderColor: "transparent"
    },
    backgroundStack: {
      width: 18,
      height: 18
    },
  });