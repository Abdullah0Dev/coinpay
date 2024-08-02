import {View, Text, TextInput, StatusBar} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeTab = () => {
  return (
    <View className="">
      <View className="bg-background-accent py-8 pb-16 w-full flex   items-center">
        {/* search header */}
        <View className="flex flex-row justify-between gap-x-3 items-center">
          <FontAwesome name="bell" size={23} color="#FFFFFF" />
          <View
            className="flex flex-row items-center gap-x-2 bg-background-accentLight/20
       py-3 px-4 rounded-full justify-start">
            <FontAwesome name="search" size={20} color="#FFFFFF" />
            <TextInput
              placeholder="Search 'Payments'"
              className="w-8/12 bg-transparent text-xl py-1 "
            />
          </View>
          <FontAwesome name="bell" size={23} color="#FFFFFF" />
        </View>
        {/* balance */}
        <View className="flex flex-row gap-x-1 mt-4 items-center">
          <Text className="text-white text-base "> US Dollars </Text>
          <FontAwesome name="chevron-down" size={18} color="#FFFFFF" />
        </View>
        {/* balance number */}
        <View>
          <Text className="text-white font-bold text-clip text-4xl mt-4">
            $ 1,000.00
          </Text>
          <Text className="text-white ">Available Balance</Text>
          <View className="flex flex-row gap-x-2 items-center mt-2 bg-transparent border-2 border-white p-3 rounded-full">
            <FontAwesome name="plus-circle" size={18} color="#FFFFFF" />
            <Text className="text-white text-base">Add Money</Text>
          </View>
        </View>
      </View>
      {/* actions */}
      <View className="flex flex-row justify-between mx-5 items-center bg-white py-5 px-9 rounded-2xl -mt-10">
        <View className="flex flex-col items-center">
          <FontAwesome name="arrow-up" size={30} color="#304FFE" />
          <Text className="text-black text-base">Send</Text>
        </View>
        <View className="flex flex-col items-center">
          <FontAwesome name="arrow-up" size={30} color="#304FFE" />
          <Text className="text-black text-base">Request</Text>
        </View>
        <View className="flex flex-col items-center">
          <FontAwesome name="arrow-up" size={30} color="#304FFE" />
          <Text className="text-black text-base">Bank</Text>
        </View>
      </View>
      {/* transaction */}
      <View className='flex flex-row justify-between items-center  mx-5 mt-5'>
        <Text className="text-content-secondary text-2xl font-semibold">
          Transaction
        </Text>
        <AntDesign name="arrowright" size={28} color="#2A2A2A" />
      </View>
      {/* transaction list */}
      <View className='bg-white py-5 px-8 rounded-lg flex flex-col items-center'>
       <View className='flex flex-row '>
        <FontAwesome name="arrow-up" size={30} color="#304FFE" />
       </View>
<View>
  <Text className='text-black text-3xl self-center mt-9'>this page Still under development 💻🚀</Text>
  <Text className='text-black text-3xl self-center mt-9'>ما زال قيد التطوير 💻🚀</Text>
</View>
      </View>
      <StatusBar backgroundColor={'#304FFE'} />
    </View>
  );
};

export default HomeTab;
