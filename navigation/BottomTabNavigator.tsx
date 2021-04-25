/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Bank"
      tabBarOptions={{ activeTintColor: "#85B819" }}> 
      {/* Colors[colorScheme].tint */}
      <BottomTab.Screen
        name="Bank"
        component={TabOneNavigator}
        options={{
          //tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          tabBarIcon: ({ color }) => (
            <Icon name="wallet" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          //tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          tabBarIcon: ({ color }) => <Icon name="account" size={25} color={color} />,
          
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabThreeNavigator}
        options={{
          //tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          tabBarIcon: ({ color }) => (
            <Icon name="cog" size={25} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Wallet' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Profile', headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'Settings', headerShown: false }}
      />
    </TabThreeStack.Navigator>
  );
}
