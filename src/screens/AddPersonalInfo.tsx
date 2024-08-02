import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const AddPersonalInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [form, setForm] = useState({ 
    name: '',
    username: '',
    birthDate: '',
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const onDateChange = (date: any) => {
    setForm({...form, birthDate: moment(date).format('MM/DD/YYYY')});
    console.log(date);
  };

  const submit = () => { 
    console.log('submitting', form);
  };

  return (
    <>
      <CustomWrapper progress={30}>
        <HeadInfo
          title={'Add you personal info'}
          subtitle={'This info needs to be accurate with your ID document.'}
        />
        <FormField
          title="Full Name"
          value={form.name}
          setError={setNameError}
          error={nameError}
          handleChangeText={(e: any) => {
            setNameError('');
            setForm({...form, name: e});
          }}
          otherStyles="mt-7"
          keyboardType="text"
          placeholder={`Mr. John Doe`}
        />
        <FormField
          title="Username"
          value={form.username}
          setError={setUsernameError}
          error={usernameError}
          handleChangeText={(e: any) => {
            setNameError('');
            setForm({...form, username: e});
          }}
          otherStyles="mt-7"
          keyboardType="text"
          placeholder={`username`}
        />
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <FormField
            title="Date of Birth"
            value={form.birthDate}
            setError={setBirthDateError}
            error={birthDateError}
            handleChangeText={(e: any) => {}}
            otherStyles="mt-7"
            keyboardType="text"
            placeholder={`MM/DD/YYYY`}
            editable={false}
          />
        </TouchableOpacity>

        <View className="h-[45vw]" />
        <CustomButton
          title="Continue"
          containerStyle={` ${
            form.name == '' ? 'bg-content-disabled' : 'bg-primary '
          }  `}
          textStyle={` ${
            form.name == '' ? 'text-content-tertiary' : ' text-white'
          }  `}
          handlePress={() => navigation.navigate('AddCountry')}
        />
      </CustomWrapper>
      {/* Confirm number absolute view */}
      {showCalendar && (
        <View className="bg-black/20 absolute z-50 w-full h-full items-center justify-center ">
          <View className=" p-5 bg-white w-[90%]  rounded-2xl justify-center items-center">
          <CalendarPicker
              onDateChange={onDateChange}
              textStyle={{
                color: 'black',
              }}
              todayBackgroundColor="#00000059"
              selectedDayColor="#304FFE"
              selectedDayTextColor="#FFFFFF"
              monthTitleStyle={{
                fontSize: 20,
                color: 'black',
                alignSelf: 'center',
              }}
              yearTitleStyle={{ 
                fontSize: 20,
                color: 'black',
                alignSelf: 'center',
              }}
              headerWrapperStyle={{ 
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              }}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              }}
              previousTitleStyle={{
                fontSize: 16,
                color: 'black',
              }}
              nextTitleStyle={{
                fontSize: 16,
                color: 'black',
              }}
            />
            <CustomButton
              title="Confirm"
              containerStyle="bg-primary mt-5"
              handlePress={() => setShowCalendar(false)}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default AddPersonalInfo;
