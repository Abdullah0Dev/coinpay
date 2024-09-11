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
    console.log('sending', form);
  };
  const {password} = form;

  return (
    <CustomWrapper progress={45}>
      <HeadInfo
        title={'Please Add Your Email'}
        subtitle={
          'This Information Must Be Accurate'
        }
      />
      <FormField
        title="Password"
        value={form.password}
        setError={setPasswordError}
        error={passwordError}
        handleChangeText={(e: any) => {
          setPasswordError('');
          setForm({...form, password: e});
        }}
        otherStyles="mt-7"
        keyboardType="default"
        placeholder={` Password`}
      />
      <View className="h-[35vh]" />
      <CustomButton
        value={form.password}
        title="Next"
        containerStyle={` ${
          form.password == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.password == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() =>
          navigation.navigate('AddImageID', {...route.params, password})
        }
      />
    </CustomWrapper>
  );
};

export default AddEmail;
