import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

type ScreenRouteProps = RouteProp<RootStackParamList, 'AddEmail'>;

type EmailProps = {
  route: ScreenRouteProps;
};
const AddEmail: React.FC<EmailProps> = ({route}) => {
  const {RealPhoneNumber, firstName, lastName} = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const submit = () => {
    console.log('جاري الإرسال', form);
  };

  return (
    <CustomWrapper progress={45}>
      <HeadInfo
        title={'أضف بريدك الإلكتروني'}
        subtitle={'يجب أن تكون هذه المعلومات دقيقة وفقًا لوثيقة الهوية الخاصة بك.'}
      />
      <FormField
        title="البريد الإلكتروني"
        value={form.email}
        setError={setEmailError}
        error={emailError}
        handleChangeText={(e: any) => {
          setEmailError('');
          setForm({...form, email: e});
        }}
        otherStyles="mt-7"
        keyboardType="email-address"
        placeholder={`mohammed@ali.com`}
      />
      <FormField
        title="كلمة المرور"
        value={form.password}
        setError={setPasswordError}
        error={passwordError}
        handleChangeText={(e: any) => {
          setPasswordError('');
          setForm({...form, password: e});
        }}
        otherStyles="mt-7"
        keyboardType="default" 
        placeholder={`كلمة المرور`}
      />
      <View className="h-[35vh]" />
      <CustomButton
         value={ form.password || form.email}
        title="التالى"
        containerStyle={` ${
          form.email == '' ||  form.password == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.email == '' ||  form.password == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('AddImageID', {...route.params, ...form})}
      />
    </CustomWrapper>
  );
};

export default AddEmail;
