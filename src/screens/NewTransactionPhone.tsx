import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {CountryPicker, CountryButton} from 'react-native-country-codes-picker';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import images from '../constants/images';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

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
        الدول الشهيرة
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

type ScreenRouteProps = RouteProp<
  RootStackParamList,
  'TransactionReceiverPhone'
>;

type PhoneProps = {
  route: ScreenRouteProps;
};

const NewTransactionPhone: React.FC<PhoneProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryCode, setCountryCode] = useState<string>('+249');
  const [countryIsoCode, setCountryIsoCode] = useState<string>('sd'); // State to hold the ISO code for CountryFlag
  const [show, setShow] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmNumber, setConfirmNumber] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const RealPhoneNumber = countryCode + phoneNumber;

  const handleContinue = () => {
    navigation.navigate('TransactionReceiverAddress', {
      ...route.params,
      RealPhoneNumber,
    });
  };

  return (
    <CustomWrapper progress={30}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <HeadInfo
          title={'رقم الهاتف للمستلم'}
          subtitle={
            'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'
          }
        />
        <View style={{paddingTop: 20}}>
          <Text style={styles.label}>الهاتف</Text>
          <View className="flex flex-row gap-x-1 items-center h-16">
            {/* Country Code TextInput */}
            <TouchableOpacity
              className="flex bg-white border py-4 border-black/40 rounded-xl px-2 flex-row items-center gap-x-2 "
              onPress={() => setShow(true)}>
              <CountryFlag isoCode={countryIsoCode} size={20} />
              <Text className="text-content-secondary text-lg">
                {countryCode}
              </Text>
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
                lang={'ar'}
                onPress={country => {
                  setCountryCode(country.dial_code);
                  setCountryIsoCode(country.code);
                  setShow(false);
                }}
              />
            )}
            popularCountries={['ar', 'en', 'fr']} // Adjust as per your requirement
            style={{
              modal: {
                backgroundColor: 'white',
              },
              countryName: {color: '#000', fontSize: 18},
              dialCode: {color: '#000', fontSize: 18},
            }}
          />

          {/* Spacer */}
          <View className="h-[48vh] " />

          {/* Sign up button */}
          <CustomButton
            value={phoneNumber}
            title="استمرار"
            containerStyle={` ${
              phoneNumber == '' ? 'bg-content-disabled' : 'bg-primary '
            }  `}
            textStyle={` ${
              phoneNumber == '' ? 'text-content-tertiary' : ' text-white'
            }  `}
            handlePress={handleContinue}
          />
        </View>
      </KeyboardAvoidingView>
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

export default NewTransactionPhone;
