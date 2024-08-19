import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AccountTab,
  HomeTab,
  ReceiveMoneyTab,
  SendMoneyTab,
  TransactionsTab,
} from '../tabs';
import {RootTabParamList} from '../constants/types';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SupportScreen from './SupportScreen';
type TabBarItemProps = {
  name: string;
  focused: boolean;
};

const TabItem: React.FC<TabBarItemProps> = ({name, focused}) => {
  let IconComponent;

  switch (name) {
    case 'HomeTab':
      IconComponent = (
        <Octicons
          name="home"
          size={26}
          color={focused ? '#304FFF' : '#424242'}
        />
      );
      break;
    case 'Support':
      IconComponent = (
        <Ionicons
          name="chatbubble-outline"
          size={26}
          color={focused ? '#304FFF' : '#424242'}
        />
      );
      break;
    case 'TransactionsTab':
      IconComponent = (
        <MaterialIcons
          name="history-toggle-off"
          size={26}
          color={focused ? '#304FFF' : '#424242'}
        />
      );
      break;
    default:
      IconComponent = (
        <Octicons
          name="home"
          size={26}
          color={focused ? '#304FFF' : '#424242'}
        />
      );
      break;
  }
  return (
    <View className="flex flex-col items-center">
      <View className="  rounded-md p-4 items-center justify-center flex">
        {IconComponent}
      </View>
      {focused && (
        <View className="p-1 absolute bottom-[5px] rounded-full bg-[#304FFF]" />
      )}
    </View>
  );
};

const HomeScreen = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const width = Dimensions.get('window').width;
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false, // Hide labels
          tabBarStyle: {
            width: width * 0.9,
            left: width * 0.05,
            ...styles.tabBar,
          },
          tabBarIcon: ({focused}) => (
            <TabItem name={route.name} focused={focused} />
          ),
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarInactiveTintColor: '#424242',
          tabBarActiveTintColor: '#304FFF',
        })}>
        <Tab.Screen name="HomeTab" component={HomeTab} />
        <Tab.Screen name="TransactionsTab" component={TransactionsTab} />
        <Tab.Screen name="Support" component={SupportScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10, // Adjust this value to control the floating effect
  },
  tabBar: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 15,
    position: 'absolute',
    bottom: 20, // Adjust this value to control the floating effect
    alignItems: 'center', // Ensure items are centered vertically
    justifyContent: 'center',
    paddingBottom: 5, // Adjust this if needed to avoid clipping
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
