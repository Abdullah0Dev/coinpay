import {View, Text, FlatList, StatusBar} from 'react-native';
import React from 'react';
import {CustomContainer} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import jestConfig from '../../jest.config';
type ScreenRouteProps = RouteProp<RootStackParamList, 'TransactionDetails'>;

type AmountProps = {
  route: ScreenRouteProps;
};

const TransactionDetailsScreen: React.FC<AmountProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    RealPhoneNumber,
    address,
    amount,
    name,
    receiverCountry,
    date,
    transactionID,
    status,
    color,
    icon,
    paymentProof,
    purpose,
    TransactionFees,
  } = route.params || {};
  console.log({...route.params});

  type PaymentIcon = 'warning' | 'close' | 'check';

  interface PaymentStatusResult {
    text: string;
  }
  
  const PaymentStatus = (icon: PaymentIcon): PaymentStatusResult => {
    let text: string;
  
    switch (icon) {
      case 'warning':
        text = 'العملية قيد المراجعة';
        break;
      case 'close':
        text = 'فشلت العملية';
        break;
      case 'check':
        text = 'تمت العملية بنجاح';
        break;
      default:
        text = 'العملية قيد المراجعة';
    }
  
    return { text };
  };
  

  const formattedDate = date?.split('T')[0];

  const PaymentReceiptData = [
    {
      item: 'تاريخ المعاملة',
      value: formattedDate,
    },
    {
      item: 'الاسم',
      value: name,
    },
    {
      item: 'العنوان',
      value: address,
    },
    {
      item: 'البلد',
      value: receiverCountry,
    },
    {
      item: 'المبلغ',
      value: amount,
    },
    {
      item: 'رسوم الخدمة',
         value: `${TransactionFees} SGD`,
    },
    {
      item: 'رقم الهاتف',
      value: RealPhoneNumber,
    },
    {
      item: 'رقم الرمز',
      value: transactionID,
    },
  ];

  return (
    <CustomContainer>
      {/* Status */}
      <View className="px-4 py-12 bg-white rounded-2xl my-9 mx-5 flex justify-center items-center">
        <View
          style={{backgroundColor: color}}
          className="flex justify-center items-center p-2 rounded-full">
          <AntDesign name={icon} size={28} color="#FFFFFF" />
        </View>
        <Text style={{color}} className=" text-2xl font-bold uppercase">
        {PaymentStatus(icon).text}
        </Text>
      </View>
      {/* Receipt Data */}
      <View className="bg-white rounded-2xl py-5 my-9 mx-5">
        <Text className="text-content-primary mb-4 text-center text-2xl font-semibold">
          إيصال دفع {name}
        </Text>

        <FlatList
          data={PaymentReceiptData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              className={`flex flex-row flex-wrap ${
                item.item === 'رقم الرمز' && 'flex-col flex-nowrap'
              } justify-between px-5 py-3`}>
              {item.item === 'رقم الرمز' && (
                <Text className="text-content-primary font-bold text-xl">
                  {item.item}
                </Text>
              )}
              <Text
                className={`text-content-primary text-xl ${
                  item.item === 'Biller Name' ? 'font-bold' : ''
                }`}>
                {item.value}
              </Text>
              {item.item !== 'رقم الرمز' && (
                <Text className="text-content-primary font-bold text-xl">
                  {item.item}
                </Text>
              )}
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View className="h-px w-[80%] self-center bg-content-tertiary/80" />
          )}
        />
      </View>
      <View className="w-full items-center justify-center">
        <CustomButton
          title="الصفحة الرئيسية"
          handlePress={() => navigation.goBack()}
          containerStyle={`bg-primary`}
          textStyle={` text-white `}
        />
      </View>
      <StatusBar backgroundColor={'#F7F7F7'} barStyle={'dark-content'} />
    </CustomContainer>
  );
};

export default TransactionDetailsScreen;
