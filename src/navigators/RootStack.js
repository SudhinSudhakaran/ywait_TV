import React, {useEffect} from 'react';

import {View, Text} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../src/screens/login/loginScreen';
import TokenStatusScreen from '../src/screens/tokenStatus/TokenStatusScreen';
import TokenStatusDoubleScreen from '../src/screens/tokenStatus/TokenStatusDoubleScreen';
import SettingsScreen from '../src/screens/setting/SettingScreen';

import '../src/i18n/i18n';

import MapScreen from '../src/screens/map/MapScreen';
import Home from '../src/screens/NewSettings/Home';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const RootStack = () => {
  const {isRTL} = useSelector(state => state.AlignmentState);

  const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: props => (
      <BaseToast
        {...props}
        style={{width: '30%', borderLeftColor: 'green'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 12,
          marginTop: 5,
          textAlign: 'left',
          color: 'black',
        }}
        text2Style={{
          fontSize: 10,
          textAlign: 'left',
          color: 'black',
        }}
      />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: props => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: 'red',
          transform: [{scaleX: isRTL ? -1 : 1}],
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 12,
          marginTop: 5,
          textAlign: isRTL ? 'left' : 'right',
        }}
        text2Style={{
          fontSize: 10,
          textAlign: isRTL ? 'right' : 'left',
        }}
      />
    ),
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    info: props => (
      <BaseToast
        {...props}
        style={{width: '30%', borderLeftColor: 'red'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 12,
          marginTop: 5,
          textAlign: 'left',
          color: 'black',
        }}
        text2Style={{
          fontSize: 10,
          textAlign: 'left',
          color: 'black',
        }}
      />
    ),

    /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
    tomatoToast: ({text1, text2, props}) => (
      <View
        style={{
          height: 50,
          width: '30%',
          backgroundColor: 'white',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          borderRadius: 5,
        }}>
        <View
          style={{
            width: 5,
            backgroundColor: 'red',
            height: '100%',
            borderBottomLeftRadius: isRTL ? 0 : 5,
            borderTopLeftRadius: isRTL ? 0 : 5,
            borderBottomRightRadius: isRTL ? 5 : 0,
            borderTopRightRadius: isRTL ? 5 : 0,
          }}
        />
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              textAlign: isRTL ? 'right' : 'left',
              color: 'black',
            }}>
            {text1}
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              textAlign: isRTL ? 'right' : 'left',
              color: 'black',
            }}>
            {text2}
          </Text>
        </View>
      </View>
    ),
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="TokenStatusScreen" component={TokenStatusScreen} />
        <Stack.Screen
          name="TokenStatusDoubleScreen"
          component={TokenStatusDoubleScreen}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      <Toast setRef={Toast.setRootRef} config={toastConfig} />
    </NavigationContainer>
  );
};

export default RootStack;
