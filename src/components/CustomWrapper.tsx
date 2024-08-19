import {View, Text, FlatList, StatusBar} from 'react-native';
import React, {ReactNode} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomWrapperProps = {
  children: ReactNode;
  progress?: number;
};

const CustomWrapper = ({children, progress = 0}: CustomWrapperProps) => {
  return (
    <SafeAreaView>
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
          <View className="mx-5 bg-white">{children}</View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
 <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
</SafeAreaView>
  );
};

export default CustomWrapper;
