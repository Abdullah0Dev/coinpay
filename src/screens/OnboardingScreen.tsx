import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from 'react-native';
import {OnboardingItem} from '../components';
import {onboardingData} from '../constants/data';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../constants/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setItem} from '../../utils/AsyncStorage';

const {width, height} = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPress = async () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    } else {
      await setItem('onboarded', 200);
      navigation.navigate('FinalizeOnboarding');
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={{flex: 1}} className="bg-[#F7F7F7]">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({item}) => (
          <OnboardingItem
            active={item.active}
            route={item.route}
            source={item.source}
            title={item.title}
            handleNextPress={handleNextPress}
          />
        )}
        keyExtractor={item => item.active.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{width, height}}
        onMomentumScrollEnd={handleScroll}
      />
      <StatusBar backgroundColor={'#F7F7F7'} barStyle={'dark-content'} />
    </View>
  );
};

export default OnboardingScreen;
