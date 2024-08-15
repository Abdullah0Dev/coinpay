import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
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
  CardList,
  NotFoundScreen,
  PaymentReceipt,
  NewTransactionCountry,
  NewTransactionName,
  NewTransactionPhone,
  NewTransactionEmail,
  NewTransactionPurpose,
  NewTransactionAmount,
  NewTransactionProof,
} from './src/screens';
import {getItem} from './utils/AsyncStorage';
import {AuthProvider, useAuth} from './src/context/AuthContext';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [showOnboarded, setShowOnboarded] = useState<boolean | null>(null);
  const {token} = useAuth();
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide(); // Hide the splash screen after a delay
    }, 4000); // Adjust the delay time (4000ms = 4 seconds)

    return () => clearTimeout(timeout); // Cleanup if the component unmounts
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getItem('onboarded');
    if (onboarded === 200) {
      // successfully onboarded, don't show onboarding screen once again
      setShowOnboarded(false);
      console.log(`it's value should be 200:`, onboarded);
    } else {
      // didn't onboard, show onboarding screen
      setShowOnboarded(true);
      console.log(`it's value is:`, onboarded);
    }
  };

  if (showOnboarded === null) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} color={'#F3F3F3'} />
      </View>
    );
  }
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }} // showOnboarded ? 'Onboarding' : 'Home'
            initialRouteName={token ? 'Home' : 'FinalizeOnboarding'}>
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            {/* transaction */}
            <Stack.Screen
              name="TransactionReceiverCountry"
              component={NewTransactionCountry}
            />
            <Stack.Screen
              name="TransactionReceiverName"
              component={NewTransactionName}
            />
            <Stack.Screen
              name="TransactionReceiverPhone"
              component={NewTransactionPhone}
            />
            <Stack.Screen
              name="TransactionReceiverAddress"
              component={NewTransactionEmail}
            />
            <Stack.Screen
              name="TransactionPurpose"
              component={NewTransactionPurpose}
            />
            <Stack.Screen
              name="TransactionAmount"
              component={NewTransactionAmount}
            />
            <Stack.Screen
              name="TransactionPaymentProof"
              component={NewTransactionProof}
            />

            <Stack.Screen name="PaymentReceipt" component={PaymentReceipt} />
            <Stack.Screen name="AuthHandling" component={AuthHandlingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="ConfirmPhone" component={ConfirmPhone} />
            <Stack.Screen
              name="FinalizeOnboarding"
              component={FinalizeOnboarding}
            />
            {/*phone number -> first name, last name -> email + password  -> image */}
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
            <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetailsScreen}
            />
            <Stack.Screen
              name="AccountManagement"
              component={AccountManagementScreen}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </>
  );
};

export default App;
