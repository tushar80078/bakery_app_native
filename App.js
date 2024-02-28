import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import TabNavigators from './src/navigators/TabNavigators';
import DetailScreen from './src/screens/DetailsScreen/DetailScreen';
import LoginBannerScreen from './src/screens/LoginScreens/LoginBanner';
import SignupScreen from './src/screens/SignUpScreen/Signup';
import LoginScreen from './src/screens/LoginScreens/Login';
import CheckoutScreen from './src/screens/CheckoutScreens/Checkout';
import ProfileScreen from './src/screens/PortfolioScreen/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* Tab Navigators */}
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigators}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Details Screen */}

            <Stack.Screen
              name="Details"
              component={DetailScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Login Banner Screen */}

            <Stack.Screen
              name="Banner"
              component={LoginBannerScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Signup Screen */}

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Login Screen */}

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Checkout Screen */}

            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Profile Screen */}

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{animation: 'slide_from_bottom'}}
            />

            {/* Search Screen */}

            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{animation: 'fade'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
