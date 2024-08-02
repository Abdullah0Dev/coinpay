import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';

type CustomWrapperProps = {
  children: ReactNode;
  progress?: number;
};

const CustomWrapper = ({children, progress = 0}: CustomWrapperProps) => {
  return (
    <FlatList
      data={[{key: '1'}]}
      renderItem={() => (
        <View className=" w-[100vw] h-[100vh] bg-white">
          <View className="w-full h-1 bg-content-tertiary/20 ">
            {/* progress with primary color */}
            <View
              style={{width: `${progress}%`}}
              className=" bg-primary rounded-full h-full"
            />
          </View>
          <View className="mx-5">{children}</View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CustomWrapper;
