import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, FormField, HeadInfo} from '../components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

type ScreenRouteProps = RouteProp<RootStackParamList, 'AddPersonalInfo'>;

type PersonalInfoProps = {
  route: ScreenRouteProps;
};
const AddPersonalInfo: React.FC<PersonalInfoProps> = ({route}) => {
  const {RealPhoneNumber} = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const onDateChange = (date: any) => {
    setForm({...form, birthDate: moment(date).format('MM/DD/YYYY')});
    console.log(date);
  };

  const submit = () => {
    console.log('جاري الإرسال', form);
  };

  return (
    <>
      <CustomWrapper progress={20}>
        <HeadInfo
          title={'أضف معلوماتك الشخصية'}
          subtitle={
            'يجب أن تكون هذه المعلومات دقيقة وفقًا لوثيقة الهوية الخاصة بك.'
          }
        />
        <FormField
          title="الاسم الأول"
          value={form.firstName}
          setError={setNameError}
          error={nameError}
          handleChangeText={(e: any) => {
            setNameError('');
            setForm({...form, firstName: e});
          }}
          otherStyles="mt-7"
          keyboardType="text"
          placeholder={`محمد`}
        />
        <FormField
          title="اسم العائلة"
          value={form.lastName}
          setError={setUsernameError}
          error={usernameError}
          handleChangeText={(e: any) => {
            setNameError('');
            setForm({...form, lastName: e});
          }}
          otherStyles="mt-7"
          keyboardType="text"
          placeholder={`علي`}
        />
        {/* <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <FormField
            title="تاريخ الميلاد"
            value={form.birthDate}
            setError={setBirthDateError}
            error={birthDateError}
            handleChangeText={(e: any) => {}}
            otherStyles="mt-7"
            keyboardType="text"
            placeholder={`MM/DD/YYYY`}
            editable={false}
          />
        </TouchableOpacity> */}

        <View className="h-[35vh]" />
        <CustomButton
          title="التالى"
          containerStyle={` ${
            form.firstName == '' && form.lastName == ''
              ? 'bg-content-disabled'
              : 'bg-primary '
          }  `}
          textStyle={` ${
            form.firstName == '' && form.lastName == ''
              ? 'text-content-tertiary'
              : ' text-white'
          }  `}
          handlePress={() =>
            navigation.navigate('AddEmail', {
              RealPhoneNumber: RealPhoneNumber,
              firstName: form.firstName,
              lastName: form.lastName,
            })
          }
        />
      </CustomWrapper>
      {/* Confirm number absolute view */}
      {/* {showCalendar && (
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
              title="تأكيد"
              containerStyle="bg-primary mt-5"
              handlePress={() => setShowCalendar(false)}
            />
          </View>
        </View>
      )} */}
    </>
  );
};

export default AddPersonalInfo;
