import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomButton, HeadInfo} from '../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import {useNavigation} from '@react-navigation/native';

const CardList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="bg-[#F7F7F7]  h-full px-5">
      <View className="  flex items-center">
        <View className=" py-2 flex self-center flex-row w-full gap-x-2 items-center justify-start px-4 rounded-xl bg-background-successLight">
          <View className="w-8 h-8 rounded-full p-1 items-center bg-background-success flex justify-center">
            <AntDesign name="check" size={15} color="#FFFFFF" />
          </View>
          <Text className="text-content-success text-lg font-semibold">
            Your card successfully added
          </Text>
        </View>
      </View>

      <View className="w-full  ">
        <HeadInfo
          title={'Card list'}
          subtitle={'Enter your credit card info into the below box.'}
        />
      </View>
      {/* card list */}
      <View className="flex flex-row gap-x-5 py-4 px-4 rounded-2xl self-center w-full bg-white items-center justify-start">
        <AntDesign name="creditcard" size={30} color="#D8D2D2" />
        <Text className="text-content-tertiary text-lg font-semibold">
          **** **** **** 1234
        </Text>
      </View>
      <View className='h-[50%]' />

      <View className="w-full self-center items-center ">
        <CustomButton
          containerStyle=" bg-primary "
          handlePress={() => navigation.navigate('CardSetup')}
          title="+ Add your card"
        />
        <CustomButton
          containerStyle=" bg-white border-primary/50 border-2 mt-5"
          textStyle="text-black"
          handlePress={() => navigation.navigate('Home')}
          title="Continue"
        />
      </View>
      <StatusBar backgroundColor="#304FFF"  />
    </View>
  );
};

export default CardList;
