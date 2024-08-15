import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CountryFlag from 'react-native-country-flag';
import {CountryPicker, CountryButton} from 'react-native-country-codes-picker';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const AddCountry = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState({
    country: '',
    address: '',
    city: '',
    postCode: '',
  });

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
  } | null>(null);

  const countries = [
    {label: 'Bangladesh', value: 'Bangladesh'},
    {label: 'United States', value: 'United States'},
    {label: 'Singapore', value: 'Singapore'},
    {label: 'India', value: 'India'},
  ];

  const handleCountrySelect = (country: any) => {
    setForm({...form, country: country.name.en}); // Adjust this as per your language preference
    setSelectedCountry({name: country.name.en, code: country.code}); // Adjust this as per your language preference
    setShowCountryPicker(false);
  };

  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={30}>
      <HeadInfo
        title={'Country of residence'}
        subtitle={'This info needs to be accurate with your ID document.'}
      />
      {/* Select country */}
      <View>
        <Text className="text-content-secondary text-xl font-bold  ">
          Country
        </Text>

        <TouchableOpacity
          onPress={() => setShowCountryPicker(true)}
          className="flex-row items-center justify-start gap-x-3 border py-3 px-2 border-border-border rounded-2xl   mt-2">
          {selectedCountry ? (
            [
              <CountryFlag
                key="flag"
                isoCode={selectedCountry.code}
                size={20}
              />,
              <Text
                key="name"
                className="text-content-secondary text-xl ">
                {selectedCountry?.name}
              </Text>,
            ]
          ) : (
            <Text style={styles.placeholderText}>Select a country</Text>
          )}
        </TouchableOpacity>

        <CountryPicker
        lang='ar'
          show={showCountryPicker}
          pickerButtonOnPress={handleCountrySelect}
          style={{
            modal: {backgroundColor: 'white'},
            countryName: {color: '#000', fontSize: 18},
            dialCode: {color: 'transparent', fontSize: 18},
          }}
        />
      </View>

      <View className="h-[61%]" />
      <CustomButton
         value={form.address || form.city || form.postCode || form.country}
        title="Continue"
        containerStyle={` ${
          form.country === '' ? 'bg-content-disabled' : 'bg-primary'
        } `}
        textStyle={` ${
          form.country === '' ? 'text-content-tertiary' : 'text-white'
        } `}
        handlePress={() => navigation.navigate('AddImageID')}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#000', // Set to black
    fontSize: 16,
    marginBottom: 8,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  countryText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
});

export default AddCountry;
