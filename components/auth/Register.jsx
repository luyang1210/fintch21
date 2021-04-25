/* eslint-disable comma-dangle */

//import styles from './styles';
import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { compose } from "recompose";
import * as Linking from "expo-linking";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import { withFirebaseHOC } from "../../config/Firebase";
import { withTheme, Title } from "react-native-paper";
import layout, { iconSize } from "../../styles/layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .label("fname")
    .required()
    .min(2, "Minimum 2 characters"),
  lname: Yup.string()
    .label("lname")
    .required()
    .min(2, "Minimum 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password should be at least 6 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement"),
});

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordVisibility: true,
      confirmPasswordVisibility: true,
      passwordIcon: "ios-eye",
      confirmPasswordIcon: "ios-eye",
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

  goToLogin = () => this.props.navigation.navigate("Login");

  handlePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordIcon:
        prevState.passwordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility,
    }));
  };

  handleOnSignup = (values, actions) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (res) => {
      const { fname, lname, email, password } = values;
      try {


        const response = await firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (response.user.uid) {
          const { uid } = response.user;
          const userData = { fname, lname, email, uid };
          let record = await firebase.firestore()
            .collection("users")
            .doc(response.user.uid)
            .set(userData);
        }
        
      } catch (error) {
        actions.setFieldError("general", error.message);
        res();
      }
    });

  render() {
    const { colors } = this.props.theme;
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView style={{ flex: 1, marginTop: 50 }}>
          <Title style={{marginLeft: 20, marginBottom: 20}}>Registration: Step 1 of 2</Title>
          <View style={layout.signupRoot}>
            <Formik
              initialValues={{
                fname: "",
                lname: "",
                email: "",
                password: "",
                confirmPassword: "",
                check: false,
              }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await this.handleOnSignup(values, actions);
              }}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                errors,
                isValid,
                touched,
                handleBlur,
                isSubmitting,
                setFieldValue,
              }) => (
                <Fragment>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        name="fname"
                        value={values.fname}
                        onChangeText={handleChange('fname')}
                        textContentType="name"
                        autoCorrect={false}
                        placeholder="First name"
                        iconName="md-person"
                        onBlur={handleBlur('fname')}
                        error={touched.fname && errors.fname}
                        keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                        leftIconContainerStyle={layout.leftIcon}
                        inputStyle={{ color: colors.text }}
                        selectionColor={colors.error}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormInput
                        name="lname"
                        value={values.lname}
                        onChangeText={handleChange('lname')}
                        textContentType="name"
                        autoCorrect={false}
                        placeholder="Last name"
                        iconName="md-person"
                        onBlur={handleBlur('lname')}
                        error={touched.lname && errors.lname}
                        keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                        leftIconContainerStyle={layout.leftIcon}
                        inputStyle={{ color: colors.text }}
                        selectionColor={colors.error}
                      />
                    </View>
                  </View>
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    iconName="ios-mail"
                    onBlur={handleBlur("email")}
                    inputStyle={{ color: colors.text }}
                    error={touched.email && errors.email}
                    keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                  />
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Enter password"
                    iconName="ios-lock"
                    onBlur={handleBlur("password")}
                    inputStyle={{ color: colors.text }}
                    secureTextEntry={passwordVisibility}
                    rightIcon={
                      <TouchableOpacity onPress={this.handlePasswordVisibility}>
                        <Ionicons
                          name={passwordIcon}
                          size={iconSize}
                          color='gray'
                        />
                      </TouchableOpacity>
                    }
                    error={touched.password && errors.password}
                    keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                  />
                  <FormInput
                    name="password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    placeholder="Confirm password"
                    iconName="ios-lock"
                    onBlur={handleBlur("confirmPassword")}
                    inputStyle={{ color: colors.text }}
                    secureTextEntry={confirmPasswordVisibility}
                    rightIcon={
                      <TouchableOpacity
                        onPress={this.handleConfirmPasswordVisibility}
                      >
                        <Ionicons
                          name={confirmPasswordIcon}
                          size={iconSize}
                          color='gray'
                        />
                      </TouchableOpacity>
                    }
                    error={touched.confirmPassword && errors.confirmPassword}
                    keyboardAppearance={this.props.theme.dark ? 'dark' : 'light'}
                  />
                  <View
                    style={[
                      layout.checkboxContainer,
                      { width: 320, alignSelf: "center" },
                    ]}
                  >
                    <CheckBox
                      containerStyle={{ backgroundColor: colors.background, width: 320, alignSelf: "center" }}
                      textStyle={{ color: colors.customColor }}
                      checkedIcon="check-box"
                      checkedColor={"#85B819"}
                      iconType="material"
                      uncheckedIcon="check-box-outline-blank"
                      title="Agree to terms and conditions"
                      checkedTitle="You agreed to our terms and conditions"
                      checked={values.check}
                      onPress={() => setFieldValue("check", !values.check)}
                    />
                    <View style={layout.tocText}>
                      {/* <Text
                        style={{ color: colors.primary }}
                        onPress={() =>
                          //Linking.openURL("https://www.google.com")
                          this.props.navigation.navigate('Terms and Conditions')
                        }
                      >
                        Terms and Conditions
                      </Text> */}
                    </View>
                  </View>
                  <FormButton
                    buttonType="solid"
                    onPress={handleSubmit}
                    title="Signup"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                    customStyles={styles(colors).registerButton}
                    titleStyle={[styles(colors).registerButtonText, { color: 'white' }]}
                  />
                  <ErrorMessage errorValue={errors.general} />
                </Fragment>
              )}
            </Formik>
          </View>
          <FormButton
            title="Have an account? Login"
            onPress={this.goToLogin}
            type="clear"
            customStyles={[layout.authButtonLogin1, { backgroundColor: 'transparent' }]}
            //titleStyle={colors.text.placeholder}
            titleStyle={styles(colors).registerButtonText}
          />
        </ScrollView>
        <StatusBar style={this.props.theme.dark ? 'light' : 'dark'} />
      </SafeAreaView>
    );
  }
}

SignUpScreen.propTypes = {
  //firebase: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(withFirebaseHOC, withTheme)(SignUpScreen);

const styles = (colors) =>
  StyleSheet.create({
    registerButton: {
      backgroundColor: "#85B819",
      borderRadius: 20,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowRadius: 4,
      shadowOpacity: 0.2,
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      width: 300,
      height: 40,
      marginBottom: 13,
    },
    registerButtonText: {
      color: colors.text,
      fontSize: 17,
      fontStyle: "normal",
      fontWeight: "normal",
      textAlign: "center",
    },
    labelStyle: {
      fontSize: 12,
      color: "grey",
    },
  });
