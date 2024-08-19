import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

type ScreenRouteProps = RouteProp<
  RootStackParamList,
  'TransactionPaymentProof'
>;

type PhoneProps = {
  route: ScreenRouteProps;
};

const NewTransactionAmount: React.FC<PhoneProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [amountError, setAmountError] = useState('');
  const [form, setForm] = useState({
    amount: '',
    password: '',
  });
  const {token} = useAuth();
  const [commission, setCommission] = useState(0);
  const [rate, setRate] = useState(0);
  const conversionRate = 0.0017; // Conversion rate from SDG to USD

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commissionResponse = await axios.get(
          'https://api.elrasilmobile.com/api/app/commmision/',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const rateResponse = await axios.get(
          'https://api.elrasilmobile.com/api/app/rate/',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Add color based on PaymentStatus

        if (commissionResponse.data) {
          setCommission(commissionResponse.data.commission);
        }
        if (rateResponse.data) {
          setRate(rateResponse.data.rate);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [commission, rate]);
  console.log(commission);

  // total amount
  const {amount} = form;
  const numAmount = Number(amount);
  const Total = numAmount * rate + numAmount * rate * commission;
  const TransactionFees = numAmount * rate * commission;
  console.log(`Transaction fees`, TransactionFees);

  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={80}>
      <HeadInfo
        title={'ما هو المبلغ من هذه المعاملة؟'}
        subtitle={
          'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'
        }
      />
      <FormField
        title="المبلغ"
        value={form.amount}
        setError={setAmountError}
        error={amountError}
        handleChangeText={(e: any) => {
          setAmountError('');
          setForm({...form, amount: e});
        }}
        onChangeText={text => {
          if (/^\d{0,10}$/.test(text)) {
            setForm({...form, amount: text}); // Update the form's amount with numeric input
          }
        }}
        otherStyles="mt-7"
        keyboardType="number-pad"
        placeholder={`500`}
      />
      <View className="flex flex-row  w-52 ">
        <Text className="text-xl font-bold text-content-primary"> Total: </Text>
        <Text className="text-xl font-semibold text-content-tertiary">
          {' SDG '}
          {Total}{' '}
        </Text>
      </View>
      <View className="h-[48vh]" />
      <CustomButton
        value={form.amount || form.password}
        title="استمرار"
        containerStyle={` ${
          form.amount == '' ? 'bg-content-disabled' : 'bg-primary '
        }  `}
        textStyle={` ${
          form.amount == '' ? 'text-content-tertiary' : ' text-white'
        }  `}
        handlePress={() =>
          navigation.navigate('TransactionPaymentProof', {
            ...route.params,
            amount: form.amount,
            TransactionFees,
          })
        }
      />
    </CustomWrapper>
  );
};

export default NewTransactionAmount;
