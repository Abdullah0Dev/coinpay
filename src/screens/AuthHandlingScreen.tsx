import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../constants/images';
import {CustomButton} from '../components';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';

const AuthHandlingScreen = () => {

    const navigation = useNavigation<RootStackParamList>()
        navigation.navigate('SignIn');

  return (
    <View className="w-full h-full flex flex-col flex-1 items-center gap-y-16 ">
      <Image
        source={images.onboardImage1}
        resizeMode="contain"
        className="item-center"
      />
      {/* title */}
      <View className="mx-2 items-center">
        <Text className="text-3xl  text-center text-content-primary font-semibold">
          Create your Coinpay account
        </Text>
        <Text className="text-lg text-center  text-content-secondary font-semibold">
          Coinpay is a powerful tool that allows you to easily send, receive,
          and track all your transactions
        </Text>
      </View>
      <View className="w-full self-center items-center ">
        <CustomButton
          containerStyle=" bg-primary "
          handlePress={() => console.log('signup')}
          title="Sign up"
        />
        <CustomButton
          containerStyle=" bg-white border-primary/50 border-2 mt-5"
          textStyle="text-black"
          handlePress={() => console.log('signin')}
          title="Log in"
        />
      </View>
      <View className="">
        <Text className="text-lg text-center  text-content-tertiary font-semibold ">
          By continuing you accept our{' '}
          <Text className="text-primary underline"> Term of Service </Text> and{' '}
          <Text className="text-primary underline"> Privacy Policy </Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthHandlingScreen;
