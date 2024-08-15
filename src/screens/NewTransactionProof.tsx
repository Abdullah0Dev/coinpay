import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {CommonActions, RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Image} from 'react-native';
import client from '../api/client';
import {useAuth} from '../context/AuthContext';

type ScreenRouteProps = RouteProp<
  RootStackParamList,
  'TransactionPaymentProof'
>;

type EmailProps = {
  route: ScreenRouteProps;
};

const NewTransactionProof: React.FC<EmailProps> = ({route}) => {
  const {RealPhoneNumber, address, amount, name, purpose, receiverCountry} =
    route.params || {};
  const [idImage, setIdImage] = useState<Asset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState('');
  const {token} = useAuth();
  const [transactionID, setTransactionID] = useState('');
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
    if (!token) {
      console.log('Token is not available');
      // Navigate to Finalize Onboarding screen if token is not available
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'FinalizeOnboarding'}],
        }),
      );
      return; // Exit early if no token is available
    }
    const formData = new FormData();
    formData.append('ID', {
      name: idImage?.fileName,
      uri: idImage?.uri,
      type: idImage?.type,
    });
    formData.append('recieverPhone', RealPhoneNumber);
    formData.append('recieverEmail', address);
    formData.append('Country', receiverCountry);
    formData.append('TransactionAmount', amount);
    formData.append('recieverName', name);
    formData.append('purposeOfTransaction', purpose);
    console.log('form data', formData);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.elrasilmobile.com/API/app/transaction',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const data = response.data;

      // Update states and then navigate after the states are set
      setDate(data?.createdAt);
      setTransactionID(data?._id);

      // Use useEffect to handle navigation after states are updated
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to navigate after states are updated
  useEffect(() => {
    if (date && transactionID) {
      navigation.navigate('PaymentReceipt', {
        ...route.params,
        date,
        transactionID,
      });
    }
  }, [date, transactionID ]);

  return (
    <CustomWrapper progress={100}>
      <HeadInfo
        title={'قم بتحميل صورة إثبات الدفع!'}
        subtitle={
          'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'
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
              قم بتحميل صورة الهوية الخاصة بك
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="h-[33vh]" />
      <CustomButton
        value={idImage?.uri}
        title="التالى"
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

export default NewTransactionProof;
