import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager, Platform, LogBox } from "react-native";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from './components/Themed';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import { FirebaseContext, useAuth } from "./config/Firebase";
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme
} from "react-native-paper";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Native splash screen is already hidden', 'No native splash screen registered for given view controller'])


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { user, firebase, loading } = useAuth();

  if (loading || !isLoadingComplete) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaProvider>
      <FirebaseContext.Provider value={{ user, firebase, loading }}>
        <PaperProvider theme={DefaultTheme}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PaperProvider>
      </FirebaseContext.Provider>
    </SafeAreaProvider>
  );
}
