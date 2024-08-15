import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CountryFlag from 'react-native-country-flag';
import {CountryPicker, CountryButton} from 'react-native-country-codes-picker';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';

const NewTransactionCountry = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState({
    country: '',
  });

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
  } | null>(null);

  const countries = [
    {name: 'مصر', code: 'EG'},
    {name: 'تركيا', code: 'TR'},
    {name: 'الهند', code: 'IN'},
    {name: 'الباكستان', code: 'PK'},
    {name: 'بنغلاديش', code: 'BD'},
    {name: 'الفلبين', code: 'PH'},
    {name: 'الامارات', code: 'AE'},
    {name: 'الصين', code: 'CN'},
    {name: 'اندنوسيا', code: 'ID'},
  ];

  const handleCountrySelect = (country: any) => {
    setForm({...form, country: country.name});
    setSelectedCountry({name: country.name, code: country.code});
    setShowCountryPicker(false);
  };

  const submit = () => {
    console.log('submitting', form);
  };

  return (
    <CustomWrapper progress={1}>
      <HeadInfo
        title={'بلد المستلم'}
        subtitle={
          'تساعد هذه المعلومات على ضمان وصول مدفوعاتك إلى الشخص الرئيسي.'
        }
      />
      {/* Select country */}
      <View>
        <Text className="text-content-secondary text-xl font-bold">البلد</Text>

        <TouchableOpacity
          onPress={() => setShowCountryPicker(true)}
          className="flex-row items-center justify-start gap-x-3 border py-3 px-2 border-border-border rounded-2xl mt-2">
          {selectedCountry ? (
            <>
              <CountryFlag
                key="flag"
                isoCode={selectedCountry.code}
                size={20}
              />
              <Text key="name" className="text-content-secondary text-xl">
                {selectedCountry?.name}
              </Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>اختر دولة</Text>
          )}
        </TouchableOpacity>

        {showCountryPicker && (
          <View
            // className='flex flex-col gap-y-3 py-3   rounded-2xl'

            style={styles.pickerContainer}>
            {countries.map(country => (
              <TouchableOpacity
                key={country.code}
                onPress={() => handleCountrySelect(country)}
                style={styles.countryItem}>
                <CountryFlag isoCode={country.code} size={20} />
                <Text style={styles.countryText}>{country.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className="h-[61%]" />
      <CustomButton
          value={form.country}
        title="استمرار"
        containerStyle={` ${
          form.country === '' ? 'bg-content-disabled' : 'bg-primary'
        } `}
        textStyle={` ${
          form.country === '' ? 'text-content-tertiary' : 'text-white'
        } `}
        handlePress={() =>
          navigation.navigate('TransactionReceiverName', {
            receiverCountry: selectedCountry?.name || '',
          })
        }
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
  pickerContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default NewTransactionCountry;
