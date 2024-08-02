import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Image } from 'react-native';

const AddImageID = () => {
  const [idImage, setIdImage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // (options?, callback);
  const pickImage = async () => {
    setLoading(true);
    //  options
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    // callback
    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const uri = response.assets[0].uri;
        if (uri) {
          setIdImage(prevImages => [...prevImages, uri]);
        }
        setLoading(false);
      }
    });
  };

  return (
    <CustomWrapper progress={30}>
      <HeadInfo
        title={'Upload a picture of your ID'}
        subtitle={'This info needs to be accurate with your ID document.'}
      />
      <TouchableOpacity
        onPress={pickImage}  
        className={` ${
          loading || idImage.length ? 'bg-white' : 'h-52'
        } border border-gray-400 w-full justify-center bg-blue-200/10 p-4 rounded-lg items-center`}>
        {loading ? (
          <ActivityIndicator size="large" color="#0A7AFF" />
        ) : idImage.length ? (
          <Image
            source={{ uri: idImage[idImage.length - 1] }}
            style={{ width: '100%', height: 200, borderRadius: 10 }}
            resizeMode="contain"
          />
        ) : (

          <View className="flex flex-col gap-y-1 items-center justify-center">
            <AntDesign name="upload" color={'#0A7AFF'} size={32} />
            <Text className={'text-xl text-black '}>
              Upload your Image ID
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="h-[45vh]" />
      <CustomButton
        title="Continue"
        containerStyle={` ${!idImage ? 'bg-content-disabled' : 'bg-primary '}  `}
        textStyle={` ${!idImage ? 'text-content-tertiary' : ' text-white'}  `}
        handlePress={() => navigation.navigate('Welcome')}
      />
    </CustomWrapper>
  );
};

export default AddImageID;
