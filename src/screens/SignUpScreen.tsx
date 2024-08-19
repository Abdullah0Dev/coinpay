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
import {CountryPickerModal, CustomButton, CustomWrapper, HeadInfo} from '../components';
import images from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      <View style={{paddingVertical: 39}}>
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

const SignUpScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryCode, setCountryCode] = useState<string>('+249');
  const [countryIsoCode, setCountryIsoCode] = useState<string>('sd');
  const [show, setShow] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmNumber, setConfirmNumber] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const [showPicker, setShowPicker] = useState(false);
  type SelectedCountry = {
    name: string;
    code: string;
    dialCode: string;
  } ;
  
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>({
    name: "السودان",  // Arabic for Sudan
    code: "SD",
    dialCode: "+249",
  });
  const RealPhoneNumber = selectedCountry?.dialCode + phoneNumber;
 


  const handleCountrySelect = (country: SelectedCountry) => {
    setSelectedCountry(country);
  };


  const onSignup = () => {
    setConfirmNumber(true);
    console.log('التسجيل');
  };

  const handleRegister = () => {
    const RealPhoneNumber = selectedCountry?.dialCode + phoneNumber;
    navigation.navigate('AddPersonalInfo', {RealPhoneNumber});
  };

  return (
    <>
      <CustomWrapper progress={0}>
        <HeadInfo
          title={'إنشاء حساب '}
          subtitle={' أدخل رقم هاتفك لتأمين حسابك'}
        />
        <Text style={styles.label}>الهاتف</Text>
        <View className="flex flex-row gap-x-1 items-center h-16">
        <TouchableOpacity
          className="flex bg-white border py-4 border-black/40 rounded-xl px-2 flex-row items-center gap-x-2 "
          onPress={() => setShowPicker(true)}>
          <CountryFlag isoCode={selectedCountry?.code} size={20} />
          <Text className="text-content-secondary text-lg">{selectedCountry?.dialCode}</Text> 
        </TouchableOpacity>

          <TextInput
            className="flex-1 bg-white border py-4 border-black/40 rounded-xl px-2 text-lg text-content-primary"
            placeholder="رقم الجوال"
            placeholderTextColor={'#00000071'}
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={text => {
              if (/^\d{0,10}$/.test(text)) {
                setPhoneNumber(text);
              }
            }}
          />
        </View>

        {/* Country Picker */}
        <CountryPickerModal
        show={showPicker}
        onClose={() => setShowPicker(false)}
        onSelect={handleCountrySelect}
      />


        <View className="h-[50%] " />

        <CustomButton
          value={phoneNumber}
          title="التسجيل"
          containerStyle={`${
            phoneNumber === '' ? 'bg-content-disabled' : 'bg-primary'
          }`}
          textStyle={`${
            phoneNumber === '' ? 'text-content-tertiary' : 'text-white'
          }`}
          handlePress={onSignup}
        />
      </CustomWrapper>
      {confirmNumber && (
        <View className="bg-black/20 absolute z-50 w-[100vw] h-[100vh] items-center justify-center ">
          <View className="p-5 bg-white w-[90%] rounded-2xl justify-center items-center">
            <Image source={images.onboardImage1} resizeMode="contain" />
            <Text className="text-content-primary text-2xl font-bold text-center mx-2">
              هل أنت متأكد أنك تريد استخدام هذا الرقم؟
            </Text>
            <Text className="text-content-tertiary text-base font-semibold text-center mx-2">
              هل هذا صحيح؟{' '}
              <Text className="text-extrabold text-content-secondary text-lg">
                {phoneNumber}
              </Text>
            </Text>
            <CustomButton
              title="نعم، هو كذلك"
              containerStyle="bg-primary mt-5"
              handlePress={handleRegister}
            />
            <CustomButton
              title="لا، عدل"
              containerStyle="bg-white border-primary/50 border-2 mt-2"
              textStyle="text-primary"
              handlePress={() => setConfirmNumber(false)}
            />
          </View>
        </View>
      )}
    </>
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

export default SignUpScreen;
