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
import {CustomButton} from '../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../constants/types';

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
        Popular countries
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryCode, setCountryCode] = useState<string>('+20');
  const [countryIsoCode, setCountryIsoCode] = useState<string>('eg'); // State to hold the ISO code for CountryFlag
  const [show, setShow] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const onSignup = async () => {
    navigation.navigate("SignUp");
    // Add your signup logic here
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={{paddingHorizontal: 20, paddingTop: 40}}>
        <Text className="text-content-primary font-bold text-3xl">
          Create an Account!
        </Text>
        <Text className="text-content-secondary font-semibold text-lg">
          Enter your phone number to verify your account
        </Text>

        <Text style={styles.label}>Phone</Text>
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
            // style={[styles.input, { flex: 1 }]}
            className="flex-1 bg-white border py-4 border-black/40 rounded-xl px-2 text-lg text-content-primary"
            placeholder="Mobile number"
            placeholderTextColor={'#00000071'}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Country Picker */}
        <CountryPicker
          show={show}
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setCountryIsoCode(item.code); // Set the ISO code for CountryFlag
            setShow(false);
          }}
          ListHeaderComponent={props => (
            <ListHeaderComponent
              {...props}
              countries={props.popularCountries}
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

        {/* Spacer */}
        <View className="h-[50vh] " />

        {/* Sign up button */}
        <CustomButton
          title="Sign up"
          containerStyle={` ${phoneNumber == '' ? "bg-content-disabled" : "bg-primary "}  `}
          handlePress={onSignup} 
        /> 
      </View>
    </KeyboardAvoidingView>
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
