import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../constants/images';
import {CustomButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../constants/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const FinalizeOnboarding = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="w-full h-full flex bg-white flex-col flex-1 items-center gap-y-16 ">
      <Image
        source={images.signup}
        resizeMode="contain"
        className="item-center"
      />
      {/* title */}
      <View className="mx-2 items-center">
        <Text className="text-3xl text-center text-content-primary font-semibold">
          أنشئ حسابك في الراسل
        </Text>
        <Text className="text-lg text-center text-content-secondary font-semibold">
          الراسل هو أداة قوية تتيح لك بسهولة إرسال واستقبال وتتبع جميع معاملاتك
        </Text>
      </View>
      <View className="w-full self-center items-center ">
        <CustomButton
          containerStyle=" bg-primary "
          handlePress={() =>navigation.replace('SignUp')}
          title="انشاء حساب"
        />
        <CustomButton 
          containerStyle=" bg-white border-primary/50 border-2 mt-5"
          textStyle="text-primary"
          handlePress={() => navigation.replace('SignIn')}
          title="تسجيل الدخول"
        />
      </View>
      <View className="">
        <Text className="text-lg text-center text-content-tertiary font-semibold ">
          من خلال المتابعة، أنت تقبل{' '}
          <Text className="text-primary underline"> شروط الخدمة </Text> و{' '}
          <Text className="text-primary underline"> سياسة الخصوصية </Text>
        </Text>
      </View>
    </View>     
  );
};

export default FinalizeOnboarding;
