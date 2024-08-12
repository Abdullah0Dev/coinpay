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
    {/*  className="flex items-center justify-start w-full" */}
      <CustomWrapper progress={100}>
        <View className="h-[10%] " />
        <Image
          source={images.welcome}
          resizeMode="contain"
          className="item-center"
        />
        <View className="mx-2 flex  flex-col items-center justify-center ">
          {/* title */}
          <Text className="text-4xl text-center text-content-primary font-bold">
            تهانينا! {"\n"} مرحبًا بك في الراسل
          </Text>
          {/* description */}
          <Text className='text-base text-center mt-2  text-content-tertiary font-semibold'> نحن سعداء بوجودك، حان الوقت لإرسال واستقبال وتتبع نفقاتك </Text>
        </View>
        <View className="h-[25%]" />
        <CustomButton
          title="ابدأ"
          containerStyle={` bg-primary `}
          textStyle={` ' text-white'}  `}
          handlePress={() => navigation.navigate('Home')}
        />
      </CustomWrapper>
    </>
  );
};

export default WelcomeScreen;
