import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/constants/types';
import {
  AccountManagementScreen,
  HomeScreen,
  NotificationsScreen,
  OnboardingScreen,
  SignInScreen,
  SupportScreen,
  TransactionDetailsScreen,
  AuthHandlingScreen,
  SignUpScreen,
  ConfirmPhone,
  AddEmail,
  AddAddress,
  AddPersonalInfo,
  FinalizeOnboarding,
  AddCountry,
  AddImageID,
  WelcomeScreen,
  AddCard,
  VerifyCard,
  CardSetupScreen,
  CardList
} from './src/screens';


const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} /> 
          <Stack.Screen name="AuthHandling" component={AuthHandlingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ConfirmPhone" component={ConfirmPhone} />
          <Stack.Screen name="FinalizeOnboarding" component={FinalizeOnboarding} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddImageID" component={AddImageID} />
          <Stack.Screen name="AddEmail" component={AddEmail} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="AddPersonalInfo" component={AddPersonalInfo} />
          <Stack.Screen name="AddCountry" component={AddCountry} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="VerifyCard" component={VerifyCard} />
          <Stack.Screen name="CardSetup" component={CardSetupScreen} />
          <Stack.Screen name="CardList" component={CardList} />
          <Stack.Screen  name="TransactionDetails" component={TransactionDetailsScreen} />
          <Stack.Screen
            name="AccountManagement"
            component={AccountManagementScreen}
          />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor={'#FFFFFF'} />
    </>
  );
};

export default App;
