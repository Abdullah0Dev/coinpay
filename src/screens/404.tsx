import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import images from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const NotFoundScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <View className="bg-white h-full w-full ">
        <Image
          source={images.notFound}
          resizeMode="contain"
          className="item-center self-center"
        />
        <View className=" h-[10%]" />
        <View className="mx-2 flex  flex-col items-center justify-center ">
          {/* title */}
          <Text className="text-4xl text-center text-content-primary font-bold">
            خطأ 404 {"\n"} Page Not Found
          </Text>
          {/* description */}
          <Text className="text-base text-center mt-2  text-content-tertiary ">
            عذرًا! يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
          </Text>
        </View>
        <CustomButton
          title="العودة إلى الرئيسية"
          containerStyle={` bg-primary mt-9 self-center `}
          textStyle={`   `}
          handlePress={() => navigation.navigate('Home')}
        />
        <StatusBar barStyle={'dark-content'} />
      </View>
    </>
  );
};

export default NotFoundScreen;
