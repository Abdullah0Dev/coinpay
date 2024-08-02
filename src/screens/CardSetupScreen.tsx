import {View, Text, Image} from 'react-native';
import React from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import images from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const CardSetupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <View className=" ">
       
        <Image
          source={images.onboardImage1}
          resizeMode="contain"
          className="item-center self-center"
        />
         <View className=" h-[10%]" />
        <View className="mx-2 flex  flex-col items-center justify-center ">
          {/* title */}
          <Text className="text-4xl text-center text-content-primary font-bold">
          Let's Add your Card
          </Text>
          {/* description */}
          <Text className='text-base text-center mt-2  text-content-tertiary font-semibold'> 
          Add your card to make transactions easier and faster
          </Text>
        </View>
        <View className=" h-[36%]" />
        <CustomButton
          title="+ Add your card"
          containerStyle={` bg-primary self-center `}
          textStyle={` ' text-white'}  `}
          handlePress={() => navigation.navigate('AddCard')}
        />
      </View>
    </>
  );
};

export default CardSetupScreen;
