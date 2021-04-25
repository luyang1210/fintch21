import React from "react"
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"


export default class Welcome extends React.Component {

    componentDidMount() {

    }

    goToSignup = () => this.props.navigation.navigate("Register");

    onButtonPressed = () => {
        const { navigate } = this.props.navigation
        navigate("Login")
    }

    render() {

        return <View
            style={styles.welcomeView}>
            <View
                style={styles.alphaLogoView}>
                <View
                    pointerEvents="box-none"
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        justifyContent: "center",
                    }}>
                    <Image
                        source={require("./../../assets/images/ezbanc-logo.png")}
                        style={styles.groupImage} />
                </View>

            </View>
            <View
                style={styles.splashtextView}>
                <View
                    style={{
                        flex: 1,
                    }} />
                <Text
                    style={styles.buildABetterPortfText}>Finance for everyone!</Text>
            </View>
            <View
                style={{
                    flex: 1,
                }} />

            <View
                style={styles.welcomeView}>
                {/* <TouchableOpacity
                    onPress={this.goToSignup}
                    style={styles.buttonButton}>
                    <Text
                        style={styles.buttonButtonText}>Register</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={this.onButtonPressed}
                    style={styles.buttonTwoButton}>
                    <Text
                        style={styles.buttonTwoButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    welcomeView: {
        backgroundColor: "rgb(50, 51, 55)",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonButtonText: {
        color: "white",

        fontSize: 17,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
    buttonButton: {
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
        marginBottom: 22,
        marginVertical: 0,
    },
    buttonTwoButton: {
        backgroundColor: "#85B819",
        borderRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowRadius: 4,
        shadowOpacity: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        width: 300,
        height: 40,
        marginBottom: 52,
    },
    buttonTwoButtonText: {
        color: "white",

        fontSize: 17,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
    alphaLogoView: {
        backgroundColor: "transparent",
        width: 206,
        height: 226,
        marginTop: 165,
    },
    groupImage: {
        resizeMode: "cover",
        backgroundColor: "transparent",
        width: 300,
        height: 226,
        borderRadius: 20,
        alignSelf: 'center'
    },
    splashtextView: {
        backgroundColor: "transparent",
        alignSelf: "stretch",
        height: 81,
        marginLeft: 6,
        marginRight: 8,
        marginTop: 15,
        alignItems: "center",
    },

    buildABetterPortfText: {
        backgroundColor: "transparent",
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowRadius: 4,
        shadowOpacity: 1,
        color: "white",
        
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        alignSelf: "stretch",
        marginLeft: 72,
        marginRight: 72,
    },

})

