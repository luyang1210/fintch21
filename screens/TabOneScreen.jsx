import React from "react";
import {
    SafeAreaView,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Switch,
} from "react-native";

import Card2View from "../components/Card2View";
import { withFirebaseHOC } from "../config/Firebase";
import { withTheme, Divider, Title, Text } from "react-native-paper";
import { compose, hoistStatics } from "recompose";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import numbro from 'numbro';


class BankScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            tdata: [],
            adata: [0],
            user: {},
            data: [],
            freeze: false,
            cardNumber: "4354 **** **** 3217",
            expiration: "03/25"
        };
    }

    _isMounted = false;

    componentDidMount() {
        this.subscribeBalance();
        (async () => {
            const profile = await this.props.firebase.firebase.getUserProfile2();
            if (profile && this._isMounted) {
                this.setState({ user: profile });
            }
        })();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    subscribeBalance() {
        this._isMounted = true;
        (async () => {
            this.unsubscribe = await this.props.firebase.firebase.subscribeBalance({
                onSnapshot: (snapshot) => {
                    const snapshotData = [];
                    const transData = [];
                    //console.log(snapshot.size)
                    snapshot.forEach((doc) => {
                        snapshotData.push(doc.data().amount);
                        transData.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    //console.log(snapshotData);
                    if (this._isMounted) {
                        this.setState({
                            adata: snapshotData,
                            tdata: transData,
                        });
                        //console.log(this.state.data);
                        //unsub();
                    }
                },
            });
        })();
    }


    toggleSwitch = () => { 
        this.setState({ freeze: !this.state.freeze });

        // if (this.state.freeze) {
        //     this.props.firebase.firebase.activeCard();
        // } else {
        //     this.props.firebase.firebase.suspendCard();
        // }
    };

    handleIndexChange = (index) => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    };

    renderItem = ({ item }) => (
        <Card2View
            //   onPress={() =>
            //     this.props.navigation.navigate("Transactions", {
            //       item: item,
            //       payments: payments,
            //       backScreen: "Home",
            //     })
            //   }
            item={item}
        />
    );

    FlatListItemSeparator = () => {
        return (
            <Divider style={styles(this.props.theme.colors).fldivider} />
        );
    }


    render() {
        const user = this.state.user;
        const theme = this.props.theme;
        const cardNumber = this.state.cardNumber;
        const expiration = this.state.expiration;
        
        var balance = "0";
        if (this.state.adata.length) {
            let temp = this.state.adata.reduce(
                (result, number) => result + number,
                0
            );

            balance = numbro(Number(temp)).format({
                thousandSeparated: true,
                mantissa: 2 // number of decimals displayed
              });
        }

        return (
            <View style={styles(theme.colors).homeView}>

                <View
                    pointerEvents="box-none"
                    style={{
                        height: 268,
                        width: 330,
                        borderRadius: 8,
                        marginTop: 120,
                        alignSelf: 'center'
                    }}
                >
                    <View style={styles(theme.colors).card1View}>
                        <Image
                            source={require("./../assets/images/card-base.png")}
                            style={styles(theme.colors).cardBaseImage}
                        />
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 27,
                                right: 30,
                                top: 25,
                                bottom: 27,
                            }}
                        >
                            <View
                                pointerEvents="box-none"
                                style={{
                                    height: 34,
                                    marginLeft: 3,
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Image
                                    source={require("./../assets/images/sim-card.png")}
                                    style={styles(theme.colors).simCardImage}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                />
                                <Image
                                    source={require("./../assets/images/visa-pay-logo.png")}
                                    style={styles(theme.colors).visaPayLogoImage}
                                />
                            </View>
                            <Text style={styles(theme.colors).textText}>{cardNumber}</Text>
                            <Text style={styles(theme.colors).welcomeText}>Welcome!</Text>
                            <View
                                style={{
                                    flex: 1,
                                }}
                            />
                            <View
                                pointerEvents="box-none"
                                style={{
                                    height: 18,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Text style={styles(theme.colors).textTwoText}>
                                    {user.fname} {user.lname}
                                </Text>
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                />
                                <Text style={styles(theme.colors).textTwoText}>{"03/25"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles(theme.colors).walletrectangleView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 110,
                            }}
                        >
                            <View style={styles(theme.colors).rectangleView} />
                            <View
                                pointerEvents="box-none"
                                style={{
                                    position: "absolute",
                                    left: 29,
                                    right: 19,
                                    top: 18,
                                    height: 67,
                                }}
                            >

                                <View
                                    pointerEvents="box-none"
                                    style={{
                                        height: 30,
                                        marginTop: 19,
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => { }} //this.props.navigation.navigate("Link Bank")
                                    >
                                        <Icon
                                            name="wallet"
                                            size={30}
                                            color={theme.colors.backdrop} />
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate("Deposit") }}
                                    >
                                        <Icon name="plus-circle" size={30} color={theme.colors.backdrop} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                height: 30,
                                marginTop: 5,
                                flexDirection: "row",
                                alignSelf: "center",
                            }}
                        >
                            <Title style={styles(theme.colors).title}>{this.state.freeze ? "Unlock" : "Freeze"}</Title>
                            {/* <Switch value={this.state.freeze} onValueChange={this.toggleSwitch} color='red' /> */}
                            <Switch
                                trackColor={{ true: 'red', false: '#F4892D' }}
                                thumbColor={"#85B819"}
                                ios_backgroundColor='#F4892D'
                                onValueChange={this.toggleSwitch}
                                value={this.state.freeze} />

                        </View>

                        <Text style={styles(theme.colors).balanceText}>£{balance}</Text>
                    </View>
                </View>
                <SafeAreaView style={styles(theme.colors).scrolllistSafeAreaView}>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.tdata}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        keyExtractor={(item) => `${item.id.toString()}`}
                        style={styles(theme.colors).rectangleFlatList}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const composedWithContext = compose(withFirebaseHOC, withTheme);

export default hoistStatics(composedWithContext)(BankScreen);

const styles = (colors) =>
    StyleSheet.create({
        title: {
            alignSelf: 'center',
            color: 'white',
            margin: 20
        },
        homeView: {
            backgroundColor: colors.background,
            flex: 1,
        },
        card1View: {
            backgroundColor: "transparent",
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowRadius: 4,
            shadowOpacity: 1,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 170,
        },
        cardBaseImage: {
            backgroundColor: "transparent",
            resizeMode: "cover",
            position: "absolute",
            alignSelf: "center",
            width: 340,
            top: -5,
            height: 175,
        },
        simCardImage: {
            resizeMode: "cover",
            backgroundColor: "transparent",
            width: 40,
            height: 34,
        },
        visaPayLogoImage: {
            resizeMode: "cover",
            backgroundColor: "transparent",
            width: 60,
            height: 20,
        },
        textText: {
            backgroundColor: "transparent",
            color: "white",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "bold",
            textAlign: "left",
            alignSelf: "flex-start",
            marginLeft: 3,
            marginTop: 9,
        },
        welcomeText: {
            backgroundColor: "transparent",
            color: "#85B819",
            //fontFamily: "Montserrat-Bold",
            fontSize: 24,
            fontStyle: "normal",
            fontWeight: "bold",
            textAlign: "left",
            alignSelf: "flex-start",
            marginTop: 6,
        },
        textTwoText: {
            color: "white",
            //fontFamily: "Montserrat-SemiBold",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "bold",
            textAlign: "left",
            backgroundColor: "transparent",
        },
        walletrectangleView: {
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            right: 0,
            top: 158,
            height: 110,
        },
        rectangleView: {
            backgroundColor: "#85B819",
            borderRadius: 8,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowRadius: 4,
            shadowOpacity: 1,
            position: "absolute",
            alignSelf: "center",
            width: 335,
            top: 0,
            height: 110,
        },
        ovalView: {
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
            borderStyle: "solid",
            shadowColor: "rgba(64, 64, 99, 0.2)",
            shadowRadius: 4,
            shadowOpacity: 1,
            position: "absolute",
            left: 150,
            width: 20,
            top: 17,
            height: 20,
        },
        balanceText: {
            color: "white",
            //fontFamily: "Montserrat-Bold",
            fontSize: 32,
            fontStyle: "normal",
            fontWeight: "bold",
            textAlign: "left",
            backgroundColor: "transparent",
            position: "absolute",
            alignSelf: "center",
            top: 54,
        },
        scrolllistSafeAreaView: {
            backgroundColor: colors.background,
            height: '100%',
            width: '95%',
            //width: 340,
            // marginLeft: 20,
            // marginRight: 20,
            marginTop: 5,
            alignSelf: "center",
        },
        rectangleFlatList: {
            //backgroundColor: colors.background,
            borderRadius: 8,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowRadius: 4,
            shadowOpacity: 1,
            width: "100%",
            //height: "100%",
        },
        fldivider: {
            //width: "92%",
            //alignSelf: "center",
        }
    });
