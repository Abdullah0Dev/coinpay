import {View, Text, Image} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountTab, HomeTab, ReceiveMoneyTab, SendMoneyTab, TransactionsTab } from '../tabs';
import { RootTabParamList } from '../constants/types'; 
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
type TabBarItemProps = {
  source: any; // Adjust type according to your image sources
  focused: boolean;
  scanCode?: boolean; 
};// home - spending - scan url - support - account -> home, money-bill-1-wave, qrcode, chat, user-large
const TabItem: React.FC<TabBarItemProps> = ({source, focused, scanCode}) => {
    const Icon = <Entypo name="home" size={30} color={focused ? 'blue' : 'black'} />;
    const Icon2 = <FontAwesome6 name="money-bill-1-wave" size={30} color={focused ? 'blue' : 'black'} />;
    return (
      <View
      style={{
        backgroundColor: focused ? (scanCode ? 'red' : 'white') : 'white',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: scanCode ? 5 : 0,
      }}
      className='w-78 h-8 bg-background-light rounded-md p-4 items-center justify-center flex'>
      <Entypo name="home" size={30} color={focused ? 'blue' : 'black'} />
      </View>
    )
  } 

const HomeScreen = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return ( 
    <>
        <Tab.Navigator screenOptions={{ 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopColor: 'grey',
            height: 70,
            borderTopWidth: 0.2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25, 
            shadowRadius: 3.84,
            elevation: 5, 
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'blue',
        }}>
      <Tab.Screen name="HomeTab" options={{  }} component={HomeTab} />
      <Tab.Screen name="TransactionsTab" component={TransactionsTab} />
      <Tab.Screen name="SendMoneyTab" component={SendMoneyTab} />
      <Tab.Screen name="ReceiveMoneyTab" component={ReceiveMoneyTab} />
      <Tab.Screen name="AccountTab" component={AccountTab} />
    </Tab.Navigator>
    </>
  );
};

export default HomeScreen;
