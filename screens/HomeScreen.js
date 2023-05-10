import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ComposeScreen from './ComposeScreen';
import ProfileScreen from './ProfileScreen';
import FilesScreen from './FilesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Compose"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Compose') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (rn === 'Files') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (rn === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Compose" component={ComposeScreen} />
      <Tab.Screen name="Files" component={FilesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
