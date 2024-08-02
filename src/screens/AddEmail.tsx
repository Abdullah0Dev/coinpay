import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const AddEmail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={30}>
      <HeadInfo
        title={'Add your email'}
        subtitle={'This info needs to be accurate with your ID document.'}
      />
      <FormField
        title="Email"
        value={form.email}
        setError={setEmailError}
        error={emailError}
        handleChangeText={(e: any) => {
          setEmailError('');
          setForm({...form, email: e});
        }}
        otherStyles="mt-7"
        keyboardType="email-address"
        placeholder={`name@example.com`}
      />
      <View className="h-[55vh]" />
      <CustomButton
        title="Continue"
        containerStyle={` ${
          form.email == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.email == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('AddAddress')}
      />
    </CustomWrapper>
  );
};

export default AddEmail;
