import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {CountryPicker, CountryButton} from 'react-native-country-codes-picker';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setToken} = useAuth();
  const [realToken, setRealToken] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>('+249');
  const [countryIsoCode, setCountryIsoCode] = useState<string>('sd');
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [form, setForm] = useState({password: ''});
  const RealPhoneNumber = countryCode + phoneNumber;

  const onSignIn = async () => {
    if (phoneNumber === '' || form.password === '') {
      Alert.alert('Error', 'Please enter your phone number and password.');
      return;
    }

    setLoading(true);
    try {
      const {password} = form;
      const response = await axios.post(
        'https://api.elrasilmobile.com/API/user/Login/',
        {
          mobile: RealPhoneNumber,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (response.status !== 200) {
        const message = `حدث خطأ: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const data = await response.data;
      await AsyncStorage.setItem('token', data.Token);
      setRealToken(data.Token); 
      console.log('user created successfully', data.Token); 

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,  
      //     routes: [{name: 'Welcome'}],
      //   }),
      // );

      navigation.replace("Welcome")
    } catch (error: any) {
      console.error("couldn't sign in the user", error);
      Alert.alert('Error', error.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  }; 
  useEffect(() => {
    if (realToken) {
      console.log('Updated realToken:', realToken);
    }  
  }, [realToken]);

  return (
    <CustomWrapper progress={0}>
      <HeadInfo
        title={'   تسجيل الدخول إلى حسابك!'}
        subtitle={'  أدخل رقم هاتفك وكلمة المرور الخاصة بك!'}
      />

      <Text style={styles.label}>الهاتف</Text>
      <View className="flex flex-row gap-x-1 items-center h-16">
        <TouchableOpacity
          className="flex bg-white border py-4 border-black/40 rounded-xl px-2 flex-row items-center gap-x-2 "
          onPress={() => setShow(true)}>
          <CountryFlag isoCode={countryIsoCode} size={20} />
          <Text className="text-content-secondary text-lg">{countryCode}</Text>
        </TouchableOpacity>

        <TextInput
          className="flex-1 bg-white border py-4 border-black/40 rounded-xl px-2 text-lg text-content-primary"
          placeholder="رقم الهاتف المحمول"
          placeholderTextColor={'#00000071'}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => {
            if (/^\d{0,10}$/.test(text)) {
              setPhoneNumber(text);
            }
          }}
        />
      </View>

      <CountryPicker
        lang="ar"
        show={show}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setCountryIsoCode(item.code);
          setShow(false);
        }}
        popularCountries={['ar', 'en', 'fr']}
        style={{
          modal: {
            backgroundColor: 'white',
          },
          countryName: {color: '#000', fontSize: 18},
          dialCode: {color: '#000', fontSize: 18},
        }}
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

      <View className="h-[40vh] " />

      <CustomButton
        value={form.password}
        title="تسجيل الدخول"
        containerStyle={` ${
          phoneNumber === '' || form.password === ''
            ? 'bg-content-disabled'
            : 'bg-primary '
        }  `}
        textStyle={` ${
          phoneNumber === '' || form.password === ''
            ? 'text-content-tertiary'
            : ' text-white'
        }  `}
        handlePress={onSignIn}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#000',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});

export default SignInScreen;
