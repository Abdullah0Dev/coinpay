import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { CustomContainer } from '../components';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootTabParamList } from '../constants/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScreenRouteProps = RouteProp<RootTabParamList, 'HomeTab'>;

type AmountProps = {
  route: ScreenRouteProps;
};

const HomeTab: React.FC<AmountProps> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList & RootStackParamList>>();
  const { token, setToken } = useAuth(); // Ensure useAuth provides a way to update the token

  const [commission, setCommission] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  const {
    receiverCountry,
    name,
    RealPhoneNumber,
    address,
    purpose,
    amount,
    date,
    transactionID,
    TransactionFees,
  } = route.params || {};

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken); // Update token in context if available
        } else {
          setToken(null); // Clear token if not available
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        setToken(null); // Clear token on error
      }
    };

    fetchToken();
  }, [setToken]);

  useEffect(() => {
    if (!token) {
      // Navigate to Finalize Onboarding screen if token is not available
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'FinalizeOnboarding' }],
      //   })
      // );

      console.log("I don't know what's happing in these days! alhamdullah");
      
      return; // Exit early if no token is available
    }

    const fetchData = async () => {
      try {
        const [commissionResponse, rateResponse, transactionHistoryResponse] = await Promise.all([
          axios.get('https://api.elrasilmobile.com/api/app/commmision/', {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get('https://api.elrasilmobile.com/api/app/rate/', {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get('https://api.elrasilmobile.com/API/app/transactions', {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const transactionsWithColor = transactionHistoryResponse.data.map((transaction: { PaymentStatus: string }) => {
          let color = '';
          let icon = '';
          switch (transaction.PaymentStatus) {
            case 'Pending':
              color = '#F47F16';
              icon = 'warning';
              break;
            case 'Failed':
              color = '#F44336';
              icon = 'close';
              break;
            case 'Success':
              color = '#66BB6B';
              icon = 'check';
              break;
            default:
              color = '#F47F16'; // default color if status doesn't match
              icon = 'warning';
          }
          return { ...transaction, color, icon };
        });

        setTransactionHistory(transactionsWithColor.reverse().slice(0, 6));
        setCommission(commissionResponse.data.commission);
        setRate(rateResponse.data.rate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(`Transaction history`,transactionHistory);
    

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [token, navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('onboarded');
    setToken(null); // Update context
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'FinalizeOnboarding' }],
      })
    );
  };

  const hexToRgba = (hex: string, opacity: number): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  console.log(`Transaction History Stuff:`,  transactionHistory); // the transactionFees and address didn't yet received
  

  return (
    <CustomContainer>
      <StatusBar backgroundColor={'#304FFE'} barStyle={'light-content'} />
      <View className="bg-background-accent pb-16 w-full flex items-center">
        <Pressable
          onPress={handleLogout}
          className="flex justify-end items-end w-full pr-4 pt-2">
          <AntDesign name="logout" size={25} color="#FFFFFF" />
        </Pressable>
        <View className="items-center">
          <Text className="text-white font-bold text-clip text-4xl mt-4">
            SDG {rate}
          </Text>
          <Text className="text-white">Exchange Rate</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionReceiverCountry')}
            className="flex flex-row gap-x-2 items-center mt-2 bg-transparent border-2 border-white p-3 rounded-full">
            <FontAwesome name="plus-circle" size={18} color="#FFFFFF" />
            <Text className="text-white text-base">معاملة جديدة</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mb-3 ml-5 mr-2 mt-5">
        <Text className="text-content-secondary text-2xl font-semibold">
          Transactions
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransactionsTab')}>
          <AntDesign name="arrowright" size={28} color="#2A2A2A" />
        </TouchableOpacity>
      </View>
      <View className="mx-5 rounded-2xl">
        <FlatList
          data={transactionHistory}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TransactionDetails', {
                  receiverCountry: item?.Country,
                  name: item?.recieverName,
                  RealPhoneNumber: item?.recieverPhone,
                  address: item?.address,
                  purpose: item?.purposeOfTransaction,
                  amount: item?.TransactionAmount,
                  date: item?.updatedAt,
                  transactionID: item?.senderID,
                  paymentProof: item.PaymentProof,
                  status: item.PaymentStatus,
                  color: item.color,
                  icon: item.icon,
                  TransactionFees: item?.TransactionFees,
                })
              }
              className="bg-white py-5 px-4 rounded-lg flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-x-2">
                <Text
                  style={{ color: hexToRgba(item?.color, 1) }}
                  className="text-lg font-medium">
                  ${item?.TransactionAmount}
                </Text>
              </View>
              <View className="flex flex-row gap-x-2 items-center">
                <Text className="text-lg font-medium text-content-secondary">
                  {item?.recieverName}
                </Text>
                <View
                  style={{ backgroundColor: hexToRgba(item?.color, 0.6) }}
                  className="flex items-center justify-center p-4 rounded-full"
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View className="h-px w-[80%] self-center bg-content-tertiary/20" />
          )}
        />
      </View>
    </CustomContainer>
  );
};

export default HomeTab;
