import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

type ScreenRouteProps = RouteProp<RootStackParamList, 'TransactionReceiverName'>;

type NameProps = {
  route: ScreenRouteProps;
};
const NewTransactionName: React.FC<NameProps> = ({route}) => {
  const {receiverCountry} = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [form, setForm] = useState({
    name: '',
    password: '',
  });
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={15}>
      <HeadInfo
        title={'اسم المستلم'}
        subtitle={'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'}
      />
      <FormField
        title="الاسم"
        value={form.name}
        setError={setNameError}
        error={nameError}
        handleChangeText={(e: any) => {
          setNameError('');
          setForm({...form, name: e});
        }}
        otherStyles="mt-7"
        keyboardType="default"
        placeholder={`جون دو`}
      />
      <View className="h-[49vh]" />
      <CustomButton
        title="استمرار"
        containerStyle={` ${
          form.name == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.name == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('TransactionReceiverPhone', {...route.params, name: form.name})}
      />
    </CustomWrapper>
  );
};

export default NewTransactionName;
