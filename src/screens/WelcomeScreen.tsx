import {View, Text, Image} from 'react-native';
import React from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import images from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const WelcomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <View className="flex items-center justify-start w-full">
        <View className="h-[10%] " />
        <Image
          source={images.onboardImage1}
          resizeMode="contain"
          className="item-center"
        />
        <View className="mx-2 flex  flex-col items-center justify-center ">
          {/* title */}
          <Text className="text-4xl text-center text-content-primary font-bold">
            Congratulations! {"\n"} Welcome to CoinPay
          </Text>
          {/* description */}
          <Text className='text-base text-center mt-2  text-content-tertiary font-semibold'> We are happy to have you it's time to send, receive and track your expense </Text>
        </View>
        <View className="h-[30%]" />
        <CustomButton
          title="Continue"
          containerStyle={` bg-primary `}
          textStyle={` ' text-white'}  `}
          handlePress={() => navigation.navigate('CardSetup')}
        />
      </View>
    </>
  );
};

export default WelcomeScreen;
