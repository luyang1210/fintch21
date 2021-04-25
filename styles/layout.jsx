/**
 * Global layouts used in all screens and components
 */

import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const spacing = 4;

const fontSize = {
  title: 20,
  button: 17,
};

const fontWeight = {
  title: '500',
};
const border = {
  radius: spacing / 2,
  width: 1,
};

const layout = StyleSheet.create({
  // device dimensions
  window: {
    width,
    height,
  },
  // device dimensions with global spacing
  windowWidth: {
    width: width - spacing * 2,
  },
  windowHeight: {
    height: height - spacing * 2,
  },
  // status bar
  statusBar: {
    height: Constants.statusBarHeight,
  },
  // root
  rootApp: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
    padding: spacing,
    marginTop: 75
  },
  // scroll view
  scrollViewContainer: {
    paddingBottom: spacing * 1,
    //paddingTop: 10,
  },
  // center screen
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerFullWidth: {
    flex: 1,
    justifyContent: 'center',
  },
  centerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betweenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betweenFullHeight: {
    justifyContent: 'space-between',
  },
  start: {
    justifyContent: 'flex-start',
  },
  // containers
  logoContainer: {
    marginVertical: spacing,
    alignItems: 'center',
  },
  inputContainer: {
    padding: spacing,
    paddingBottom: spacing * 2,
  },
  buttonContainer: {
    margin: spacing * 3,
    //borderWidth: border.width,
    //borderRadius: border.radius,
  },
  checkboxContainer: {
    paddingHorizontal: spacing,
    borderRadius: border.radius,
  },
  errorContainer: {
    paddingHorizontal: spacing * 2,
  },
  // auth buttons
  authButtonLogin1: {
    marginTop: 0,
    marginVertical: 0,
  },
  authButtonLogin2: {
    marginTop: spacing,
    marginVertical: 0,
  },
  // settings row
  settingsRowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // icon
  leftIcon: {
    marginRight: spacing * 2,
  },
  button: {
    textAlign: 'center',
    fontSize: fontSize.button,
  },
  title: {
    padding: spacing * 2,
    fontSize: fontSize.title,
    fontWeight: fontWeight.title,
    alignSelf: 'center',
  },
  // forgot password
  forgotPasswordRoot: {
    paddingTop: spacing * 18,
  },
  forgotPasswordText: {
    fontSize: 24,
    marginLeft: spacing * 3,
  },
  // sign up
  signupRoot: {
    //paddingTop: spacing * 1,
    marginLeft: spacing * 3,
    marginRight: spacing * 3,
  },
  tocText: {
    marginLeft: spacing * 2,
    marginBottom: spacing * 2,
  },
  // settings
  settingsRoot: {
    paddingTop: 0,
    padding: 0,
  },
  // dashboard
  dashboardSearch: {
    margin: spacing,
    marginBottom: spacing * 2,
  },
  // console.error
  errorRoot: {
    margin: spacing,
  },

	lowerbuttonsView: {
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
    marginTop: 30,
  },
  lowerbuttonsView2: {
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 50,
    //marginTop: 30,
	},
	registerButton: {
		backgroundColor: "rgb(162, 55, 243)",
		borderRadius: 20,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
    shadowOpacity: 1,
    flex: 1,
		flexDirection: "column",
		alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
		padding: 0,
		width: 300,
		height: 40,
		marginBottom: 13,
	},
	registerButtonText: {
		color: "white",
		//fontFamily: "Montserrat-Regular",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
  },

	loginButton: {
		backgroundColor: "transparent",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgb(204, 204, 227)",
		borderStyle: "solid",
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		width: 300,
		height: 40,
	  marginTop: 0,
		marginVertical: 0,
  },
	loginButtonText: {
		color: "white",
		//fontFamily: "Montserrat-Regular",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
  },
	updateButton: {
		backgroundColor: "rgb(162, 55, 243)",
		borderRadius: 20,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
    shadowOpacity: 1,
    flex: 1,
		flexDirection: "column",
		alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
		padding: 0,
		width: 300,
    height: 40,
    marginLeft: spacing * 3,
    marginRight: spacing * 3,
		marginTop: 20,
	},
});

export const iconSize = 28;

export default layout;
