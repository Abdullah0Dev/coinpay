import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const AddAddress = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postCodeError, setPostCodeError] = useState('');
  const [form, setForm] = useState({
    address: '',
    city: '',
    postCode: '',
  });
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={30}>
      <HeadInfo
        title={'Home Address'}
        subtitle={'This info needs to be accurate with your ID document.'}
      />
      <FormField
        title="Address Line"
        value={form.address}
        setError={setAddressError}
        error={addressError}
        handleChangeText={(e: any) => {
          setAddressError('');
          setForm({...form, address: e});
        }}
        otherStyles="mt-7"
        keyboardType="address-address"
        placeholder={`Mr. John Doe`}
      />
      <FormField
        title="City"
        value={form.city}
        setError={setCityError}
        error={cityError}
        handleChangeText={(e: any) => {
          setAddressError('');
          setForm({...form, city: e});
        }}
        otherStyles="mt-7"
        keyboardType="address-address"
        placeholder={`City, State`}
      />
      <FormField
        title="Address Line"
        value={form.postCode}
        setError={setPostCodeError}
        error={postCodeError}
        handleChangeText={(e: any) => {
          setPostCodeError('');
          setForm({...form, postCode: e});
        }}
        otherStyles="mt-7"
        keyboardType="number-pad"
        placeholder={`Ex: 0000`}
      />
      <View className="h-[45vw]" />
      <CustomButton
      value={form.address || form.city || form.postCode}
        title="Continue"
        containerStyle={` ${
          form.address == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.address == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('AddPersonalInfo')}
      />
    </CustomWrapper>
  );
};

export default AddAddress;
