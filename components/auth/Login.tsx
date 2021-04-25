import React, { Component, Fragment } from "react";
import { compose, hoistStatics } from "recompose";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";

import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
//import { withFirebaseHOC } from "../../config/Firebase";
import layout, { iconSize } from "../../styles/layout";

import { withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack"
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});

type ProfileStackParamList = {
  Feed: any;
  Register: any;
  "Reset Password": any;
};

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList>,
  theme: ReactNativePaper.Theme,
  firebase: any,

}

class Login extends Component<Props, any> {

  constructor(props: Props) {
    super(props);

    this.state = {
      passwordVisibility: true,
      rightIcon: "ios-eye",
    };
  }

  componentDidMount() {
    (async () => {
      const { theme } = this.props;
      this.props.navigation.setOptions({
        headerLeft: () => (
          <MaterialCommunityIcons
            name={"chevron-left"}
            style={{ margin: 8, color: theme.colors.text }}
            size={38}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        ),
      });
    })();
  }

  goToSignup = () => this.props.navigation.navigate("Register");

  goToForgotPassword = () => this.props.navigation.navigate("Reset Password");

  handlePasswordVisibility = () => {
    this.setState((prevState: any) => ({
      rightIcon: prevState.rightIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };


  handleOnLogin = (values: any, actions: any) =>
    new Promise(async (res) => {
      const { email, password } = values;
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)

        // if (response.user) {
        //   // Segment.identify(response.user.uid)
        //   // Segment.screen("Login")
        //   // let properties = { "userId": response.user.uid, "Date": new Date() };
        //   // Segment.trackWithProperties("Login", properties)
        //   //alert('welcome to alphaseeker ' + response.user.uid)
        // }
      } catch (error) {
        actions.setFieldError("general", error.message);
        res();
      }
    });

  render() {
    const { colors } = this.props.theme;
    const { passwordVisibility, rightIcon } = this.state;

    return (
      <View style={styles(colors).container}>
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          <HideWithKeyboard >
            <Image
              source={require("./../../assets/images/ezbanc-logo-small.jpg")}
              style={styles(colors).groupImage} />
          </HideWithKeyboard>
          <View style={{ flex: 1, margin: 8 }} >
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await this.handleOnLogin(values, actions);
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                isSubmitting,
                errors,
              }) => (
                <Fragment>
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="username"
                    keyboardType="email-address"
                    iconName="ios-mail"
                    error={touched.email && errors.email}
                    inputStyle={{ color: colors.text }}
                    keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                  />
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Enter password"
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    iconName="ios-lock"
                    onBlur={handleBlur('password')}
                    inputStyle={{ color: colors.text }}
                    rightIcon={
                      <TouchableOpacity onPress={this.handlePasswordVisibility}>
                        <Ionicons
                          name={rightIcon}
                          size={iconSize}
                          color='gray'
                        />
                      </TouchableOpacity>
                    }
                    error={touched.password && errors.password}
                    keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                  />
                  <FormButton
                    buttonType="solid"
                    onPress={handleSubmit}
                    title="Login"
                    loading={isSubmitting}
                    customStyles={[styles(colors).buttonButton]}
                  />
                  <View style={layout.errorContainer}>
                    <ErrorMessage errorValue={errors.general} />
                  </View>
                </Fragment>
              )}
            </Formik>
            <View style={styles(colors).lowerbuttonsView}>
              <TouchableOpacity
                onPress={this.goToSignup}
                style={styles(colors).registerButton}
              >
                <Text style={styles(colors).buttonButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles(colors).lowerbuttonsView}>
              <TouchableOpacity
                onPress={this.goToForgotPassword}
                style={styles(colors).resetPasswordButton}
              >
                <Text style={styles(colors).resetPasswordButtonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <StatusBar style={this.props.theme.dark ? 'light' : 'dark'} />
      </View>
    );
  }
}


const composedWithContext: any = compose(withTheme);

export default hoistStatics(composedWithContext)(Login);

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    lowerbuttonsView: {
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    registerButton: {
      backgroundColor: "transparent",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#85B819",
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      width: 300,
      height: 40,
      //marginTop: 0,
      //marginVertical: 0,
    },
    buttonButton: {
      backgroundColor: "#85B819",
      borderRadius: 20,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowRadius: 4,
      shadowOpacity: 0.4,
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      padding: 0,
      width: 300,
      height: 40,
      marginTop: 28,
    },
    buttonButtonText: {
      color: "#85B819",
      fontSize: 17,
      fontStyle: "normal",
      fontWeight: "normal",
      textAlign: "center",
    },
    resetPasswordButton: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      width: 116,
      height: 18,
    },
    resetPasswordButtonText: {
      color: "rgb(151, 151, 151)",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "bold",
      textAlign: "center",
    },
    groupImage: {
      resizeMode: "contain",
      backgroundColor: "transparent",
      width: '100%',
      height: 200,
      borderRadius: 20,
      alignSelf: 'center',
      //marginTop: -45
    },
  });
