import {View, Text, Image} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import { OnboardingItemProps } from '../constants/data';
  

const OnboardingItem: React.FC<OnboardingItemProps & {handleNextPress: () => void}> = ({source, title, route, active, handleNextPress}) => {
    return (
    <View className="flex flex-1 flex-col justify-around items-center w-[100vw]">
        <View className='h-[10%]' />
      <Image
        source={source}
        resizeMode="contain"
        className="item-center"
      />
      <View className="flex flex-row items-center justify-between w-28">
        <Image
          source={active === 1 ? require('../assets/images/activeOnboarding.png') : require('../assets/images/nonActiveOnboarding.png')}
          resizeMode="contain"
          className="item-center"
        />
        <Image
          source={active === 2 ? require('../assets/images/activeOnboarding.png') : require('../assets/images/nonActiveOnboarding.png')}
          resizeMode="contain"
          className="item-center"
        />
        <Image
          source={active === 3 ? require('../assets/images/activeOnboarding.png') : require('../assets/images/nonActiveOnboarding.png')}
          resizeMode="contain"
          className="item-center"
        />
      </View>
      <View className='mx-2 '>
        {/* title */}
        <Text className="text-3xl  text-content-primary font-semibold">
            {title}
        </Text>
      </View>
      <CustomButton containerStyle=' bg-primary '  handlePress={handleNextPress} title="Next" />
    </View>
  );
};

export default OnboardingItem;
