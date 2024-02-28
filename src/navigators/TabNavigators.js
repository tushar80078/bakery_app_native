import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {COLORS} from '../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
// import FeatherIcons from 'react-native-vector-icons/Feather';
import CartScreen from '../screens/CartScreens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import {BlurView} from '@react-native-community/blur';
import ProfileScreen from '../screens/PortfolioScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigators = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.TabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FeatherIcons
              name="home"
              size={29}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.secondaryBlackRGBA
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FeatherIcons
              name="shopping-cart"
              size={29}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.secondaryBlackRGBA
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Octicons
              name="checklist"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.secondaryGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="notifications-outline"
              size={30}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.secondaryGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="person-outline"
              size={28}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.secondaryGreyHex
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigators;

const styles = StyleSheet.create({
  TabBarStyle: {
    height: 60,
    position: 'absolute',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    backgroundColor: COLORS.primaryWhiteHex,
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
