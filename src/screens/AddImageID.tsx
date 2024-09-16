import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonActions} from '@react-navigation/native';

import {
  ImageLibraryOptions,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import {Image} from 'react-native'; 
import axios from 'axios';

type ScreenRouteProps = RouteProp<RootStackParamList, 'AddImageID'>;

type ImageProps = {
  route: ScreenRouteProps;
};

const AddImageID: React.FC<ImageProps> = ({route}) => {
  const {RealPhoneNumber, firstName, lastName, password} =
    route.params || {};
  const [idImage, setIdImage] = useState<Asset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    setLoading(true);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const selectedImage = response.assets[0];
        setIdImage(selectedImage);
        console.log('Image', selectedImage.uri);
      }
      setLoading(false);
    });
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('ID', {
      name: idImage?.fileName,
      uri: idImage?.uri,
      type: idImage?.type,
    });
    formData.append('mobile', RealPhoneNumber);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    // formData.append('email', email);
    formData.append('password', password);
    console.log(idImage, {...route.params});
    console.log(`form data`, formData);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.elrasilmobile.com/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      if (response.status !== 200) {
        const message = "User already exists, Please make sure you enter a uniqe number";
        throw new Error(message);
      }

      const data = response.data;
      console.log('User created successfuly:', data);
      // After successful sign up
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || error.message || 'Failed to sign up.';
    Alert.alert('Error', errorMessage);
    console.log(error.message);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomWrapper progress={60}>
      <HeadInfo
        title={'Please upload a valid ID'}
        subtitle={
          'This information must be accurate'
        }
      />
      <TouchableOpacity
        onPress={pickImage}
        className={` ${
          loading || idImage ? 'bg-white' : 'h-52'
        } border border-gray-400 w-full justify-center bg-blue-200/10 p-4 rounded-lg items-center`}>
        {loading ? (
          <ActivityIndicator size="large" color="#0A7AFF" />
        ) : idImage ? (
          <Image
            source={{uri: idImage.uri}}
            style={{width: '100%', height: 200, borderRadius: 10}}
            resizeMode="contain"
          />
        ) : (
          <View className="flex flex-col gap-y-1 items-center justify-center">
            <AntDesign name="upload" color={'#0A7AFF'} size={32} />
            <Text className={'text-xl text-black '}>
              Upload your ID
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="h-[35vh]" />
      <CustomButton 
        title="Next"
        containerStyle={` ${
          !idImage ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${!idImage ? 'text-content-tertiary' : ' text-white'}  `}
        handlePress={submitForm}
        isLoading={loading}
      />
    </CustomWrapper>
  );
};

export default AddImageID;
