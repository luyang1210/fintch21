import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { List, useTheme, Text } from "react-native-paper";
import moment from 'moment';
import numbro from 'numbro';

function Card2View(props: any) {
  const theme = useTheme();
  const item = props.item;
  const iconColor = (item.amount >= 0) ? "green" : "red";

  const amount = numbro(Number(item.amount)).format({
    thousandSeparated: true,
    mantissa: 2 // number of decimals displayed
  });
  const viewTransaction = () => {
    //console.log(props.navigation);
    //props.navigation.navigate("Chart", {symbol: props.item.symbol});
  };


  const right = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginRight: Dimensions.get('window').width * 0.05,
          alignSelf: 'center'
        }}
      >
        <Text style={[styles(theme.colors).pricingTwo, {color: 'gray'}]}>{moment(item.date.toDate(), 'HH:mm Do MMM YYYY').fromNow()}</Text>
        <Text style={[styles(theme.colors).pricingTwo, {color: iconColor}]}>
          £{amount}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles(theme.colors).container}>
      <TouchableOpacity onPress={viewTransaction}>
        <List.Item
          title={item.vendorName}
          description={item.type}
          //left={props => <List.Icon {...props} icon="wizard-hat" />}
          right={right}
          style={[styles(theme.colors).cardStyle]}>
        </List.Item>
      </TouchableOpacity>
    </View>
  );
}

export default Card2View;

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex:1,
      width: '100%',
      backgroundColor: colors.background
    },
    cardStyle: {
      backgroundColor: colors.background,
      borderRadius: 1,
      borderWidth: 0,
      borderColor: "rgb(204, 204, 227)",
      borderStyle: "solid",
      alignSelf: "center",
      width: '100%',
      height: 70,
      marginTop: 0,
      marginLeft: 10
    },
    pricingTwo: {
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal",
      textAlign: "right",
      lineHeight: 20,
      letterSpacing: 0.2,
      backgroundColor: "transparent",
    },
  });