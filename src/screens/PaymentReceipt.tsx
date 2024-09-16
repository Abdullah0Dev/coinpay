import {View, Text, FlatList, StatusBar} from 'react-native';
import React from 'react';
import {CustomContainer} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from '../constants/types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
type ScreenRouteProps = RouteProp<RootStackParamList, 'PaymentReceipt'>;

type AmountProps = {
  route: ScreenRouteProps;
};

const PaymentReceipt: React.FC<AmountProps> = ({route}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList & RootTabParamList>
    >();
  const {
    RealPhoneNumber,
    address,
    amount,
    name,
    purpose,
    receiverCountry,
    date,
    TransactionFees,
    transactionID,
  } = route.params || {};

  /**
     
Address
Amount
Name
Country
Transaction date
     */
  const formattedDate = date?.split('T')[0];

  const PaymentReceiptData = [
    {
      item: 'Transaction date',
      value: formattedDate,
    },
    {
      item: 'Name',
      value: name,
    },
    {
      item: 'Address',
      value: address,
    },
    {
      item: 'Country',
      value: receiverCountry,
    },
    {
      item: 'Amount',
      value: amount,
    },
    {
      item: 'Transaction fees',
      value: `${TransactionFees} SGD`,
    },
    {
      item: 'Phone',
      value: RealPhoneNumber,
    },
    {
      item: 'TransactionID',
      value: transactionID,
    },
  ];

  return (
    <CustomContainer>
      {/* Status */}
      <View className="px-4 py-12 bg-white rounded-2xl my-9 mx-5 flex justify-center items-center">
        <View className="flex justify-center items-center p-2 rounded-full bg-content-success">
          <AntDesign name="check" size={28} color="#FFFFFF" />
        </View>
        <Text className="text-content-success text-2xl font-bold uppercase">
          Transaction Sent
        </Text>
      </View>
      {/* Receipt Data */}
      <View className="bg-white rounded-2xl py-5 my-9 mx-5">
        <Text className="text-content-primary mb-4 text-center text-2xl font-semibold">
          Payment Reciept {name}
        </Text>

        <FlatList
          data={PaymentReceiptData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              className={`flex flex-row flex-wrap ${
                item.item === 'TransactionID' && 'flex-col flex-nowrap'
              } justify-between px-5 py-3`}>
              {item.item === 'TransactionID' && (
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
              {item.item !== 'TransactionID' && (
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
          title="Home Page"
          handlePress={() =>
            navigation.navigate('HomeTab', {
              receiverCountry,
              name,
              RealPhoneNumber,
              address,
              purpose,
              amount,
              date,
              transactionID,
              TransactionFees,
            })
          }
          containerStyle={`bg-primary`}
          textStyle={` text-white `}
        />
        {/* 
Argument of type '["Home", { receiverCountry?: string | undefined; name?: string | undefined; RealPhoneNumber?: string | undefined; address?: string | undefined; purpose?: string | undefined; amount?: string | undefined; date?: string | undefined; TransactionFees?: number | undefined; transactionID?: string | undefined; }]' is not assignable to parameter of type '[screen: "Home"] | [screen: "Home", params: { receiverCountry: string; name: string; RealPhoneNumber: string; address: string; purpose: string; amount: string; date: string; transactionID: string; TransactionFees: number; } | undefined]'.
  Type '["Home", { receiverCountry?: string | undefined; name?: string | undefined; RealPhoneNumber?: string | undefined; address?: string | undefined; purpose?: string | undefined; amount?: string | undefined; date?: string | undefined; TransactionFees?: number | undefined; transactionID?: string | undefined; }]' is not assignable to type '[screen: "Home", params: { receiverCountry: string; name: string; RealPhoneNumber: string; address: string; purpose: string; amount: string; date: string; transactionID: string; TransactionFees: number; } | undefined]'.
    Type at position 1 in source is not compatible with type at position 1 in target.
      The types of 'receiverCountry' are incompatible between these types.
        Type 'string | undefined' is not assignable to type 'string'.
          Type 'undefined' is not assignable to type 'string'.
        */}
      </View>
      <StatusBar backgroundColor={'#F7F7F7'} barStyle={'dark-content'} />
    </CustomContainer>
  );
};

export default PaymentReceipt;
