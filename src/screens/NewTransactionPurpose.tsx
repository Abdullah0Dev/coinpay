import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

type ScreenRouteProps = RouteProp<RootStackParamList, 'TransactionAmount'>;

type PhoneProps = {
  route: ScreenRouteProps;
};

const NewTransactionPurpose: React.FC<PhoneProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [purposeError, setPurposeError] = useState('');
  const [form, setForm] = useState({
    purpose: '',
    password: '',
  });
  
  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={70}>
      <HeadInfo
        title={'ما هو الغرض من هذه المعاملة؟'}
        subtitle={'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'}
      />
      <FormField
        title="الغرض"
        value={form.purpose}
        setError={setPurposeError}
        error={purposeError}
        handleChangeText={(e: any) => {
          setPurposeError('');
          setForm({...form, purpose: e});
        }}
        otherStyles="mt-7"
        keyboardType="default"
        placeholder={`دفع الفاتورة، رسوم المدرسة، إلخ`}
      />
      <View className="h-[49vh]" />
      <CustomButton
        title="استمرار"
        containerStyle={` ${
          form.purpose == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.purpose == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() => navigation.navigate('TransactionAmount', {...route.params, purpose: form.purpose})}
      />
    </CustomWrapper>
  );
};

export default NewTransactionPurpose;
