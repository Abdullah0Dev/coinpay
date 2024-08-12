import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {CountryPicker, CountryButton} from 'react-native-country-codes-picker';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
interface ListHeaderComponentProps {
  countries: any[]; // Adjust type as per your actual data structure
  lang: string;
  onPress: (country: any) => void; // Adjust type as per your onPress logic
}

const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({
  countries,
  lang,
  onPress,
}) => {
  return (
    <View style={{paddingBottom: 20}}>
      <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
        الدول الشائعة
      </Text>
      {countries?.map((country, index) => (
        <CountryButton
          key={index}
          item={country}
          name={country?.name?.[lang || 'en']}
          onPress={() => onPress(country)}
          style={{
            countryName: {color: '#000', fontSize: 18},
            dialCode: {color: '#000', fontSize: 18},
          }}
        />
      ))}
    </View>
  );
};

const SignInScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryCode, setCountryCode] = useState<string>('+249');
  const [countryIsoCode, setCountryIsoCode] = useState<string>('sd'); // State to hold the ISO code for CountryFlag
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [form, setForm] = useState({
    password: '',
  });
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const RealPhoneNumber = countryCode + phoneNumber;

  const onSignIn = async () => {
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

      const data = response.data;
      console.log('تم إنشاء المستخدم بنجاح:', data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        }),
      );
    } catch (error) {
      console.error("couldn't sign in the user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomWrapper progress={0}>
      <HeadInfo
        title={'   تسجيل الدخول إلى حسابك!'}
        subtitle={'  أدخل رقم هاتفك وكلمة المرور الخاصة بك!'}
      />

      <Text style={styles.label}>الهاتف</Text>
      <View className="flex flex-row gap-x-1 items-center h-16">
        {/* Country Code TextInput */}
        <TouchableOpacity
          className="flex bg-white border py-4 border-black/40 rounded-xl px-2 flex-row items-center gap-x-2 "
          onPress={() => setShow(true)}>
          <CountryFlag isoCode={countryIsoCode} size={20} />
          <Text className="text-content-secondary text-lg">{countryCode}</Text>
        </TouchableOpacity>

        {/* Phone Number TextInput */}
        <TextInput
          className="flex-1 bg-white border py-4 border-black/40 rounded-xl px-2 text-lg text-content-primary"
          placeholder="رقم الهاتف المحمول"
          placeholderTextColor={'#00000071'}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => {
            if (/^\d{0,10}$/.test(text)) {
              // Ensures only numeric input up to 10 digits
              setPhoneNumber(text);
            }
          }}
        />
      </View>

      {/* Country Picker */}
      <CountryPicker
        lang="ar"
        show={show}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setCountryIsoCode(item.code); // Set the ISO code for CountryFlag
          setShow(false);
        }}
        ListHeaderComponent={props => (
          <ListHeaderComponent
            {...props}
            countries={props.countries}
            lang={'en'}
            onPress={country => console.log(country)}
          />
        )}
        popularCountries={['en', 'ar', 'pl']} // Adjust as per your requirement
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
      {/* Spacer */}
      <View className="h-[40vh] " />

      {/* Sign up button */}
      <CustomButton
        title="تسجيل الدخول"
        containerStyle={` ${
          phoneNumber == '' || form.password == ''
            ? 'bg-content-disabled'
            : 'bg-primary '
        }  `}
        textStyle={` ${
          phoneNumber == '' || form.password == ''
            ? 'text-content-tertiary'
            : ' text-white'
        }  `}
        handlePress={onSignIn}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    color: '#000',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
  },
  countryCodeContainer: {
    backgroundColor: '#fff',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCodeText: {
    color: '#000',
    fontSize: 18,
  },
  phoneNumberInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#000',
  },
  loginLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
  },
  enabled: {
    backgroundColor: '#ffffffee',
  },
  disabled: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignInScreen;
