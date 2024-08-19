import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomContainerProps = {
  children: ReactNode;
  className?: string;
};

const CustomContainer = ({children, className = ''}: CustomContainerProps) => {
  return (
    <SafeAreaView>
    <FlatList
      data={[{key: '1'}]}
      renderItem={() => (
        <View className={" w-full h-full pb-28 bg-[#F7F7F7]" + className}>{children}</View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    </SafeAreaView>
  );
};

export default CustomContainer;
