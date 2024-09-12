import {View, Text, Image, StatusBar, Linking} from 'react-native';
import React from 'react';
import images from '../constants/images';
import {CustomButton, CustomContainer} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../constants/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SupportScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const openWhatsApp = () => {
    const phoneNumber = '+249116461085';
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://wa.me/${phoneNumber}`;
    Linking.canOpenURL(appUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(appUrl);
        } else {
          return Linking.openURL(webUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const openFAQ = () => {
    const randomFAQ = 'https://www.elrasilmobile.com/info';
    Linking.canOpenURL(randomFAQ).then(() => Linking.openURL(randomFAQ));
  };
  return (
    <CustomContainer>
      <View className="w-full bg-[#F7F7F7] h-full flex flex-col flex-1 items-center gap-y-16 ">
        <StatusBar backgroundColor={'#F7F7F7'} barStyle={'dark-content'} />
        <Text className="text-content-primary text-xl font-semibold text-clip ">
          الدعم
        </Text>
        <Image
          source={images.support}
          resizeMode="contain"
          className="item-center"
        />
        {/* title */}
        <View className="mx-2 items-center">
          <Text className="text-4xl  text-center text-content-primary font-semibold">
            Elrasil Support
          </Text>
          <Text
            className="text-lg text-center 
         text-content-secondary font-normal">
            Our dedicated team is available if you have any questions about ELRASIL app .
          </Text>
        </View>
        <View className="w-full self-center items-center ">
          <CustomButton
            containerStyle=" bg-primary "
            handlePress={openWhatsApp}
            title="Start conversation"
          />
          <CustomButton
            containerStyle=" bg-transparent border-primary/50 border-2 mt-5"
            textStyle="text-primary"
            handlePress={openFAQ}
            title="View FAQs"
          />
        </View>
      </View>
    </CustomContainer>
  );
};

export default SupportScreen;
