import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const AddCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postCodeError, setPostCodeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [part3, setPart3] = useState('');
  const [form, setForm] = useState({
    address: '',
    city: '',
    email: '',
    postCode: '',
  });
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <View className='bg-white h-full'>
    <View className='mx-5  '>
      <HeadInfo
        title={'Add Card'}
        subtitle={'Enter your card info into the box below.'}
      />
      <FormField
        title="Account Holder Name"
        value={form.address}
        setError={setAddressError}
        error={addressError}
        handleChangeText={(e: any) => {
          setAddressError('');
          setForm({...form, address: e});
        }}
        otherStyles="mt-7"
        keyboardType="address-address"
        placeholder={`Full Name`}
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
      placeholder={`yourname@example.com`}
    /> 
    <View className='flex flex-row items-center mt-7 mb-9 justify-between rounded-xl w-full h-[72px] px-4 bg-white border-2 border-border-border focus:border-black-200'>
      <TextInput
        className=' p-2 text-lg w-[60%] text-start text-content-tertiary '
        maxLength={16}
        placeholderTextColor={"#D0D0D0"}
        keyboardType='numeric'
        placeholder='0000 0000 0000 0000'
        value={part1}
        onChangeText={setPart1}
      />
      <TextInput
        className=' p-2  text-lg text-start text-content-tertiary '
        maxLength={4}
        placeholderTextColor={"#D0D0D0"}
        keyboardType='numeric'
        placeholder='MM/YY'
        value={part2}
        onChangeText={setPart2}
      />
      <TextInput
        className=' p-2  text-lg text-start text-content-tertiary '
        maxLength={3}
        placeholderTextColor={"#D0D0D0"}
        keyboardType='numeric'
        placeholder='CVC'
        value={part3}
        onChangeText={setPart3}
      />
    </View>
      <CustomButton
         value={form.address || form.city || form.postCode || form.email}
        title="Verify"
        containerStyle={` ${
          form.address == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.address == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('VerifyCard')}
      />
    </View>
    </View>
  );
};

export default AddCard;
