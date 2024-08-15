import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomContainer} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../constants/types';

const TransactionsTab = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const {token} = useAuth();
  const navigation =
  useNavigation<
    NativeStackNavigationProp<RootTabParamList & RootStackParamList>
  >();
  const hexToRgba = (hex: string, opacity: number): string => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      // if it's #FFF
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      // if it's #FFFFFF
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useEffect(() => {
    if (!token) {
      console.log('Token is not available');
      // Navigate to Finalize Onboarding screen if token is not available
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'FinalizeOnboarding'}],
        }),
      );
      return; // Exit early if no token is available
    }
    const fetchData = async () => {
      try {
        const transactionHistoryData = await axios.get(
          'https://api.elrasilmobile.com/API/app/transactions',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Add color based on PaymentStatus
        const transactionsWithColor = transactionHistoryData.data.map(
          transaction => {
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
            return {...transaction, color, icon};
          },
        );

        // Limit to 6 transactions
        setTransactionHistory(transactionsWithColor.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [token]); // No dependencies to ensure the effect runs once on mount

  return (
    <CustomContainer>
      <Text className="text-content-primary text-2xl text-center my-3 font-bold ">
        {' '}
        آخر التحويلات{' '}
      </Text>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <FlatList
        data={transactionHistory}
        renderItem={({item}) => (
          <View className="bg-white py-5 px-4 rounded-lg flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-2">
              <Text
                style={{color: `${hexToRgba(item?.color, 1)}`}}
                className={`text-lg font-medium`}>
                ${item?.TransactionAmount}
              </Text>
            </View>
            <View className="flex flex-row gap-x-2 items-center">
              <Text className="text-lg  font-medium text-content-secondary">
                {' '}
                {item?.recieverName}{' '}
              </Text>
              <View
                style={{backgroundColor: `${hexToRgba(item?.color, 0.6)}`}}
                className={`flex  items-center justify-center  p-2 rounded-full `}>
                <AntDesign name={item.icon} size={15} color={'#FFFFFF'} />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View className="h-px w-[80%] self-center bg-content-tertiary/20" />
        )}
      />
    </CustomContainer>
  );
};

export default TransactionsTab;

// check => AntDesign = النجاح
// warning => AntDesign = التحذير
// close => AntDesign = الفشل

type Transaction = {
  icon: string;
  title: string;
  amount: string;
  color: string;
};

const transactionList: Transaction[] = [
  {
    icon: 'close',
    title: 'أمازون',
    amount: '$3000.00',
    color: '#F44336', // الفشل
  },
  {
    icon: 'warning',
    title: 'آبل',
    amount: '$800.00',
    color: '#FDD835', // التحذير
  },
  {
    icon: 'check',
    title: 'جوجل',
    amount: '$1000.00',
    color: '#66BB6B', // النجاح
  },
  {
    icon: 'check',
    title: 'وول مارت',
    amount: '$150.00',
    color: '#66BB6B', // النجاح
  },
  {
    icon: 'warning',
    title: 'مايكروسوفت',
    amount: '$2000.00',
    color: '#FDD835', // التحذير
  },
  {
    icon: 'close',
    title: 'تسلا',
    amount: '$3500.00',
    color: '#F44336', // الفشل
  },
  {
    icon: 'check',
    title: 'نايكي',
    amount: '$120.00',
    color: '#66BB6B', // النجاح
  },
  {
    icon: 'close',
    title: 'أديداس',
    amount: '$250.00',
    color: '#F44336', // الفشل
  },
  {
    icon: 'warning',
    title: 'سامسونج',
    amount: '$1800.00',
    color: '#FDD835', // التحذير
  },
  {
    icon: 'check',
    title: 'سوني',
    amount: '$900.00',
    color: '#66BB6B', // النجاح
  },
  {
    icon: 'close',
    title: 'فيسبوك',
    amount: '$500.00',
    color: '#F44336', // الفشل
  },
  {
    icon: 'warning',
    title: 'نتفليكس',
    amount: '$1200.00',
    color: '#FDD835', // التحذير
  },
];
