import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

type ScreenRouteProps = RouteProp<RootStackParamList, 'TransactionPurpose'>;

type PhoneProps = {
  route: ScreenRouteProps;
};

const NewTransactionEmail: React.FC<PhoneProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [form, setForm] = useState({
    address: '',
    password: '',
  });
  
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={35}>
      <HeadInfo
        title={'Reciver Address '}
        subtitle={''}
      />
      <FormField
        title="Address"
        value={form.address}
        setError={setAddressError}
        error={addressError}
        handleChangeText={(e: any) => {
          setAddressError('');
          setForm({...form, address: e});
        }}
        otherStyles="mt-7"
        keyboardType="default"
        placeholder={`Khartoum, burri`}
      />
      <View className="h-[49vh]" />
      <CustomButton
          value={form.address || form.password}
        title="Next"
        containerStyle={` ${
          form.address == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.address == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('TransactionPurpose', {...route.params, address: form.address})}
      />
    </CustomWrapper>
  );
};

export default NewTransactionEmail;
