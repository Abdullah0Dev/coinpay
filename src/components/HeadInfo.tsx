import {View, Text} from 'react-native';
import React from 'react';

interface HeadInfoProps {
    title?: string;
    subtitle?: string;
}

const HeadInfo: React.FC<HeadInfoProps> = ({title, subtitle}) => {
  return (
    <View className='justify-start py-5 items-start'>
     
        <Text className="text-content-primary font-bold text-3xl">
         {title}
        </Text>
        <Text className="text-content-secondary font-semibold text-lg">
          {subtitle}
        </Text>
    </View>
  );
};

export default HeadInfo;
