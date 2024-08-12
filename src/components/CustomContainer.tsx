import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';

type CustomContainerProps = {
  children: ReactNode;
  className?: string;
};

const CustomContainer = ({children, className = ''}: CustomContainerProps) => {
  return (
    <FlatList
      data={[{key: '1'}]}
      renderItem={() => (
        <View className={" w-full h-full pb-28 bg-[#F7F7F7]" + className}>{children}</View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CustomContainer;
