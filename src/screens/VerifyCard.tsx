import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomWrapper, HeadInfo} from '../components';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import {useNavigation} from '@react-navigation/native';

const VerifyCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // get the phone number from params
  const phoneNumber = '+1234567890';
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View className="w-full">
      <View className="mx-5 w-full  ">
        <HeadInfo
          title={'Verify your card'}
          subtitle={'We send 6 digits code to yourname@example.com'}
        />
      </View>
      <View className="mx-9">
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View className="flex flex-row gap-x-1 items-center justify-center mt-8">
        <Text className="text-content-tertiary text-xl font-semibold">
          {' '}
          Didn't get the code
        </Text>
        <TouchableOpacity>
          <Text className="text-primary  text-xl font-bold"> Resend </Text>
        </TouchableOpacity>
      </View>
      <View className="h-[50vh]" />
      <View className=" items-center justify-center">
        <CustomButton
          title="Verify"
          containerStyle={` ${
            value == '' ? 'bg-content-disabled' : 'bg-primary '
          }  `}
          textStyle={` ${
            value == '' ? 'text-content-tertiary' : ' text-white'
          }  `}
          handlePress={() => navigation.navigate('CardList')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 45,
    height: 40,
    lineHeight: 29,
    fontSize: 25,
    borderBottomWidth: 2, // Change borderWidth to borderBottomWidth
    borderColor: '#8E9CE7',
    textAlign: 'center',
    color: '#304FFE', // Add this line to set the text color to black
  },
  focusCell: {
    borderColor: '#304FFE',
    color: '#304FFE',
  },
});

export default VerifyCard;
