import {View, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {AuthProvider, useAuth} from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Define the LoadingScreen component
const LoadingScreen: React.FC = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading...</Text>
  </View>
);

// Define the MainComponent to render navigation based on token and onboarding status
const MainComponent: React.FC<{
  token: string | null;
  onboarded: number | null;
}> = ({token, onboarded}) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  // Determine the initial route based on token and onboarding status
  const initialRouteName = !token
    ? 'FinalizeOnboarding'
    : onboarded === 200
    ? 'Home'
    : 'Onboarding';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRouteName}>
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState<number | null>(null);
  const {isLoading: authLoading} = useAuth();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const fetchedToken = await AsyncStorage.getItem('token');
        const fetchedOnboarded = await AsyncStorage.getItem('onboarded');
        const tokenCreationTime = await AsyncStorage.getItem(
          'tokenCreationTime',
        ); // Get token creation time

        const now = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (fetchedToken && tokenCreationTime) {
          const creationTime = Number(tokenCreationTime);
          if (now - creationTime > oneDayInMs) {
            // Token expired
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('tokenCreationTime');
            setToken(null);
            setOnboarded(null);
          } else {
            // Token is valid
            setToken(fetchedToken);
          }
        } else {
          // No token found or token creation time not available
          setToken(null);
        }

        setOnboarded(fetchedOnboarded ? Number(fetchedOnboarded) : null);

        if (authLoading) {
          setIsLoading(true);
          return;
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setToken(null); // Handle error case
        setOnboarded(null);
      } finally {
        setIsLoading(false);
        SplashScreen.hide(); // Hide the splash screen once initialization is complete
      }
    };

    initializeApp();
  }, [authLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(`Token now: ${token}`);
  console.log(`Onboarding now: ${onboarded}`);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <MainComponent token={token} onboarded={onboarded} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
